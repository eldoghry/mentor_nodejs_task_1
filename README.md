# Task 1 - Express API with Redis Caching

A RESTful API built with Express.js and TypeScript, featuring Redis caching and Docker containerization.

## Features

- Express.js with TypeScript
- Redis caching implementation
- Rate limiting with Redis
- Docker and Docker Compose support
- Health check endpoint
- API error handling
- Request retry mechanism with exponential backoff
- CORS enabled
- Security headers with Helmet
- Request logging with Morgan

## Prerequisites

- Node.js (Latest LTS Version)
- Docker and Docker Compose
- Redis

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Environment Variables

```
NODE_ENV=development
PORT=3000
REDIS_URI="redis://localhost:6379"
EXTERNAL_API_BASE_URL="https://externalApiExample.com"
DEFAULT_CACHE_TTL=300
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX_REQUESTS=100
```

## Running the Application

```bash
# Development with Docker
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Development without Docker
npm run dev

# Production Build
npm run build
npm start
```

## API Endpoints

- **GET /api/v1/health** - Health check endpoint
- **GET /api/v1/posts** - Get all posts

## Rate Limiting

The API implements rate limiting per IP address, method, and path combination. Rate limit headers are included in the response:

- X-RateLimit-Limit : Maximum number of requests allowed
- X-RateLimit-Remaining : Number of requests remaining in the current window
- X-RateLimit-Reset : Time in seconds until the rate limit resets
  When rate limit is exceeded, the API returns:

- Status code: 429
- Response: { "message": "Rate limit exceeded, try again later" }

## Project Structure

```
    ├── src/
    │ ├── config/ # Configuration files
    │ ├── controllers/ # Route controllers
    │ ├── middlewares/ # Custom middleware
    │ ├── routes/ # API routes
    │ ├── services/ # Business logic
    │ ├── utils/ # Utility functions
    │ ├── app.ts # Express app setup
    │ └── server.ts # Server entry point
    ├── env/ # Environment variables
    ├── tests/ # Test files
    └── docker-compose.yml # Docker composition
    └── docker-compose.dev.yml # Docker composition

```

## Docker Support

The application includes Docker support with separate configurations for development and production environments. The Docker setup includes:

- Node.js application container
- Redis container
- Volume mapping for persistent data
- Network configuration
