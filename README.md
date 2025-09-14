# PDF Annotator - Backend

This is the backend server for the PDF Annotator application, built with Node.js, Express, and MongoDB. It handles user authentication, PDF file uploads, and saving highlight data.

## Features

* **User Authentication:** JWT-based registration and login system.
* **PDF Management:** Upload, list, and delete PDF files.
* **Highlight Persistence:** Save and retrieve text highlight data for each PDF.
* **Secure Storage:** Stores PDF files locally on the server and metadata in MongoDB.

## Tech Stack

* **Node.js**
* **Express**
* **MongoDB** (with Mongoose)
* **JSON Web Token (JWT)** for authentication
* **Multer** for file uploads
* **bcryptjs** for password hashing

## Setup and Installation

To run this server locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd pdf-annotator-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables:
    ```env
    MONGO_URI="your_mongodb_connection_string"
    JWT_SECRET="your_super_secret_jwt_key"
    PORT=5000
    ```

4.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will be running on `http://localhost:5000`.

## API Endpoints

A brief overview of the available API routes:

* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Log in a user and get a token.
* `POST /api/pdfs/upload`: Upload a new PDF file (protected).
* `GET /api/pdfs`: Get a list of all PDFs for the logged-in user (protected).
* `DELETE /api/pdfs/:uuid`: Delete a specific PDF (protected).
* `POST /api/highlights`: Create a new highlight (protected).
* `GET /api/highlights/:pdfUuid`: Get all highlights for a specific PDF (protected).