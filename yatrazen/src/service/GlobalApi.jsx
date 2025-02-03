// post request to google place api
import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config = {
    headers: {
        'Content-Type' : 'application/json',
        'X-Goog-Api-Key' : import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask' : [      // Specifies which fields to retrieve from the API response
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config)

// This function:
// Takes data (the search query) as an argument.
// Makes a POST request using axios.post().
// Sends the request to BASE_URL with:
// data as the request body (contains the search text).
// config for headers.