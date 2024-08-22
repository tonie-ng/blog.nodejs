# Blog Api
A Node.js API built with NestJS for managing blog posts and user interactions. This project demonstrates practical skills in API design and development.

## Installation

- Clone the repository
```bash
git clone https://github.com/tonievictor/blog.nodejs.git blog
cd blog
```

- Install Dependencies
```bash
pnpm install
```

- Configure Environment Variables
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

- Generate Database Client
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
