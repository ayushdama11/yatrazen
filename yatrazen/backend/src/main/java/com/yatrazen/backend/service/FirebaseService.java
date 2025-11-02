package com.yatrazen.backend.service;

import java.io.FileInputStream; // <-- ADD THIS IMPORT
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials; // <-- ADD THIS IMPORT
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp; // <-- ADD THIS IMPORT
import com.google.firebase.FirebaseOptions; // <-- ADD THIS IMPORT
import com.google.firebase.cloud.FirestoreClient;
import com.yatrazen.backend.model.Trip;

import javax.annotation.PostConstruct; // <-- ADD THIS IMPORT

@Service
public class FirebaseService {
    private static final String COLLECTION_NAME = "AITrips_v2";

    // 1. Create a class-level variable for Firestore
    private Firestore db;

    // 2. This method runs ONCE when Spring Boot starts
    @PostConstruct
    public void initializeFirebase() {
        try {
            // Check if the app is already initialized (avoids errors on hot-reload)
            if (FirebaseApp.getApps().isEmpty()) {
                
                // !! IMPORTANT: Update this path to point to your service account key file !!
                // Make sure the file is in src/main/resources or another classpath location
                FileInputStream serviceAccount = new FileInputStream("src/main/resources/YOUR_SERVICE_ACCOUNT_KEY.json");

                FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

                FirebaseApp.initializeApp(options);
                System.out.println("Firebase has been initialized.");
            }
            
            // 3. Get the Firestore instance ONCE and store it in the class variable
            db = FirestoreClient.getFirestore();

        } catch (Exception e) {
            e.printStackTrace();
            // Stop the app from starting if Firebase fails to initialize
            throw new RuntimeException("Error initializing Firebase", e);
        }
    }


    // 4. Update all your methods to use the class-level 'db' variable
    // (Notice 'Firestore db = ...' is REMOVED from every method)

    public Trip saveTrip(Trip trip) throws ExecutionException, InterruptedException {
        // Use the 'db' variable that was initialized at startup
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        trip.setId(docRef.getId());

        ApiFuture<WriteResult> res = docRef.set(trip);
        res.get(); 
        return trip;
    }

    public Trip getTripById(String tripId) throws ExecutionException, InterruptedException {
        // Use the 'db' variable
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(tripId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot doc = future.get();

        if(doc.exists()) {
            return doc.toObject(Trip.class);
        }
        return null;
    }

    public List<Trip> getTripsByUserEmail(String userEmail) throws ExecutionException, InterruptedException {
        // Use the 'db' variable
        CollectionReference trips = db.collection(COLLECTION_NAME);
        Query query = trips.whereEqualTo("userEmail", userEmail);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        List<Trip> tripList = new ArrayList<>();
        for(DocumentSnapshot doc : querySnapshot.get().getDocuments()) {
            tripList.add(doc.toObject(Trip.class));
        }
        return tripList;
    }

    public boolean deleteTrip(String tripId) throws ExecutionException, InterruptedException {
        // Use the 'db' variable
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(tripId);
        ApiFuture<WriteResult> res = docRef.delete();
        res.get();
        return true;
    }
}