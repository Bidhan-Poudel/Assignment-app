# Real-Estate Buyer Portal

A full-stack, production-ready portal for real-estate buyers to browse and favourite properties. Built with Node.js, Express, TypeScript, Next.js (App Router), PostgreSQL, and Prisma.

## Application Architecture

- **Backend:** Layered/N-Tier MVC Architecture running on Node + Express + TypeScript.
- **Frontend:** Component-based UI using Next.js 14+ (App Router) and Vanilla CSS with a clean, dynamic aesthetic.
- **Database:** PostgreSQL ORM managed via Prisma.
- **Authentication:** Stateless JWT Token-based Auth with Argon2/Bcrypt password hashing.

## Prerequisites

- Node.js v18+
- Docker Desktop (if running PostgreSQL via container)
- NPM or PNPM

## Setup & Running Locally

### 1. Start the Database
Ensure you have a native **PostgreSQL server** installed and running on your local Windows machine. Create a database called `buyer_portal` and ensure your root user has the appropriate privileges.

By default, the backend expects a local user `admin` with password `secretpassword` running on port `5432`. Either create this role natively, or modify `.env` in the backend directory.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the Database and run the seed script:
   ```bash
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Server will run on `http://localhost:3001`)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
   *(Frontend will run on `http://localhost:3000`)*

## User Workflow Example

1. Navigate to `http://localhost:3000/login`.
2. Click **"Sign up"** to create a new Buyer account with an email and password.
3. Upon successful registration, you will automatically be redirected to the **Dashboard**.
4. Click the `Heart` icon on any property to add it to your favourites.
5. The property will immediately visibly append to your "My Favourites" section.

## Security Features Implemented

1. **Password Hashing:** Utilizing secure hash algorithms via `bcryptjs` with salts.
2. **JWT Auth:** JSON Web Tokens to safely associate users with their HTTP requests statelessley via `Authorization: Bearer <token>` schemas.
3. **Zod Validation:** Safely ensures request bodies (e.g. login schemas, email strings) are strongly enforced before reaching business logic.
4. **Relational Constraints:** Cascading Deletes via DB engine and specific constraints blocking duplicate properties favourited by the exact same user.
