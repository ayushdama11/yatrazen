import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // This header is mandatory for the new Places API to return the 'places' array
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'
    }
};

// Function to fetch place details (POST request)
const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

// Helper URL for images
const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + apiKey;

// Default export to support "GlobalApi.GetPlaceDetails" syntax
export {
    GetPlaceDetails,
    PHOTO_REF_URL
}