package com.yatrazen.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yatrazen.backend.dto.PlaceSearchRequest;
import com.yatrazen.backend.service.GooglePlaceService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/places")
public class PlacesController {
    @Autowired
    private GooglePlaceService googlePlaceService;

    @PostMapping("/search")
    public Mono<ResponseEntity<String>> searchPlaces(@RequestBody PlaceSearchRequest request) {
        return googlePlaceService.searchPlaces(request.getTextQuery())
            .map(ResponseEntity::ok)
            .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/photo")
    public ResponseEntity<String> getPhotoUrl(@RequestParam String photoName) {
        String photoUrl = googlePlaceService.getPhotoUrl(photoName);
        return ResponseEntity.ok(photoUrl);
    }
}
