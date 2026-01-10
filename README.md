# Spring AI Project

This is a Spring Boot application demonstrating the use of Spring AI with Google's Generative AI models. The project provides a RESTful API for interacting with the AI models for various tasks such as getting answers, movie recommendations, text embeddings, similarity search, and product search.

## Technologies Used

*   Java 21
*   Spring Boot 3.5.9
*   Spring AI 1.1.2
*   Maven
*   Google Generative AI

## Features

*   **Chat:** Get answers from a chat model.
*   **Movie Recommendations:** Get movie recommendations based on genre, year, and language.
*   **Text Embeddings:** Generate embeddings for a given text.
*   **Text Similarity:** Calculate the similarity score between two texts.
*   **Product Search:** Search for products from a catalog using natural language.

## How to Run the Project

1.  **Prerequisites:**
    *   Java 21 or later
    *   Maven

2.  **Configuration:**
    *   You need to have a Google AI API key. Set the `spring.ai.google.genai.api-key` property in the `application.properties` file.

3.  **Running the application:**
    *   You can run the application using the following Maven command:
        ```bash
        ./mvnw spring-boot:run
        ```

The application will start on `http://localhost:8080`.

## API Endpoints

The following are the available API endpoints:

*   `GET /api/{message}`
    *   Get a response from the chat model.
    *   **Path Variable:** `message` - The message to send to the chat model.

*   `POST /api/recommend`
    *   Get a movie recommendation.
    *   **Request Parameters:**
        *   `type` - The genre of the movie (e.g., "action", "comedy").
        *   `year` - The approximate year of the movie.
        -   `lang` - The language of the movie.

*   `POST /api/embedding`
    *   Generate embeddings for a text.
    *   **Request Parameter:** `text` - The text to generate embeddings for.

*   `POST /api/similarity`
    *   Calculate the similarity between two texts.
    *   **Request Parameters:**
        *   `text1` - The first text.
        *   `text2` - The second text.

*   `POST /api/product`
    *   Search for products.
    *   **Request Parameter:** `text` - The search query.

This project uses an in-memory vector store, which is initialized at startup with product data from the `src/main/resources/product_details.txt` file.
