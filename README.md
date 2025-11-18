# MerchantHub - Business Management System

A modern web application for managing merchant information with data export capabilities. Built as a full-stack solution using Django and Next.js.

## Overview

MerchantHub is a business management platform that allows users to:
- Add, edit, and delete merchant records
- View merchant statistics and analytics
- Export merchant data as CSV files
- Generate comprehensive business reports
- Filter merchants by status (Active, Pending, Suspended)

## Technology Stack

**Backend (API)**
- Django 4.2 - Python web framework
- Django REST Framework - API development
- PostgreSQL - Database (SQLite for development)

**Frontend (User Interface)**
- Next.js 14 - React framework
- TypeScript - Type-safe JavaScript
- Tailwind CSS - Styling framework

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mimz22/merchant-management-system.git
cd merchant-management-system
```

2. **Start the application**
```bash
docker-compose up --build
```

3. **Access the application**
- Web Interface: http://localhost:3000
- API Documentation: http://localhost:8000/api

## Project Structure

```
merchant-management-system/
├── backend/           # Django API server
│   ├── merchants/     # Merchant data models and views
│   └── manage.py      # Django management commands
├── frontend/          # Next.js web application
│   └── src/           # Source code
└── docker-compose.yaml # Container orchestration
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

## API Endpoints

- `GET /api/merchants/` - List all merchants
- `POST /api/merchants/` - Create new merchant
- `GET /api/merchants/{id}/` - Get merchant details
- `PUT /api/merchants/{id}/` - Update merchant
- `DELETE /api/merchants/{id}/` - Delete merchant
- `GET /api/merchants/statistics/` - Get statistics
- `GET /api/merchants/export_csv/` - Export CSV
- `GET /api/merchants/generate_report/` - Generate report

## Development

**Local Development**
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
```

## Database Schema

**Merchant Model**
- `id` - Primary key
- `name` - Business name
- `email` - Contact email (unique)
- `phone` - Contact phone number
- `business_registration_number` - Unique identifier
- `status` - Active/Pending/Suspended
- `created_at` - Creation timestamp
- `updated_at` - Last modification timestamp

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Author

Built by [Mimi Oppong](https://github.com/mimz22)