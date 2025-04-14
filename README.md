# 📱 Social Network API

A backend RESTful API for a social network web application that enables users to share their thoughts, react to thoughts, and manage a friend list. Built with **Express.js**, **MongoDB**, and **Mongoose**, this project demonstrates how NoSQL databases can be used in modern web apps.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript (ES6+)

---

## 📋 Table of Contents

- [Installation](#💻-installation)
- [Usage](#🚀-usage)
- [API Endpoints](#🛣️-api-endpoints)
- [Data Models](#🧠-data-models)
- [Walkthrough Video](#🎥-walkthrough-video)
- [License](#📄-license)

---

## 💻 Installation

1. **Clone the Repository**

```bash
git clone https://github.com/Anshul1555/socialNetwork.git
cd social-network-api
```

2.Install Dependencies

```bash
npm install
```

3.Start MongoDB Make sure MongoDB is running on your local machine.

4.Run the Server

````bash
npm start```

## 🚀 Usage

Once your server is running, use Insomnia or Postman to test the API routes.
There is no frontend for this application. All interactions happen through API requests.


## 🛣️ API Endpoints

### `/api/users`

| Method | Endpoint           | Description                                           |
|--------|--------------------|-------------------------------------------------------|
| GET    | `/api/users`       | Get all users                                        |
| GET    | `/api/users/:id`   | Get a single user by ID with thoughts and friends    |
| POST   | `/api/users`       | Create a new user                                    |
| PUT    | `/api/users/:id`   | Update a user by ID                                  |
| DELETE | `/api/users/:id`   | Delete a user and their associated thoughts          |

---

### `/api/users/:userId/friends/:friendId`

| Method | Description                               |
|--------|-------------------------------------------|
| POST   | Add a friend to a user's friend list      |
| DELETE | Remove a friend from the user's friend list |

---

### `/api/thoughts`

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/thoughts`      | Get all thoughts         |
| GET    | `/api/thoughts/:id`  | Get a single thought     |
| POST   | `/api/thoughts`      | Create a new thought     |
| PUT    | `/api/thoughts/:id`  | Update a thought by ID   |
| DELETE | `/api/thoughts/:id`  | Delete a thought by ID   |

---

### `/api/thoughts/:thoughtId/reactions`

| Method | Description                              |
|--------|------------------------------------------|
| POST   | Add a reaction to a thought              |
| DELETE | Remove a reaction by `reactionId`        |


## 🧠 Data Models

### 🧍 User Model

```js
{
  username: String,         // Required, Unique
  email: String,            // Required, Valid email, Unique
  thoughts: [ObjectId],     // References Thought model
  friends: [ObjectId]       // References other User documents
}
```

### Thought Model

```js
{
  thoughtText: String,      // Required, 1–280 characters
  createdAt: Date,          // Defaults to current time
  username: String,         // Required
  reactions: [reactionSchema]
}
```

### Reaction Schema (Subdocument of Thought)
```js
{
  reactionId: ObjectId,     // Default: new ObjectId
  reactionBody: String,     // Required, max 280 characters
  username: String,         // Required
  createdAt: Date           // Defaults to current time
}
```

### Authentication
🔒 Currently: No authentication is implemented.

### 🎥 Walkthrough Video
````
