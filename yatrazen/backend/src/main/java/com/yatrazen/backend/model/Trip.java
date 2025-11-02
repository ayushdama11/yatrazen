package com.yatrazen.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trip {
    private String id;
    private String userEmail;
    private UserSelection userSelection;
    private TripData tripdata;
    private Long createdAt;
}
