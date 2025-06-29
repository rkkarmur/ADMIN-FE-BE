# Rental Admin Backend

This project is a Node.js/TypeScript backend using Express and Prisma (MongoDB). It provides authentication APIs along with a generated Swagger specification.

## Requirements

- Node.js v20.x
- npm
- MongoDB database

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env` and update the values for your environment.

   ```bash
   cp .env.example .env
   # edit .env with your database url and secrets
   ```

3. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

4. **Run database seed** (creates an admin role and user)

   ```bash
   npm run seed
   ```

## Running the Project

### Development

Run the server with automatic reload:

```bash
npm run dev
```

### Production build

Build the TypeScript files and start the compiled server:

```bash
npm run build
npm start
```

The server listens on the port configured in `.env` (default `3003`).

## API Documentation

Swagger documentation is served with basic authentication. By default it is available at:

```
http://localhost:<PORT>/v1/api-docs
```

(Replace `<PORT>` with the value from your `.env`.)

Use username `user` and password `password` when prompted.

## Testing

Unit tests are written with Jest. Run all tests with:

```bash
npm test
```

## Project Structure

```
├── server.ts            # Entry point that starts the Express server
├── src
│   ├── app.ts           # Express app configuration
│   ├── config           # Environment configuration
│   ├── middleware       # Custom middleware (auth, cors, i18n, session)
│   ├── modules          # Feature modules (e.g. auth)
│   ├── prisma           # Prisma client instance
│   ├── resources        # Localization strings
│   ├── swagger          # Swagger docs generator and definitions
│   └── types            # Shared TypeScript types
├── prisma
│   └── schema.prisma    # Prisma schema for MongoDB
└── scripts
    └── seed             # Seed script to create admin role/user
```

## Running Locally with Docker (optional)

If you prefer using Docker, ensure MongoDB is available and run:

```bash
docker build -t rental-admin-be .
```

Then start the container exposing the desired port.


