package com.yatrazen.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
    private String hotelName;
    private String hotelAddress;
    private String price;
    private String hotelImageUrl;
    private GeoCoordinates geoCoordinates;
    private Double rating;
    private String description;
}
