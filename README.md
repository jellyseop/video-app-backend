# video-app-backend

simple CRUD backend with express, mongoDB, REST, session authentication

**userRoutes.js:**

- [✅] `POST /api/users` - Create a new user (createUser)

- [✅] `POST /api/users/login` - User login (login)
- [✅] `POST /api/users/logout` - User logout (logout)

- [✅] `GET /api/users/:id` - Get user details by ID (getUserById)
- [✅] `PATCH /api/users/:id` - Update user details by ID (updateUserById)
- [✅] `DELETE /api/users/:id` - Delete user by ID (deleteUserById)
- [] `GET /api/users/:id/videos` - Get videos created by a user (getVideosByUser)

- [] `GET /api/users/:id/subscription` - get subscribed users (getSubscribedUsers)
- [🚀] `POST /api/users/:id/subscription` - subscribe a user (subscribeUser)
- [] `DELETE /api/users/:id/subscription` - unsubscribe a user (unsubscribeUser)

**videoRoutes.js:**

- [] `POST /api/videos` - Create a new video (uploadVideo)
- [] `GET /api/videos/:id` - Get video details by ID (getVideoById)
- [] `PATCH /api/videos/:id` - Update video details (updateVideoById)
- [] `DELETE /api/videos/:id` - Delete a video (deleteVideoById)

- [] `GET /api/videos/search` - Search videos by user or video title (searchVideo)

- [] `POST /api/videos/:id/like` - like a video by ID (likeVideo)
- [] `DELETE /api/videos/:id/like` - Unlike a video by ID (unlikeVideo)

- [] `POST /api/videos/:id/comment` - Add a comment to a video (addVideoComment)
- [] `GET /api/videos/:id/comment` - Get comments for a video (getVideoComments)

**commentRoutes.js:**

- [] `PATCH /api/comments/:id` - Update comment details by ID (updateCommentById)
- [] `DELETE /api/comments/:id` - Delete comment by ID (deleteCommentById)

- [] `POST /api/comments/:id/reply` - Add a new reply to a comment (addCommentReply)
- [] `GET /api/comments/:id/reply` - Get replies for a comment. (getCommentReplies)

- [] `PATCH /api/comments/reply/:id` - update reply by ID (UpdateReplyById)
- [] `DELETE /api/comments/reply/:id` - delete reply by ID (DeleteReplyById)

- [] `POST /api/comments/:id/like` - Like a comment (likeComment)
- [] `DELETE /api/comments/:id/like` - Unlike a comment (unlikeComment)

**_todo_**

1. handle thumbnail in Video
2. change password endpoint
