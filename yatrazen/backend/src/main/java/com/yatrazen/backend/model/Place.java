package com.yatrazen.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Place {
    private String placeName;
    private String placeDetails;
    private String placeImageUrl;
    private GeoCoordinates geoCoordinates;
    private String ticketPricing;
    private Double rating;
    private String travelTime;
    private String bestTimeSlotToVisit;
    private String timeToTravel;
}
