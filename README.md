# TherMite Educare

## Overview
This is a single page application built with React and Vite for easy deployment on Vercel.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

This project is configured for direct deployment to Vercel as a static site. Follow these steps:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. The application will be built and deployed as a static site

## API Endpoints

The application uses Vercel Serverless Functions for its backend functionality:

- `/api/health`: A simple health check endpoint

To add more API endpoints, create JavaScript files in the `/api` directory. These will automatically be deployed as serverless functions.

## Project Structure

- `/client/src`: Main application code
- `/client/public`: Static assets
- `/shared`: Shared code between client and server (if any)
- `/attached_assets`: Additional assets for the application
- `/api`: Vercel serverless functions 

## Build Configuration

This project uses:
- Vite for building and development
- React for the UI
- TailwindCSS for styling
- Vercel serverless functions for backend functionality

The build output is directed to the `/dist` directory which is used by Vercel for deployment. 