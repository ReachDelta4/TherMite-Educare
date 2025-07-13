# Vercel Deployment Guide

## Issue Resolution

The problem you're experiencing where Vercel shows compiled code instead of your application is due to incorrect deployment configuration. Here's how to fix it:

## 1. Project Structure

Your project has been configured with:
- `client/` - React frontend
- `server/` - Express backend
- `vercel.json` - Vercel configuration
- `client/package.json` - Client dependencies
- `client/vite.config.ts` - Client build configuration

## 2. Deployment Steps

### Step 1: Install Dependencies
```bash
npm install
cd client && npm install && cd ..
```

### Step 2: Build the Application
```bash
npm run build
```

### Step 3: Deploy to Vercel
```bash
vercel --prod
```

## 3. Configuration Files

### vercel.json
This file tells Vercel how to handle your full-stack application:
- Routes API calls to the server
- Routes all other requests to the server (which serves the React app)
- Sets function timeout to 30 seconds

### client/vite.config.ts
Configures the client build process to output to `../dist/public`

### server/index.ts
Updated to serve static files in production mode

## 4. Common Issues & Solutions

### Issue: Shows compiled code instead of app
**Solution**: Ensure `vercel.json` is properly configured and all routes point to `server/index.ts`

### Issue: Build fails
**Solution**: 
1. Check that all dependencies are installed
2. Ensure TypeScript compilation passes
3. Verify build scripts work locally

### Issue: API routes not working
**Solution**: Ensure routes are prefixed with `/api` and the server handles them correctly

## 5. Environment Variables

Set these in Vercel dashboard:
- `NODE_ENV=production`
- `PORT=3000` (Vercel will override this)
- Any database connection strings
- Any API keys

## 6. Testing Deployment

1. Deploy to Vercel
2. Check the health endpoint: `https://your-app.vercel.app/api/health`
3. Check the main app: `https://your-app.vercel.app/`

## 7. Troubleshooting

If you still see compiled code:
1. Clear Vercel cache: `vercel --force`
2. Check build logs in Vercel dashboard
3. Ensure `vercel.json` is in the root directory
4. Verify all files are committed to git

## 8. Alternative Approach

If the above doesn't work, you can also try:
1. Deploy only the client to Vercel
2. Deploy the server separately (Railway, Render, etc.)
3. Configure CORS and proxy settings

## 9. Local Testing

Test the production build locally:
```bash
npm run build
npm start
```

Visit `http://localhost:5000` to verify everything works. 