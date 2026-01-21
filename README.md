# Doc-Station - Orthopedic Surgery Platform

[![Version](https://img.shields.io/badge/version-1.2.1-blue.svg)](https://github.com/elrefai99/doc-station)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)

A comprehensive healthcare platform connecting patients with orthopedic surgeons and providing a marketplace for surgical instruments. The platform enables seamless appointment booking, medical consultations, and equipment rental services.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Payment Integration](#payment-integration)
- [User Roles & Permissions](#user-roles--permissions)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Doc-Station** is a specialized healthcare platform designed for the orthopedic surgery industry. It serves as a bridge between patients seeking medical consultations and doctors providing expert care, while also offering a marketplace for orthopedic surgical instruments and equipment.

### Core Objectives

- **Patient Care**: Enable patients to easily find and book appointments with qualified orthopedic surgeons
- **Doctor Efficiency**: Provide doctors with tools to manage their practice, view patient histories, and rent surgical equipment
- **Equipment Access**: Facilitate the rental of high-quality orthopedic surgical instruments
- **Secure Transactions**: Integrate multiple payment gateways for secure and convenient payments

---

## Key Features

### For Doctors

- **Profile Management**: Create and manage professional profiles with specializations, work hours, and pricing
- **Appointment Management**: View, accept, or reject patient booking requests
- **Equipment Rental**: Browse and rent orthopedic surgical instruments via **Amazon Payment Services**
- **Patient History**: Access patient medical histories and previous consultations
- **Real-time Chat**: Communicate with patients through integrated messaging system
- **Transaction Dashboard**: Track all equipment rentals and consultation payments
- **Notifications**: Receive real-time updates on bookings and messages

### For Patients

- **Doctor Discovery**: Search and filter orthopedic surgeons by location, specialization, and availability
- **Easy Booking**: Schedule appointments with preferred doctors based on their availability
- **Secure Payments**: Pay for consultations using **Paymob** payment gateway
- **Medical History**: Maintain and share medical records with doctors
- **Real-time Chat**: Direct messaging with doctors for consultations
- **Transaction History**: View all past bookings and payments
- **Notifications**: Get updates on appointment status and doctor responses

### For Administrators

- **User Management**: Manage doctors, patients, and their accounts
- **Content Management**: Manage blogs, products, brands, and galleries
- **Analytics**: Monitor platform usage, bookings, and transactions
- **Promocode Management**: Create and manage promotional codes
- **System Settings**: Configure platform-wide settings and parameters

---

## Technology Stack

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.IO for WebSocket connections
- **Queue System**: BullMQ with Redis for background jobs
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer with Sharp for image processing
- **API Documentation**: Swagger UI

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes (K8s)
- **Process Manager**: PM2 (ecosystem.config.js)
- **Web Server**: Nginx
- **Cloud Storage**: AWS S3 for file storage
- **Email Service**: SendGrid for transactional emails

### Security & Performance

- **Helmet**: Security headers
- **CORS**: Cross-Origin Resource Sharing
- **Rate Limiting**: Express Rate Limit
- **Encryption**: bcrypt for password hashing, crypto-js for data encryption
- **Database Acceleration**: Prisma Accelerate

### Development Tools

- **Package Manager**: pnpm
- **Dev Server**: Nodemon with concurrently
- **Code Quality**: ESLint
- **Testing**: Jest
- **Database Visualization**: hviz

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Layer                          │
│       (Mobile Apps, Web Browsers, Admin Dashboard)          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (Nginx)                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express.js Application                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   REST API   │  │  WebSocket   │  │   Swagger    │       │
│  │  Endpoints   │  │  (Socket.IO) │  │     Docs     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│  PostgreSQL  │ │    Redis    │ │   AWS S3     │
│   Database   │ │   (Queue)   │ │  (Storage)   │
└──────────────┘ └─────────────┘ └──────────────┘
```

### Project Structure

```
doc-station/
├── src/
│   ├── modules/          # Feature modules (user, booking, product, etc.)
│   ├── middleware/       # Authentication, validation, error handling
│   ├── socket/          # WebSocket event handlers
│   ├── Queue/           # Background job workers
│   ├── config/          # Configuration files
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── app.ts           # Application entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seeds/           # Database seeders
├── docker/              # Docker configurations
├── k8s/                 # Kubernetes manifests
├── public/              # Static files
└── tests/               # Test files
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** (recommended) or npm
- **PostgreSQL** >= 14
- **Redis** >= 6.0
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/elrefai99/doc-station.git
cd doc-station
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Environment Configuration**

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. **Database Setup**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed the database
pnpm run seed:all
```

5. **Start Development Server**

```bash
# Start both API server and worker
pnpm dev

# Or on Windows
pnpm dev:windows
```

The application will be available at `http://localhost:3000`

### Database Visualization

View your database schema visually:

```bash
pnpm run visualize
```

Access at `http://localhost:4000`

---

## Payment Integration

### Paymob (Patient Bookings)

Patients use **Paymob** to pay for doctor consultations. The integration supports:

- Credit/Debit cards
- Mobile wallets
- Installment payments
- Secure 3D authentication

**Configuration:**
- API Key and Secret Key required in `.env`
- Webhook endpoint: `/api/v1/webhooks/paymob`
- Supports EGP currency

### Amazon Payment Services (Doctor Equipment Rental)

Doctors use **Amazon Payment Services** to rent surgical instruments. Features include:

- Multiple payment methods
- Tokenization for recurring rentals
- Fraud detection
- Multi-currency support

**Configuration:**
- Access Key and Secret Key required in `.env`
- Webhook endpoint: `/api/v1/webhooks/amazon-payment`
- Supports international transactions

---

## User Roles & Permissions

### Role-Based Access Control

| Feature | Patient | Doctor | Admin |
|---------|---------|--------|-------|
| View Doctors | ✅ | ❌ | ✅ |
| Book Appointments | ✅ | ❌ | ✅ |
| View Products | ❌ | ✅ | ✅ |
| Rent Equipment | ❌ | ✅ | ✅ |
| Manage Profile | ✅ | ✅ | ✅ |
| View Own Transactions | ✅ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| System Settings | ❌ | ❌ | ✅ |
| Chat Messaging | ✅ | ✅ | ✅ |

### User Status Management

Users can have the following statuses:
- `ACTIVE` - Normal account status
- `INACTIVE` - Temporarily disabled
- `VERIFIED` - Email/phone verified
- `BANNED` - Permanently blocked
- `SUSPENDED` - Temporarily suspended
- `DELETED` - Soft deleted
- `ARCHIVED` - Archived account

---

## API Documentation

### Swagger Documentation

Access interactive API documentation at:

```
http://localhost:3000/api-docs
```

### Main API Endpoints

#### Authentication
```
POST   /api/v1/auth/register          # Register new user
POST   /api/v1/auth/login             # User login
POST   /api/v1/auth/verify-otp        # Verify OTP
POST   /api/v1/auth/forgot-password   # Request password reset
POST   /api/v1/auth/reset-password    # Reset password
```

#### Doctors (Patient View)
```
GET    /api/v1/doctors                # List all doctors
GET    /api/v1/doctors/:id            # Get doctor details
GET    /api/v1/doctors/search         # Search doctors
```

#### Bookings
```
POST   /api/v1/bookings               # Create booking (Patient)
GET    /api/v1/bookings               # List bookings
GET    /api/v1/bookings/:id           # Get booking details
PATCH  /api/v1/bookings/:id/status    # Update booking status (Doctor)
```

#### Products (Doctor View)
```
GET    /api/v1/products               # List surgical instruments
GET    /api/v1/products/:id           # Get product details
GET    /api/v1/products/search        # Search products
```

#### Orders
```
POST   /api/v1/orders                 # Create order (Doctor)
GET    /api/v1/orders                 # List orders
GET    /api/v1/orders/:id             # Get order details
```

#### Chat
```
WebSocket: /socket.io
Events:
  - join_room
  - send_message
  - receive_message
  - typing
  - seen
```

---

## Database Schema

### Core Models

#### User
Stores all user information (patients, doctors, admins)
- Authentication credentials
- Profile information
- Role and status management
- Relationships to bookings, orders, and profiles

#### Doctor Profile
Extended information for doctors
- Work hours and availability
- Pricing information
- Location (governorate and city)
- Address details

#### Booking
Patient-doctor appointments
- Date and time
- Status (PENDING, PAYMENT, ACCEPTED, REJECTED)
- Price and payment information
- Links to orders and chat rooms

#### Order
Transactions for both bookings and equipment
- Supports booking payments (patients)
- Supports product rentals (doctors)
- Status tracking (PENDING, SUCCESS, REFUNDED, FAILED)

#### Products
Surgical instruments and equipment
- Title, description, and content
- Pricing and brand information
- Image gallery
- Tags for categorization

#### Medical History
Patient medical records
- Start date
- Images and documentation
- Description of conditions

### Relationships

```
User (Patient) ──1:N──> Booking ──1:N──> Order
User (Doctor)  ──1:N──> Booking
User (Doctor)  ──1:1──> Doctor Profile
User (Doctor)  ──1:N──> Order (Equipment Rental)
Products       ──1:N──> Gallery (Images)
Brands         ──1:N──> Products
```

---

## Deployment

### Docker Deployment

#### Development

```bash
docker-compose -f docker-compose.dev.yml up
```

#### Production

```bash
docker-compose up -d
```

### Kubernetes Deployment

```bash
# Apply configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

### Manual Deployment

1. **Build the application**

```bash
pnpm run build
```

2. **Start with PM2**

```bash
pm2 start ecosystem.config.js
```

3. **Configure Nginx**

Use the provided `nginx.conf` as a template for your reverse proxy configuration.

### Environment-Specific Configurations

- **Development**: Uses `.env.dev` with hot-reloading
- **Production**: Uses `.env` with optimized builds
- **Testing**: Separate test database configuration

---

## Testing

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in development
pnpm test:local

# Run with coverage
pnpm test -- --coverage
```

### Test Structure

Tests are organized by feature modules and include:
- Unit tests for utilities and services
- Integration tests for API endpoints
- E2E tests for critical user flows

---

## Scripts

```bash
# Development
pnpm dev              # Start dev server with worker
pnpm dev:windows      # Windows-specific dev command

# Building
pnpm build            # Compile TypeScript to JavaScript

# Production
pnpm start            # Start production server

# Database
pnpm seed             # Seed governorates
pnpm seed:city        # Seed cities
pnpm seed:all         # Seed all data

# Utilities
pnpm lint             # Run ESLint
pnpm visualize        # Visualize database schema
pnpm taze:update      # Update dependencies
```

---

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent brute force attacks
- **Helmet**: Security headers
- **CORS**: Controlled cross-origin requests
- **Input Validation**: class-validator for request validation
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **XSS Protection**: Input sanitization
- **HTTPS**: Enforced in production

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## License

This project is licensed under the ISC License.

---

## Support

For support and questions:

- **Email**: support@doc-station.com
- **Issues**: [GitHub Issues](https://github.com/elrefai99/doc-station/issues)
- **Documentation**: [API Docs](http://localhost:3000/api-docs)

---

## Acknowledgments

- **Paymob** for payment gateway services
- **Amazon Payment Services** for equipment rental transactions
- **Prisma** for excellent ORM
- **Socket.IO** for real-time communication
- All contributors and users of the platform

---

## Roadmap

### Upcoming Features

- [ ] Mobile applications (iOS & Android)
- [ ] Video consultation integration
- [ ] AI-powered doctor recommendations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Telemedicine features
- [ ] Prescription management
- [ ] Insurance integration
- [ ] Review and rating system
- [ ] Automated appointment reminders

---

<div align="center">

**Made with ❤️ for better healthcare**

[⬆ Back to Top](#doc-station---orthopedic-surgery-platform)

</div>
