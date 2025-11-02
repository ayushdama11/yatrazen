package com.yatrazen.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSelection {
    private Location location;
    private String noOfDays;
    private String budget;
    private String traveler;
}
