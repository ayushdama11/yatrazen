package com.yatrazen.backend.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yatrazen.backend.dto.CreateTripRequest;
import com.yatrazen.backend.model.Trip;
import com.yatrazen.backend.model.TripData;

@Service
public class TripService {
    @Autowired
    private FirebaseService firebaseService;

    @Autowired
    private GeminiAIService geminiAIService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String AI_PROMPT = """
        Generate a Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.

        Provide the response in JSON format with the following structure: 
        {
          "hotelOptions": [ -- minimum 4 hotels neccesary
            {
              "hotelName": "string",
              "hotelAddress": "string",
              "price": "number",
              "hotelImageUrl": "string",
              "geoCoordinates": { "latitude": "number", "longitude": "number" },
              "rating": "number",
              "description": "string"
            }
          ],
          "itinerary": [
            {
              "day": "number",
              "places": [
                {
                  "placeName": "string",
                  "placeDetails": "string",
                  "placeImageUrl": "string",
                  "geoCoordinates": { "latitude": "number", "longitude": "number" },
                  "ticketPricing": "string",
                  "rating": "number",
                  "travelTime": "string",
                  "bestTimeSlotToVisit": "string",
                  "timeToTravel": "string"
                }
              ]
            }
          ]
        }
        Ensure "itinerary" is always an array containing "day" keys, with each day's "places" as an array.
        """;

    // ✅ Fixed method — the only createTrip method
    public Trip createTrip(CreateTripRequest request) throws Exception {
        TripData tripData;

        if (request.getTripData() != null) {
            tripData = request.getTripData();
        } else {
            String prompt = AI_PROMPT
                    .replace("{location}", request.getUserSelection().getLocation().getLabel())
                    .replace("{totalDays}", request.getUserSelection().getNoOfDays())
                    .replace("{traveler}", request.getUserSelection().getTraveler())
                    .replace("{budget}", request.getUserSelection().getBudget());

            String aiResponse = geminiAIService.generateTripPlan(prompt).block();

            JsonNode responseJson = objectMapper.readTree(aiResponse);
            String tripDataJson = responseJson.get("candidates").get(0).get("content")
                    .get("parts").get(0).get("text").asText();

            tripData = objectMapper.readValue(tripDataJson, TripData.class);
        }

        // Create trip object - saveTrip will auto-generate and set the ID
        Trip trip = new Trip();
        trip.setUserEmail(request.getUserEmail());
        trip.setUserSelection(request.getUserSelection());
        trip.setTripdata(tripData);
        trip.setCreatedAt(System.currentTimeMillis());

        // Save trip (Firestore auto-generates ID and sets it on the trip object)
        return firebaseService.saveTrip(trip);
    }

    public Trip getTripById(String tripId) throws ExecutionException, InterruptedException {
        return firebaseService.getTripById(tripId);
    }

    public List<Trip> getUserTrips(String userEmail) throws ExecutionException, InterruptedException {
        return firebaseService.getTripsByUserEmail(userEmail);
    }

    public boolean deleteTrip(String tripId) throws ExecutionException, InterruptedException {
        return firebaseService.deleteTrip(tripId);
    }
}
