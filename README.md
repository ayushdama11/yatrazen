# Zenyatra - AI-Based Trip Planner

Zenyatra is an AI-powered trip planning website that helps users create personalized travel itineraries. Using AI, it considers various factors such as budget, number of days, and group size to provide optimized travel plans.

## Features
- AI-powered trip planning with Gemini API
- User-friendly interface built with React
- Real-time database storage using Firebase
- Responsive design with Tailwind CSS

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Firebase (Firestore for database, Firebase Authentication)
- **AI Integration:** Gemini API

## Installation & Setup
Follow these steps to run Zenyatra on your local machine:

1. Clone the repository:
   ```sh
   git clone https://github.com/ayushdama11/zenyatra.git
   cd zenyatra
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase and API keys:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database and Firebase Authentication
   - Create a `.env` file in the root directory and add your API configurations:
     ```env
     VITE_GOOGLE_PLACE_API_KEY=your_google_place_api_key
     VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_ai_api_key
     VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
     ```
4. Run the project:
   ```sh
   npm start
   ```

## Usage
1. Enter trip details (destination, budget, number of travelers, days, etc.)
2. AI generates an optimized itinerary
3. Users can customize and save their itinerary

## Contributing
Feel free to contribute by opening issues or submitting pull requests!

## Contact
For any queries, reach out to me at [ayushdama07@gmail.com] or visit my GitHub profile at [GitHub](https://github.com/ayushdama11).

