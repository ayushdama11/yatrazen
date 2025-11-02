package com.yatrazen.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class GooglePlaceService {
    @Value("${google.places.api.key}")
    private String apiKey;

    // webclient is used to make http request to google place api
    private final WebClient webClient;
    private static final String PLACES_API_URL = "https://places.googleapis.com/v1/places:searchText";

    public GooglePlaceService() {
        this.webClient = WebClient.builder()
            .baseUrl(PLACES_API_URL)
            .build();
    }

    public Mono<String> searchPlaces(String textQuery) {
        Map<String, String> reqBody = new HashMap<>();
        reqBody.put("textQuery", textQuery);

        return webClient.post()
            .header("Content-Type", "application/json")
            .header("X-Goog-Api-Key", apiKey)
            .header("X-Goog-FieldMask", "places.photo,place.displayName,places.id")
            .bodyValue(reqBody)
            .retrieve()
            .bodyToMono(String.class);
    }

    public String getPhotoUrl(String photoName) {
        return "https://places.googleapis.com/v1" + photoName + "/media?maxHeightPx=1000&maxWidthPx=1000&key=" + apiKey;
    }
}
