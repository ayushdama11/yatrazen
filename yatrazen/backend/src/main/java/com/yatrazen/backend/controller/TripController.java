package com.yatrazen.backend.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.rpc.context.AttributeContext.Response;
import com.yatrazen.backend.dto.CreateTripRequest;
import com.yatrazen.backend.model.Trip;
import com.yatrazen.backend.service.TripService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    @Autowired
    private TripService tripService;

    @PostMapping
    public ResponseEntity<?> createTrip(@Valid @RequestBody CreateTripRequest request) {
        try {
            Trip trip = tripService.createTrip(request);
            return ResponseEntity.ok(trip);
        }
        catch(Exception e) {
            e.printStackTrace();
            // Return error details to frontend for debugging
            return ResponseEntity.internalServerError().body(
                java.util.Map.of(
                    "error", e.getClass().getSimpleName(),
                    "message", e.getMessage() != null ? e.getMessage() : "Unknown error"
                )
            );
        }
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<Trip> getTripById(@PathVariable String tripId) {
        try {
            Trip trip = tripService.getTripById(tripId);
            if(trip != null) return ResponseEntity.ok(trip);

            return ResponseEntity.notFound().build();
        }
        catch(ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<Trip>> getUserTrips(@PathVariable String userEmail) {
        try {
            List<Trip> trips = tripService.getUserTrips(userEmail);
            return ResponseEntity.ok(trips);
        }
        catch(ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{tripId}")
    public ResponseEntity<Void> deleteTrip(@PathVariable String tripId) {
        try {
            boolean deleted = tripService.deleteTrip(tripId);
            if(deleted) {
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        }
        catch(ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
