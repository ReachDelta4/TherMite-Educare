# TherMite Educare

## Overview
This is a simple single-page application built with React and Vite for easy deployment on Vercel.

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
3. The application will be automatically built and deployed

## Project Structure

- `/client/src`: Application source code
- `/client/public`: Static assets
- `/dist`: Build output directory
- `/api`: Serverless API endpoints (optional)

## Build Configuration

This project uses:
- Vite for building and development
- React for the UI
- TailwindCSS for styling

The build output is directed to the `/dist` directory which Vercel uses for deployment. 