# API Documentation

## Users

- **GET** `/users` - Retrieve a list of users.
- **POST** `/users` - Create a new user.
- **GET** `/users/{id}` - Retrieve a specific user by ID.
- **PUT** `/users/{id}` - Update a specific user by ID.
- **DELETE** `/users/{id}` - Delete a specific user by ID.
- **POST** `/users/{id}/bookmarks` - Add a bookmark for a user.
- **GET** `/users/{id}/bookmarks` - Retrieve bookmarks for a user.
- **DELETE** `/users/{id}/bookmarks` - Remove a bookmark for a user.

## Articles

- **GET** `/articles` - Retrieve a list of articles.
- **POST** `/articles` - Create a new article.
- **GET** `/articles/{id}` - Retrieve a specific article by ID.
- **PUT** `/articles/{id}` - Update a specific article by ID.
- **DELETE** `/articles/{id}` - Delete a specific article by ID.
- **PATCH** `/articles/{id}/publish` - Publish a specific article by ID.

## Authentication

- **POST** `/auth/login` - Authenticate a user and obtain a token.
- **GET** `/auth/logout` - Log out the user and invalidate the token.
