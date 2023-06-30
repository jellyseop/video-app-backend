# video-app-backend
simple CRUD backend with express, mongoDB, REST, session authentication

**userRoutes.js:**
- `POST /api/users` - Create a new user (createUser)
- 'join'
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/:id` - Get user details by ID (getUserById)
- `PUT /api/users/:id` - Update user details by ID (updateUserById)
- `DELETE /api/users/:id` - Delete user by ID (deleteUserById)
- `GET /api/users/:userId/videos` - Get videos created by a user
- 'change password'

**videoRoutes.js:**
- `POST /api/videos` - Create a new video (uploadVideo)
- `GET /api/videos/:id` - Get video details by ID (getVideoById)
- `PUT /api/videos/:id` - Update video details (updateVideoById)
- `DELETE /api/videos/:id` - Delete a video (deleteVideoById)

- `GET /api/videos/search` - Search videos by user or video title

- `GET /api/videos/:id/like` - Get likes for a specific video (getVideoLikes)
- `POST /api/videos/:id/like` - like a video by ID (likeVideo)
- `DELETE /api/videos/:id/like` - Unlike a video by ID (unlikeVideo)

- `POST /api/videos/:id/comments` - Add a comment to a video (addComment)
- `GET /api/videos/:id/comments` - Get comments for a video



**commentRoutes.js:**
- `POST /api/comments/:id/comments` - Add a new comment to a another comment (addComment)
- `GET /api/comments/:id/comments` - Get comments for a another comment.

- `PUT /api/comments/:id` - Update comment details by ID (updateCommentById)
- `DELETE /api/comments/:id` - Delete comment by ID (deleteCommentById)

- `GET /api/comments/:id/like` - Get likes for a specific comment (getCommentLikes)
- `POST /api/comments/:id/like` - Like a comment
- `DELETE /api/comments/:id/like` - Unlike a comment
