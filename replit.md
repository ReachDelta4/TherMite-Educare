# TherMite Educare - Business Automation Platform

## Overview

This is a full-stack business automation platform designed specifically for TherMite Educare, an educational technology company. The platform provides comprehensive automation tools for lead management, customer communication, certificate generation, and business analytics. Built as a modern web application with React frontend and Express backend, it features a sophisticated dashboard system with multiple automation modules.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: React Router with lazy loading for performance
- **Charts**: Recharts integration for data visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety
- **Build System**: ESBuild for production bundling
- **Development**: TSX for hot reloading
- **API Design**: RESTful API structure with /api prefix

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless integration
- **Schema Management**: Drizzle Kit for migrations
- **Type Generation**: Automatic TypeScript types from schema

## Key Components

### Authentication & User Management
- User registration and login system
- Role-based access control with permissions
- User profile management
- Session management with PostgreSQL session store

### Automation Modules

#### WhatsApp Bot System
- Campaign creation and management
- Visual flow designer for conversation logic
- Template management with AI responses
- Contact management and segmentation
- Real-time analytics and engagement tracking

#### Certificate Generation
- Visual certificate builder with Fabric.js canvas
- Template management system
- Bulk certificate generation
- Automated delivery via email/WhatsApp
- Certificate verification system with QR codes

#### AI Calling Agent
- Integration with Retell AI for voice interactions
- Call script builder with branching logic
- Voice customization and selection
- Call analytics and performance tracking
- Lead qualification automation

#### Analytics Dashboard
- Customizable dashboard widgets
- Real-time metrics visualization
- Advanced analytics with multiple chart types
- Report builder with scheduled exports
- Performance tracking across all modules

### Design System
- Consistent color palette with HSL values
- Gradient system for visual hierarchy
- Shadow system for depth and elevation
- Responsive design with mobile-first approach
- Dark mode support through CSS variables

## Data Flow

### User Interaction Flow
1. User authenticates through login system
2. Dashboard loads with personalized metrics
3. User navigates to specific automation modules
4. Real-time updates via API calls
5. Data visualization updates automatically

### Automation Processing Flow
1. User configures automation rules
2. System processes campaigns/workflows
3. External integrations handle execution
4. Results tracked and stored in database
5. Analytics updated in real-time

### Data Storage Pattern
- User data and configurations in PostgreSQL
- Session management through connect-pg-simple
- File uploads handled through secure endpoints
- Analytics data aggregated for performance

## External Dependencies

### Third-Party Integrations
- **Neon Database**: Serverless PostgreSQL hosting
- **Retell AI**: Voice calling and conversation AI
- **WhatsApp Business API**: Message automation
- **Email Services**: Certificate and notification delivery

### Key Libraries
- **React Flow**: Visual workflow builder
- **Fabric.js**: Canvas-based certificate editor
- **React Hook Form**: Form validation and management
- **Zod**: Runtime type validation
- **Date-fns**: Date manipulation and formatting
- **Recharts**: Chart and visualization library

### Development Tools
- **Replit Integration**: Development environment support
- **ESLint & Prettier**: Code quality and formatting
- **TypeScript**: Static type checking
- **Vite Plugins**: Development enhancement

## Deployment Strategy

### Build Process
1. Frontend built with Vite to `dist/public`
2. Backend bundled with ESBuild to `dist/index.js`
3. Static assets served from build directory
4. Environment variables for configuration

### Production Setup
- Node.js server serving both API and static files
- PostgreSQL database with connection pooling
- Environment-based configuration
- Process management for stability

### Development Workflow
- Hot reloading for both frontend and backend
- TypeScript compilation checking
- Database schema synchronization
- Integrated error handling and logging

### Scalability Considerations
- Modular component architecture for easy extension
- Database schema designed for growth
- API structure supports additional endpoints
- Configurable automation limits and quotas

The platform is designed to handle TherMite Educare's specific business needs while maintaining flexibility for future expansion and customization.