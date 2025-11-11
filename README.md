# Task Management Application

A full-stack task management application built with NX monorepo, NestJS backend, and Angular frontend.

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Running the Applications
Start both backend and frontend:
```bash
nx run-many -t serve
```

Or run individually:
```bash
# Backend API (http://localhost:3000/api)
nx serve api

# Frontend (http://localhost:4200)
nx serve dashboard
```

### Testing
```bash
# Run all tests
nx run-many -t test

# Run specific project tests
nx test api
nx test dashboard

# Run integration tests
nx test api --testPathPattern=integration
```

## Architecture Overview

This is my first NX monorepo application. The Windows development environment required version downgrades (Angular 15, TypeScript 4.9.5) to achieve compatibility and rapid development.

### Monorepo Structure
```
apps/
├── api/           # NestJS backend
├── dashboard/     # Angular frontend
libs/              # Shared libraries (future)
```

### Backend Layered Architecture
The API follows a clean layered architecture:

- **Controller Layer** (`src/controller/`): HTTP endpoints and request/response handling with DTOs
- **Service Layer** (`src/service/`): Business logic (future implementation)
- **DAO Layer** (`src/dao/`): Data access with RBAC preparation
- **Database Layer** (`src/database/`): TypeORM entities and database configuration

### Frontend Architecture
The Angular dashboard implements a responsive design with:

- **Layout Component**: Desktop sidebar (768px+) and mobile bottom navigation
- **Task Components**: Hover cards (desktop) and click cards (mobile) with dynamic positioning
- **CSS Architecture**: Semantic classes using Tailwind @apply directives
- **Service Layer**: HTTP client integration with real API calls
- **Responsive Strategy**: Mobile-first design with 768px breakpoint

### Test Structure
Tests mirror the source structure:
```
test/
├── controller/    # Controller unit tests
├── dao/          # DAO unit tests  
├── database/     # Database unit tests
├── integration/  # End-to-end API tests
```

Unit tests use mocked dependencies. Integration tests use in-memory SQLite database for full application testing. Frontend tests (47 passing) cover components, services, and responsive behavior with Jest mocking.

## Development Steps

### Phase 1: Initialize Project
- Set up NX monorepo with apps/ and libs/ directories
- Configure NestJS backend with SQLite and TypeORM
- Configure Angular frontend with Tailwind CSS
- Resolve Windows compatibility issues with package versions

### Phase 2: Implement Simplest Working API
- Create Task entity with id and name fields
- Implement TaskDto with validation decorators
- Build TaskDao with get() method supporting optional ID filtering
- Create TaskController with GET /api/tasks endpoint
- Establish complete unit test coverage for all layers
- Add integration tests for end-to-end API verification

### Phase 3: Build Complete Frontend Dashboard
- Create responsive dashboard layout with desktop sidebar and mobile navigation
- Implement task list with hover/click card interactions
- Build dashboard home with stats cards, charts, and recent tasks
- Extract Tailwind CSS to semantic component classes
- Switch from mock data to real HTTP API integration
- Achieve 47/47 passing unit tests with proper mocking strategies
- Add Chart.js integration with graceful test environment degradation

### Break Time
- moving couch
- making family dinner
- watching toddler so mom gets a break

### Quick Break from Break
- hop in to work on the backend a little bit

## Current Features

- SQLite database with TypeORM
- Task CRUD operations (GET implemented)
- Request validation with class-validator
- Comprehensive test suite (47 passing frontend + backend tests)
- Layered architecture ready for RBAC implementation
- Responsive Angular dashboard with desktop/mobile layouts
- Real-time task cards with hover/click interactions
- Chart.js integration for task visualization
- HTTP API integration between frontend and backend

## API Endpoints

### GET /api/tasks
Returns all tasks from the database.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Sample Task"
  }
]
```
