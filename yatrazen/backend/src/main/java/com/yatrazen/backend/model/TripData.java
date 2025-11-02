package com.yatrazen.backend.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TripData {
    private List<Hotel> hotelOptions;
    private List<Itinerary> itinerary;
}
