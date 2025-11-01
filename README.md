# Wanderlust

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-brightgreen?style=for-the-badge)](https://major-project-9owe.onrender.com/listings)

## Overview

**Wanderlust** is a feature-rich web application designed to inspire travel and exploration, providing users with interactive listings and destination information. It's a full-stack application built using the MVC (Model-View-Controller) pattern, featuring user authentication, image uploads, and interactive maps.

## 🛠 Tech Stack

The project is built with a modern web development stack:

| Category     | Technology                    | Description                                     |
| :----------- | :---------------------------- | :---------------------------------------------- |
| **Backend**  | **Node.js**                   | JavaScript runtime for the server.              |
|              | **Express.js**                | Web framework for Node.js.                      |
|              | **Mongoose**                  | Object Data Modeling (ODM) library for MongoDB. |
| **Frontend** | **EJS (Embedded JavaScript)** | Templating engine to generate dynamic HTML.     |
|              | **Bootstrap**                 | CSS framework for responsive design.            |
|              | **Mapbox GL JS**              | Interactive map rendering.                      |
| **Database** | **MongoDB Atlas**             | Cloud-hosted NoSQL database service.            |
| **Services** | **Cloudinary**                | Cloud service for image uploading and storage.  |
|              | **Passport.js**               | Authentication middleware for Node.js.          |

## 🚀 Getting Started & Local Setup

Follow these steps to get a copy of the project running on your local machine for development and testing.

### 1. Prerequisites

You must have the following software installed:

- [Node.js](https://nodejs.org/) (which includes `npm`)
- [Git](https://git-scm.com/)

### 2. Installation

1.  **Clone the repository** to your local machine:

    ```sh
    git clone [https://github.com/anupsingh04/Wanderlust.git](https://github.com/anupsingh04/Wanderlust.git)
    cd Wanderlust
    ```

2.  **Install all npm dependencies:**
    ```sh
    npm install
    ```

### 3. Environment Variable Setup (.env)

This is the most critical step. The app requires secret keys to connect to third-party services.

1.  In the root of the `Wanderlust` folder, create a new file named exactly **`.env`**

2.  Copy the following structure into your new `.env` file and prepare to fill in the values:

    ```env
    # MongoDB Atlas Connection String
    ATLASDB_URL=

    # Cloudinary Credentials
    CLOUD_NAME=
    CLOUD_API_KEY=
    CLOUD_API_SECRET=

    # Mapbox API Token
    MAP_TOKEN=

    # Session Secret
    SECRET=mysecretcode
    ```

#### A. Get Your MongoDB URL (`ATLASDB_URL`)

1.  Go to [MongoDB Atlas](https://cloud.mongodb.com/) and create a free account.
2.  Create a new **free (M0)** cluster.
3.  Go to **Database Access** and create a **new database user** (e.g., `dev-user` with a password `dev-password`).
4.  Go to **Network Access** and add your IP address.
    - **For development:** The easiest way is to click **"Add IP Address"** -> **"Allow Access From Anywhere"** (which adds `0.0.0.0/0`).
5.  Go back to your Cluster Dashboard, click **"Connect"** -> **"Connect your application"**.
6.  Copy the connection string, replace `<password>` with the password you created, and paste it into your `.env` file.

#### B. Get Your Cloudinary Credentials

1.  Go to [Cloudinary](https://cloudinary.com/) and create a free account.
2.  On your main Dashboard, you will find your:
    - **Cloud Name** (`CLOUD_NAME`)
    - **API Key** (`CLOUD_API_KEY`)
    - **API Secret** (`CLOUD_API_SECRET`)
3.  Copy and paste these values into your `.env` file.

#### C. Get Your Mapbox Token (`MAP_TOKEN`)

1.  Go to [Mapbox](https://www.mapbox.com/) and create a free account.
2.  On your account dashboard, go to the **"Access tokens"** page.
3.  Copy your **"Default public token"** and paste it into `MAP_TOKEN`.

#### D. Set Your Session Secret (`SECRET`)

For `SECRET`, you can just type any long, random string. This is used to sign session cookies.

### 4. Run the Application

You're all set! Now, run the start command from your terminal:

```sh
npm start
```

````

The app will start on **http://localhost:8080**.

## 🐛 Troubleshooting

- **`MongooseServerSelectionError` or `Could not connect to any servers in your MongoDB Atlas cluster`**:
  This is almost always an IP whitelist error. Go to your **MongoDB Atlas -\> Network Access** settings and confirm that **"Allow Access From Anywhere" (`0.0.0.0/0`)** is active.

## 📂 Folder Structure

The project is organized using the MVC pattern for a clear separation of concerns:

```
Wanderlust/
│
├── app.js              # Main server entry point
├── cloudConfig.js      # Cloudinary configuration
├── middleware.js       # Custom middleware functions
├── schema.js           # Joi validation schemas
├── package.json        # Project dependencies
│
├── controllers/        # Business logic (links models and views)
│   ├── listings.js     # Listing-related logic
│   ├── reviews.js      # Review-related logic
│   └── users.js        # User-related logic
│
├── models/             # Mongoose data models and schemas
│   ├── listing.js      # Listing model
│   ├── review.js       # Review model
│   └── user.js         # User model
│
├── routes/             # Express route definitions
│   ├── listing.js      # Listing routes
│   ├── review.js       # Review routes
│   └── user.js         # User routes
│
├── views/              # EJS templates for the UI
│   ├── includes/       # Reusable partials (e.g., navbar, footer)
│   ├── layouts/        # Layout templates
│   ├── listings/       # Listing templates
│   └── users/          # User templates
│
├── public/             # Static assets (CSS, client-side JS)
│   ├── images/         # Image assets
│   ├── css/            # Stylesheets
│   └── js/             # Client-side JavaScript
│
├── utils/              # Utility/helper functions
│   ├── ExpressError.js # Custom error class
│   └── wrapAsync.js    # Async error wrapper
│
└── init/               # Database initialization script
    ├── data.js         # Sample data for seeding the database
    └── index.js        # Script to run the seeding
```

## 🤝 Contributing

Contributions are welcome\! To contribute:

1.  **Fork the repository** on GitHub.

2.  **Clone your fork** to your local machine.

3.  **Create a new branch** for your feature or bugfix:

    ```sh
    git checkout -b feature-name
    ```

4.  **Make your changes** and commit them:

    ```sh
    git add .
    git commit -m "Describe your changes"
    ```

5.  **Push to your branch** and open a Pull Request.

Please follow best practices for coding and documentation.

## License

This project is not licensed yet, but it will most probably be licensed under the MIT License in the future.

## Contact

For questions or suggestions, feel free to open an issue or contact [anupsingh04](https://github.com/anupsingh04).

```

```
````
