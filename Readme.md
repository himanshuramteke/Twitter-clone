<h1 align="center">Twitter Clone 𝕏</h1>

![](./frontend/public/Screenshot%202025-07-31%20221827.png)

This project is a full-stack Twitter clone using MERN stack, designed to replicate the core functionality of Twitter. It allows users to sign up, log in, create and manage posts, follow other users, receive notifications, and customize their profiles. The application is built using a modern tech stack, with a React frontend and a Node.js/Express backend.

<h1 align="center">Key Features🚀</h1>

- **User Authentication:** Secure signup, login, and logout functionality using JWT.
- **Post Management:** Create, read, update, and delete posts with text and images.
- **Following/Unfollowing:** Users can follow and unfollow other users to curate their feeds.
- **News Feed:** Display posts from followed users and a "For You" feed.
- **User Profiles:** Customizable user profiles with cover and profile images, bio, and posts.
- **Notifications:** Real-time notifications for likes, comments, and follows.
- **Data Fetching & Caching:** Efficient data fetching and caching using React Query.
- **Responsive Design:** A user interface that adapts to different screen sizes.
- **Error Handling:** Robust error handling and user-friendly notifications.

## 🛠️ Tech Stack

- **Frontend:**
  - React
  - React Router DOM
  - @tanstack/react-query
  - react-hot-toast
  - react-icons
  - Axios
  - DaisyUI
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express
  - jsonwebtoken (JWT)
  - cookie-parser
  - cors
  - Mongoose
  - dotenv
  - Cloudinary
- **Database:**
  - MongoDB

---

## 📦 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database instance
- Cloudinary account (for image storage)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd twitter-clone
    ```

2.  **Install dependencies:**

    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    cd ..
    ```

3.  **Configure environment variables:**

    - Create a `.env` file in the `backend` directory.
    - Add the following environment variables, replacing the placeholders with your actual values:

      ```
      PORT=5001
      MONGODB_URI=<your_mongodb_connection_string>
      NODE_ENV=development
      JWT_TOKEN=<your_jwt_secret_key>
      CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
      CLOUDINARY_API_KEY=<your_cloudinary_api_key>
      CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
      ```

### Running Locally

1.  **Build the frontend:**

    ```bash
    npm run build --prefix frontend
    ```

2.  **Start the backend server:**

    ```bash
    npm run start --prefix backend
    ```

The frontend application will be accessible at `http://localhost:5173` (or the port specified in your frontend configuration), and the backend API will be running at `http://localhost:5001` (or the port specified in your `.env` file).

## 💻 Project Structure

```
twitter-clone/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── dbConfig.js
│   │   │   └── serverConfig.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── notification.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/
│   │   │   └── protectRoute.js
│   │   ├── models/
│   │   │   ├── notification.model.js
│   │   │   ├── post.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── notification.route.js
│   │   │   ├── post.routes.js
│   │   │   └── user.routes.js
│   │   ├── index.js
│   │   └── utils/
│   │       └── cloudinary.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── apis/
│   │   │   ├── auth.js
│   │   │   ├── notifications.js
│   │   │   ├── posts.js
│   │   │   └── user.js
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── Posts.jsx
│   │   │   ├── layouts/
│   │   │   │   ├── RightPanel.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── svgs/
│   │   │   │   └── X.jsx
│   │   ├── config/
│   │   │   └── axiosConfig.js
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── LoginPage.jsx
│   │   │   │   └── signup/
│   │   │   │       └── SignupPage.jsx
│   │   │   ├── home/
│   │   │   │   ├── CreatePost.jsx
│   │   │   │   └── HomePage.jsx
│   │   │   └── profile/
│   │   │       ├── EditProfileModal.jsx
│   │   │       └── ProfilePage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## 💖 Thanks Message

Thank you for checking out this Twitter Clone project! I hope it's helpful and inspiring. Your feedback and contributions are highly appreciated.
