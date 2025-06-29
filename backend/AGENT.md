# Agent Overview

This project does not implement a classical AI agent but relies on middleware components that act as gatekeepers to the Express routes. The main "agent" logic centers around the authentication middleware that verifies session tokens and user roles.

## Structure

```
src/
  middleware/
    auth.ts      # `jwtAuthSession` - verifies JWT stored in the session
    session.ts   # Express session configuration backed by MongoDB
    cors.ts      # Cross‑origin configuration
```

The `auth.ts` file exposes a function `jwtAuthSession` that returns an Express middleware. It reads the JWT token from the session, validates it using helper functions in `src/helper/jwt.ts`, checks the user's role, and attaches the decoded token to the request object.

## Key Functions

### `jwtAuthSession(allowedRoles)`
- **Purpose**: Protect routes by ensuring the requester has a valid session token and, optionally, a required role.
- **Flow**:
  1. Retrieve the `token` from `req.session`.
  2. Verify the token via `verifyToken`.
  3. Fetch the user from the database (`findOneUser`).
  4. If the user is active and the role matches `allowedRoles`, attach user info to the request and call `next()`.
  5. Otherwise respond with `401` unauthorized using `responseSender`.

### `sessionMiddleware`
Defined in `src/middleware/session.ts`. Configures express-session to store sessions in MongoDB using `connect-mongodb-session`. It ensures session data persists and sets cookie options.

### Helper Functions
Located in `src/helper`:
- `generateToken` and `verifyToken` (in `jwt.ts`) handle JWT creation and validation.
- `encryptPassword` and `compareData` (in `bcrypt.ts`) manage password hashing and comparison.

## Example Workflow

1. A user logs in through `/api/v1/auth/login`.
2. On success, `AuthController.login` saves the JWT in the session (`req.session.token`).
3. Subsequent requests to protected routes (e.g. `/api/v1/auth/profile`) pass through `jwtAuthSession`. The middleware validates the session token and, if valid, allows the request to proceed.
4. When logging out, `AuthController.logout` clears the stored token and destroys the session.

These components together form the authorization agent responsible for ensuring only authenticated users can access protected endpoints.


