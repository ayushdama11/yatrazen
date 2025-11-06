package com.yatrazen.backend.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.beans.factory.annotation.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Configuration
public class FirebaseConfig {
    @Value("${firebase.service.account.path:/etc/secrets/serviceKey.json}")
    private String serviceAccountPath;

    @Value("${firebase.project.id:}")
    private String projectId;

    // basically initializing firebase for using it all across the file
    // @PostConstruct is used when we have to do something at the begg 
    @PostConstruct
    public void initializeFirebase() throws IOException {
        if(FirebaseApp.getApps().isEmpty()) {
            InputStream serviceAccount;
            
            // Try to load from environment variable first (Option 2)
            String firebaseConfig = System.getenv("FIREBASE_CONFIG");
            if (firebaseConfig != null && !firebaseConfig.isEmpty()) {
                // Load from environment variable
                serviceAccount = new ByteArrayInputStream(firebaseConfig.getBytes(StandardCharsets.UTF_8));
            } else {
                // Load from file (local dev or Render secret file)
                serviceAccount = new FileInputStream(serviceAccountPath);
            }

            FirebaseOptions.Builder builder = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount));

            // Only set projectId if it's configured to a real value
            if (projectId != null && !projectId.isBlank() && !"your-firebase-project-id".equalsIgnoreCase(projectId)) {
                builder.setProjectId(projectId);
            }

            FirebaseOptions options = builder.build();

            FirebaseApp.initializeApp(options);
        }
    }

    // returns firestore database instance - contains all the things for crud ops
    @Bean
    public Firestore firestore() {
        return FirestoreClient.getFirestore();
    }
}
