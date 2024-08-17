## github frontend- https://github.com/Nisha0202/store_jobtask_frontend
## github backend- https://github.com/Nisha0202/store_jobtask_backend
## website - https://store1eda.netlify.app

# MERN E-commerce Project

This is a single-page e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application includes features such as product sorting, filtering, pagination, search functionality, Firebase email/password and Google login, and more.

## Project Structure

The project is divided into two main parts:
1. **Frontend**: A React application.
2. **Backend**: A Node.js and Express.js server connected to a MongoDB database.

---

## Backend

### Features

- **Product Management**: 
  - Fetch products with sorting, filtering, and pagination.
  - Search products by name.
- **MongoDB Integration**: 
  - Data is stored and managed in a MongoDB database.
- **Environment Variables**: 
  - Environment-specific configurations are managed using a `.env` file.
- **CORS Enabled**: 
  - Cross-origin requests are enabled to allow communication between the frontend and backend..

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local or cloud-based)

### Installation

1. Clone the backend repository:
   ```bash
   git clone <https://github.com/Nisha0202/store_jobtask_backend>
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root of the backend directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```


### Environment Variables

Create a `.env` file in the root of the backend directory and add the following variables:

```env
PORT=5000
S3_BUCKET=your_mongodb_username
SECRET_KEY=your_mongodb_password
```

### Running the Server

To start the server, run:

```bash
npm start
```

The server will start on `http://localhost:5000`.

## API Endpoints

### 1. Get All Products

**GET** `/products`

Fetch products with optional sorting, filtering, and pagination.

**Query Parameters:**

- `page` (default: 1) - The page number for pagination.
- `limit` (default: 9) - The number of products per page.
- `search` - Search term for product name.
- `brand` - Filter by brand name.
- `category` - Filter by category.
- `priceRange` - Price range filter, formatted as `minPrice-maxPrice` (e.g., `10-50`).
- `sort` - Field to sort by (e.g., `price`).
- `order` - Sort order (`asc` or `desc`).

**Response Headers:**

- `X-Total-Count` - Total number of products matching the criteria.

**Example Request:**

```bash
GET /products?page=2&limit=10&search=phone&brand=Apple&sort=price&order=desc
```

### 2. Root Endpoint

**GET** `/`

A simple endpoint to check if the server is running.

**Response:**

```json
{
  "message": "server running"
}
```

## Database Configuration

The backend connects to a MongoDB database using the following configuration:

```javascript
const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.5cua0xk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
```

Ensure your MongoDB connection string is correctly configured in the `.env` file using the `S3_BUCKET` and `SECRET_KEY` variables.

## Middleware

- **CORS**: Cross-Origin Resource Sharing is enabled to allow requests from different origins.
- **JSON Parsing**: Express's built-in JSON parser middleware is used to parse incoming requests with JSON payloads.

## Error Handling

Errors during database operations or API calls are caught and returned with a 500 status code along with a relevant error message.

## Deployment

For deployment, ensure both the frontend and backend are correctly configured to run in your chosen environment (I deployed in Vercel).

### Environment Variables

Ensure all environment variables are properly set for both the frontend and backend in your production environment.

---

## Acknowledgments

- Firebase for authentication.
- MongoDB for database management.
- React.js, Node.js, Express.js for the robust framework and libraries.

---

This README should help set up and run your project locally and provide a good foundation for others to understand the structure and purpose of the project.