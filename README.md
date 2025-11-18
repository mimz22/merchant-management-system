# MerchantHub - Full-Stack Business Management System

![Django](https://img.shields.io/badge/Django-4.2-092E20?style=flat-square&logo=django)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)

A production-ready full-stack web application for merchant management with advanced analytics, data export capabilities, and RESTful API architecture.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Next.js)     │◄──►│   (Django)      │◄──►│ (PostgreSQL)    │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Backend Infrastructure
- **Framework**: Django 4.2.7 (Python 3.11+)
- **API**: Django REST Framework 3.14.0
- **Database**: PostgreSQL 15 (SQLite3 for development)
- **CORS**: django-cors-headers 4.3.1
- **Server**: Gunicorn 21.2.0 (Production)
- **Environment**: python-decouple 3.8

### Frontend Architecture
- **Framework**: Next.js 14 (React 18+)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.0+
- **Font**: Montserrat (Google Fonts)
- **HTTP Client**: Axios
- **Build Tool**: Webpack (via Next.js)

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **Development Server**: Next.js Dev Server + Django runserver
- **Production**: Gunicorn + Nginx (recommended)
- **Version Control**: Git

## 🚀 Quick Start Guide

### System Requirements
```bash
# Required Software
Docker Engine >= 20.10.0
Docker Compose >= 2.0.0
Git >= 2.30.0

# Optional (for local development)
Python >= 3.11.0
Node.js >= 18.0.0
npm >= 9.0.0
```

### 🐳 Docker Installation (Recommended)

1. **Clone Repository**
```bash
git clone https://github.com/mimz22/merchant-management-system.git
cd merchant-management-system
```

2. **Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables (optional)
nano .env
```

3. **Build and Start Services**
```bash
# Build and start all containers
docker-compose up --build -d

# View logs
docker-compose logs -f

# Check container status
docker-compose ps
```

4. **Database Migration**
```bash
# Run Django migrations
docker-compose exec backend python manage.py migrate

# Create superuser (optional)
docker-compose exec backend python manage.py createsuperuser
```

5. **Access Applications**
```bash
# Frontend Application
http://localhost:3000

# Backend API
http://localhost:8000/api/

# Django Admin
http://localhost:8000/admin/

# API Documentation
http://localhost:8000/api/merchants/
```

## 📁 Project Structure

```
merchant-management-system/
├── backend/                    # Django REST API
│   ├── merchant_system/        # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py         # Django configuration
│   │   ├── urls.py            # URL routing
│   │   └── wsgi.py            # WSGI application
│   ├── merchants/             # Merchant app
│   │   ├── migrations/        # Database migrations
│   │   ├── __init__.py
│   │   ├── admin.py          # Django admin config
│   │   ├── models.py         # Data models
│   │   ├── serializers.py    # DRF serializers
│   │   ├── urls.py           # App URL patterns
│   │   └── views.py          # API views
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile            # Backend container config
│   └── manage.py             # Django CLI
├── frontend/                  # Next.js application
│   ├── src/
│   │   ├── app/              # App Router (Next.js 13+)
│   │   │   ├── globals.css   # Global styles
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── page.tsx      # Home page
│   │   ├── components/       # React components
│   │   │   ├── MerchantForm.tsx
│   │   │   ├── MerchantList.tsx
│   │   │   └── Statistics.tsx
│   │   ├── services/         # API services
│   │   │   └── merchantService.ts
│   │   └── types/            # TypeScript definitions
│   │       └── merchant.ts
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── tsconfig.json         # TypeScript config
│   ├── next.config.js        # Next.js configuration
│   └── Dockerfile            # Frontend container config
├── docker-compose.yaml        # Multi-container orchestration
├── .gitignore                # Git ignore patterns
├── .env.example              # Environment template
└── README.md                 # Documentation
```

## Key Features

**Merchant Management**
- Create, read, update, and delete merchant records
- Store business information (name, email, phone, registration number)
- Track merchant status (Active, Pending, Suspended)

**Data Analytics**
- View merchant statistics dashboard
- Export merchant data as CSV files
- Generate comprehensive JSON reports
- Filter and search merchant records

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:8000/api/
Production: https://your-domain.com/api/
```

### Authentication
```bash
# No authentication required for this demo
# In production, implement JWT or Session authentication
```

### Merchant Endpoints

#### List All Merchants
```http
GET /api/merchants/
Content-Type: application/json

# Query Parameters
?status=Active          # Filter by status
?search=company         # Search by name/email
?ordering=-created_at   # Sort results
```

#### Create Merchant
```http
POST /api/merchants/
Content-Type: application/json

{
  "name": "Tech Solutions Ltd",
  "email": "contact@techsolutions.com",
  "phone": "+1234567890",
  "business_registration_number": "REG123456",
  "status": "Active"
}
```

#### Get Merchant Details
```http
GET /api/merchants/{id}/
Content-Type: application/json
```

#### Update Merchant
```http
PUT /api/merchants/{id}/
Content-Type: application/json

{
  "name": "Updated Company Name",
  "status": "Suspended"
}
```

#### Delete Merchant
```http
DELETE /api/merchants/{id}/
```

### Analytics Endpoints

#### Get Statistics
```http
GET /api/merchants/statistics/

# Response
{
  "total": 150,
  "active": 120,
  "pending": 25,
  "suspended": 5
}
```

#### Export CSV
```http
GET /api/merchants/export_csv/
Content-Type: text/csv
Content-Disposition: attachment; filename="merchants_export_20231118.csv"
```

#### Generate Report
```http
GET /api/merchants/generate_report/
Content-Type: application/json
Content-Disposition: attachment; filename="merchant_report_20231118.json"
```

### Error Responses
```json
{
  "error": "Validation failed",
  "details": {
    "email": ["This field must be unique."]
  }
}
```

## 💻 Local Development Setup

### Backend Development
```bash
# Navigate to backend directory
cd backend/

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Environment setup
export DEBUG=True
export SECRET_KEY='your-secret-key'
export DATABASE_URL='sqlite:///db.sqlite3'

# Database setup
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver 0.0.0.0:8000
```

### Frontend Development
```bash
# Navigate to frontend directory
cd frontend/

# Install dependencies
npm install
# or
yarn install

# Environment setup
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start development server
npm run dev
# or
yarn dev

# Build for production
npm run build
npm start
```

### Development Tools
```bash
# Backend testing
cd backend/
python manage.py test

# Frontend linting
cd frontend/
npm run lint
npm run type-check

# Database operations
python manage.py shell
python manage.py dbshell
```

## 🗄️ Database Schema

### Merchant Model (Django ORM)
```python
# backend/merchants/models.py
class Merchant(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Pending', 'Pending'),
        ('Suspended', 'Suspended'),
    ]
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=17, validators=[phone_regex])
    business_registration_number = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['business_registration_number']),
            models.Index(fields=['status']),
        ]
```

### Database Migration
```bash
# Generate migration files
python manage.py makemigrations merchants

# Apply migrations
python manage.py migrate

# View migration status
python manage.py showmigrations
```

### SQL Schema (PostgreSQL)
```sql
CREATE TABLE merchants_merchant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    phone VARCHAR(17) NOT NULL,
    business_registration_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_merchant_email ON merchants_merchant(email);
CREATE INDEX idx_merchant_reg_number ON merchants_merchant(business_registration_number);
CREATE INDEX idx_merchant_status ON merchants_merchant(status);
```

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test merchants

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

### Frontend Testing
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Production Deployment

### Environment Variables
```bash
# Backend (.env)
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/merchantdb
ALLOWED_HOSTS=your-domain.com,www.your-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com

# Frontend (.env.production)
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXTAUTH_URL=https://your-frontend-domain.com
```

### Docker Production Build
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy with production config
docker-compose -f docker-compose.prod.yml up -d
```

## 🛠️ Development Commands

### Django Management
```bash
# Create new Django app
python manage.py startapp app_name

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Django shell
python manage.py shell

# Database shell
python manage.py dbshell
```

### Next.js Commands
```bash
# Development server
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

## 📊 Performance Monitoring

### Backend Monitoring
```python
# Add to settings.py for production
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # ... other apps
    'debug_toolbar',  # Development only
]

# Database query optimization
from django.db import connection
print(len(connection.queries))  # Monitor query count
```

### Frontend Monitoring
```javascript
// next.config.js
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
```

## 🤝 Contributing

### Development Workflow
```bash
# 1. Fork and clone
git clone https://github.com/your-username/merchant-management-system.git
cd merchant-management-system

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Make changes and test
npm test
python manage.py test

# 4. Commit changes
git add .
git commit -m "feat: add new feature"

# 5. Push and create PR
git push origin feature/new-feature
```

### Code Standards
```bash
# Python (Backend)
black backend/
flake8 backend/
isort backend/

# JavaScript/TypeScript (Frontend)
npm run lint:fix
npm run format
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mimi Oppong**
- GitHub: [@mimz22](https://github.com/mimz22)
- LinkedIn: [Mimi Oppong](https://linkedin.com/in/mimi-oppong)

## 🙏 Acknowledgments

- Django REST Framework documentation
- Next.js team for excellent React framework
- Tailwind CSS for utility-first styling
- PostgreSQL community
- Docker for containerization