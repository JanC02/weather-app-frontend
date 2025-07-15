# Weather App - Frontend 🌤️

A frontend for a weather application built with **React** and **TypeScript**. This application fetches weather data from a backend proxy server to display current weather information in a modern and secure way.

***

## Tech Stack

* **React**
* **Vite**
* **TypeScript**
* **TailwindCSS**

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
    Copy the `.env.example` file (if it exists) or create a new `.env` file in the root directory. Then, add the URL to your backend proxy server:
    ```env
    # The URL of the backend proxy server
    API_PROXY_URL=http://localhost:5000
    ```
    **Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

4.  **Run the application:**
    * For development (with auto-reload):
        ```bash
        npm run dev
        ```
    * To build for production:
        ```bash
        npm run build
        ```
    After building, the production-ready files will be available in the `dist` directory.

***

## Configuration

For the application to work correctly, a running backend proxy server is required. Ensure that the server address in the `.env` file (`VITE_API_PROXY_URL`) is correct and points to your running backend.

***

## License

This project is licensed under the MIT License.