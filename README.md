# Blog Api
A Node.js API built with NestJS for managing blog posts and user interactions. This project demonstrates practical skills in API design and development.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Git**: For cloning the repository.
- **Node.js and npm**: For managing dependencies and running the application. [Download Node.js](https://nodejs.org/) if you haven’t already.
- **Docker**(optional): You'd need this to spin up a postgres instance if you want to.

## Installation

1. Clone the repository
```bash
git clone https://github.com/tonievictor/blog.nodejs.git blog
cd blog
```

2. Install Dependencies
```bash
pnpm install
```

3. Configure Environment Variables
Create a `.env` file in the root directory and provide the following
```bash
# Provide these if you'd be using docker to spin up a postgres instance
DB_USER=
DB_NAME=
DB_PASSWORD=
DB_PORT=

DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"

JWT_SECRET=
JWT_EXPIRATION=
SALT=
```
> **Note** If you're using docker compose, run `docker compose up` to spin up the database instance

4. Generate Database Client
```bash
npx prisma generate
```

## Running the app
- To start the development server, run
```bash
pnpm run start:dev
```

- Access Swagger Documentation
Open your browser and navigate to http://localhost:3000/docs to view the API documentation.

## Stay in touch
- Author - [Tonie Victor]()
- Website - [tonie.me](https://tonie.me/)
- Twitter - [@victortonie](https://twitter.com/victortonie)
