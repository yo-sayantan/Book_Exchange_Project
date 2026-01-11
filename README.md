# Book Exchange Platform

A comprehensive full-stack application designed to facilitate the exchange of books between users. This platform features a robust Java Spring Boot backend and a dynamic React frontend, ensuring a seamless user experience.

## Tech Stack

*   **Backend:** Java 17, Spring Boot 3.2.5, Spring Security, JWT, Spring Data JPA
*   **Frontend:** React 18, Material UI (MUI), Redux, Axios
*   **Database:** MySQL
*   **Build Tools:** Maven (Backend), npm (Frontend)

## Prerequisites

Ensure you have the following installed on your machine:

1.  **Java Development Kit (JDK) 17** or higher.
2.  **Node.js** (LTS recommended) and **npm**.
3.  **MySQL Server**.

## Installation & Setup

### 1. Database Setup

1.  Open your MySQL Workbench or Command Line.
2.  Create a new database named `mf_suger_uat` (this is the default name configured in the application).
    ```sql
    CREATE DATABASE mf_suger_uat;
    ```
3.  Import the provided SQL dump file `BookExchange_SQL_Dump.sql` (located in the root directory) into this new database.
    *   **Command Line:** `mysql -u root -p mf_suger_uat < BookExchange_SQL_Dump.sql`
    *   **Workbench:** Server -> Data Import -> Import from Self-Contained File.

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd Book_Exchange_Platform_Backend
    ```
2.  **Configuration:** Open `src/main/resources/application.properties` and verify the database configuration matches your local setup:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/mf_suger_uat
    spring.datasource.username=root
    spring.datasource.password=root
    server.port=6464
    ```
    *   *Note: Update the username and password if your local MySQL credentials are different.*
    *   *Note: Check `spring.mvc.cors.allowed-origins` and update it to `http://localhost:3000` to allow requests from your local frontend.*

3.  **Run the Application:**
    You can run the application using the Maven wrapper included in the project:
    *   **Windows:**
        ```bash
        ./mvnw.cmd spring-boot:run
        ```
    *   **Mac/Linux:**
        ```bash
        ./mvnw spring-boot:run
        ```
    *   Alternatively, if you have Maven installed globally: `mvn spring-boot:run`

    The backend server will start on port `6464`.

### 3. Frontend Setup

1.  Open a new terminal and navigate to the UI directory:
    ```bash
    cd Book_Exchange_Platform_UI
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *   *If you encounter dependency conflicts, try:* `npm install --legacy-peer-deps` or `npm install --force`

3.  **Run the Application:**
    ```bash
    npm start
    ```
    The application will launch in your default browser at `http://localhost:3000`.

## Deployment

To deploy this application for production:

### Backend
1.  Generate the JAR file:
    ```bash
    ./mvnw clean package
    ```
2.  The executable JAR will be created in the `target` directory (e.g., `BookExchange-0.0.1-SNAPSHOT.jar`).
3.  Run the JAR on your server:
    ```bash
    java -jar target/BookExchange-0.0.1-SNAPSHOT.jar
    ```

### Frontend
1.  Create a production build:
    ```bash
    npm run build
    ```
2.  This will create a `build` folder with static assets.
3.  Serve these static files using a web server like Nginx, Apache, or deploy them to a static site host (Netlify, Vercel, S3).
4.  *Note: Ensure the frontend API calls point to your production backend URL.*

## Usage

1.  Ensure both Backend and Database are running.
2.  Open `http://localhost:3000` in your web browser.
3.  Register a new account or log in with existing credentials (if provided in the SQL dump).
