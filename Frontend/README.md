# R-DENTAL - A React E-Commerce Website for Dental Care

This repository contains the frontend code for an e-commerce website for dental care products. The website is built using React, Vite, and Firebase.

## Features

- User authentication using Firebase
- Product listing and filtering
- Product details page with reviews and ratings
- Cart and checkout functionality
- Payment integration using Razorpay
- Responsive design for desktop and mobile devices

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository using `git clone <repository-url>`
2. Install the dependencies using `npm install`
3. Create a new branch using `git checkout -b <branch-name>`
4. Make changes to the code and commit them using `git commit -m "<commit-message>"`
5. Push the changes to the remote repository using `git push origin <branch-name>`
6. Create a pull request to merge the changes into the main branch

## Firebase Setup

To setup the Firebase backend, follow these steps:

1. Create a new Firebase project in the Firebase console
2. Enable the Firebase Realtime Database and Cloud Functions
3. Install the Firebase CLI using `npm install -g firebase-tools`
4. Initialize the Firebase project using `firebase init`
5. Deploy the Cloud Functions using `firebase deploy --only functions`

## Environment Variables

The project uses the following environment variables:

- `REACT_APP_FIREBASE_API_KEY`: The Firebase API key
- `REACT_APP_FIREBASE_AUTH_DOMAIN`: The Firebase authentication domain
- `REACT_APP_FIREBASE_PROJECT_ID`: The Firebase project ID
- `REACT_APP_RAZORPAY_KEY_ID`: The Razorpay key ID
- `REACT_APP_RAZORPAY_KEY_SECRET`: The Razorpay key secret

You can add these variables to your `.env` file in the project root.
