package com.yatrazen.backend.service;

import java.io.FileInputStream; 
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials; 
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp; 
import com.google.firebase.FirebaseOptions; 
import com.google.firebase.cloud.FirestoreClient;
import com.yatrazen.backend.model.Trip;

import javax.annotation.PostConstruct; 

@Service
public class FirebaseService {
    private static final String COLLECTION_NAME = "AITrips_v2";

    @org.springframework.beans.factory.annotation.Value("${firebase.service.account.path}")
    private String serviceAccountPath;

    private Firestore db;

    @PostConstruct
    public void initializeFirebase() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                
                FileInputStream serviceAccount = new FileInputStream(serviceAccountPath);

                FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

                FirebaseApp.initializeApp(options);
                System.out.println("Firebase has been initialized.");
            }
            
            db = FirestoreClient.getFirestore();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error initializing Firebase", e);
        }
    }


    public Trip saveTrip(Trip trip) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        trip.setId(docRef.getId());

        ApiFuture<WriteResult> res = docRef.set(trip);
        res.get(); 
        return trip;
    }

    public Trip getTripById(String tripId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(tripId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot doc = future.get();

        if(doc.exists()) {
            return doc.toObject(Trip.class);
        }
        return null;
    }

    public List<Trip> getTripsByUserEmail(String userEmail) throws ExecutionException, InterruptedException {
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
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(tripId);
        ApiFuture<WriteResult> res = docRef.delete();
        res.get();
        return true;
    }
}