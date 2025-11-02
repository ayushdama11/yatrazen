package com.yatrazen.backend.dto;

import com.google.firebase.database.annotations.NotNull;
import com.yatrazen.backend.model.TripData;
import com.yatrazen.backend.model.UserSelection;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTripRequest {
    @NotNull
    @Email
    private String userEmail;

    @NotNull
    private UserSelection userSelection;

    private TripData tripData;
}
