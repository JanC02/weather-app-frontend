# Weather App - Frontend 🌤️

A frontend for a weather application built with **React** and **TypeScript**. This application fetches weather data from a backend proxy server to display current weather information in a modern and secure way.

***

## Tech Stack

*   **React**
*   **Vite**
*   **TypeScript**
*   **TailwindCSS**
*   **Zod** (for data validation)

***

## Features

*   **City Search**: Autocomplete suggestions for easy city searching.
*   **Current Weather**: Displays temperature, perceived temperature, pressure, and humidity.
*   **Daily & Hourly Forecasts**: Provides a 7-day weather forecast and detailed hourly data.
*   **Meteorograms**: Visual charts for temperature, precipitation, and humidity.
*   **Persistent State**: Remembers the user's last searched location for a better experience.

***

## Architecture & Design Patterns

*   **React Context**: Used for global state management, providing weather data throughout the component tree.
*   **Singleton Pattern**: The `WeatherService` class ensures a single point of contact for all API interactions.
*   **Schema Validation**: Responses from the backend are validated using `Zod` to ensure data integrity and prevent runtime errors.

***

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-frontend-repository-url>
    cd <project-folder-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a `.env` file in the root directory. You need to provide the URL of the backend proxy server.

    **Important**: In Vite, environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

    ```env
    # The URL of the backend proxy server
    VITE_API_PROXY_URL=http://localhost:5000
    ```

4.  **Run the application:**
    *   For development (with auto-reload):
        ```bash
        npm run dev
        ```
    *   To build for production:
        ```bash
        npm run build
        ```
    After building, the production-ready files will be available in the `dist` directory.

***

## License

This project is licensed under the MIT License.