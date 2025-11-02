package com.yatrazen.backend.config;

import java.io.FileInputStream;
import java.io.IOException;

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
    @Value("${firebase.service.account.path}")
    private String serviceAccountPath;

    @Value("${firebase.project.id}")
    private String projectId;

    // basically initializing firebase for using it all across the file
    // @PostConstruct is used when we have to do something at the begg 
    @PostConstruct
    public void initializeFirebase() throws IOException {
        if(FirebaseApp.getApps().isEmpty()) {
            FileInputStream serviceAccount = new FileInputStream(serviceAccountPath);

            FirebaseOptions.Builder builder = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount));

            // Only set projectId if it's configured to a real value; otherwise let SDK derive from service account
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
