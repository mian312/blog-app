# Blog-App

Blog-App is a social media web application built with Next.js 14, TypeScript, and MongoDB. It allows users to create, read, update, and delete blog posts, as well as interact with other users through comments and likes.

## Features

- **User Authentication:** Users can sign up, log in, and log out securely using authentication.
- **Create and Edit Posts:** Users can create new blog posts and edit their existing posts.
- **Liking Posts:** Users can like posts to show their appreciation.
- **Saving Posts:** Users can save posts to show their appreciation.
- **Responsive Design:** The application is designed to work seamlessly on desktop, tablet, and mobile devices.
- **Clerk:** Clerk is used as the authentication service provider for user authentication and session management.

## Technologies Used

- **Next.js 14:** Next.js is a React framework that enables server-side rendering and other powerful features out of the box.
- **TypeScript:** TypeScript adds static typing to JavaScript, providing better tooling and catching errors early in the development process.
- **MongoDB:** MongoDB is a NoSQL database used for storing and managing the application's data.
- **Tailwind CSS:** Tailwind CSS is a utility-first CSS framework used for styling the application's components.


## Getting Started

To get started with the Blog-App web application, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine using the following command:
```
git clone https://github.com/mian312/blog-app.git
```
2. **Install Dependencies:** Navigate into the cloned repository directory and install the necessary dependencies using npm or yarn:
```
cd Blog-App
npm install
```
3. **Set Up Environment Variables:** Create a `.env.local` file in the root directory and add the following environment variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>
WEBHOOK_SECRET=<YOUR_WEBHOOK_SECRET>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

MONGO_URI=<YOUR_MONGODB_URI>
DB_NAME=Blog-Sphere
```

5. **Open the Application:** Open your web browser and navigate to `http://localhost:3000` to view the Blog-App web application.
