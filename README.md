# MerchantHub 🏪

> **Premium Business Management Platform**  
> Luxury merchant management for sophisticated businesses with advanced analytics, seamless operations, and intelligent insights.

![MerchantHub](https://img.shields.io/badge/MerchantHub-Premium-gold?style=for-the-badge)
![Django](https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎯 Luxury Interface** - Minimalistic design with premium aesthetics
- **📊 Advanced Analytics** - Real-time insights and comprehensive reporting
- **🏪 Merchant Management** - Complete CRUD operations with intelligent filtering
- **🔒 Secure Architecture** - Enterprise-grade security and data protection
- **📱 Responsive Design** - Seamless experience across all devices
- **🚀 High Performance** - Optimized for speed and scalability
- **🎨 Modern UI/UX** - Dark theme with sophisticated animations

## 🛠️ Tech Stack

### Backend
- **Django 4.2** - Robust web framework
- **Django REST Framework** - Powerful API development
- **SQLite** - Lightweight database (production-ready PostgreSQL support)
- **Python 3.11+** - Modern Python features

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Montserrat Font** - Premium typography

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mimz22/merchant-management-system.git
cd merchant-management-system
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 📁 Project Structure

```
merchant-management-system/
├── backend/                 # Django REST API
│   ├── merchants/          # Merchant app
│   ├── merchant_system/    # Project settings
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript definitions
│   ├── package.json       # Node dependencies
│   └── tailwind.config.js # Styling configuration
└── README.md              # Project documentation
```

## 🎨 Design Philosophy

MerchantHub embodies **luxury minimalism** with:

- **Monochromatic Palette** - Black, white, and gold accents
- **Ultra-thin Typography** - Sophisticated font weights
- **Subtle Animations** - Smooth, purposeful transitions
- **Premium Spacing** - Generous whitespace and precise alignment
- **Geometric Elements** - Clean lines and structured layouts

## 🔧 API Endpoints

### Merchants
- `GET /api/merchants/` - List all merchants
- `POST /api/merchants/` - Create new merchant
- `GET /api/merchants/{id}/` - Retrieve merchant details
- `PUT /api/merchants/{id}/` - Update merchant
- `DELETE /api/merchants/{id}/` - Delete merchant
- `GET /api/merchants/statistics/` - Get merchant statistics

## 🌟 Key Components

### Dashboard
- Real-time merchant statistics
- Quick action panels
- System status monitoring
- Recent activity feed

### Merchant Management
- Advanced filtering by status
- Bulk operations support
- Responsive data tables
- Inline editing capabilities

### Analytics
- Performance metrics
- Growth tracking
- Interactive charts (coming soon)
- Export functionality

## 🚢 Deployment

### Docker (Recommended)
```bash
docker-compose up --build
```

### Manual Deployment
1. Configure environment variables
2. Set up PostgreSQL database
3. Deploy backend to your preferred platform
4. Deploy frontend to Vercel/Netlify
5. Configure CORS and API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Django Team** - Excellent web framework
- **Vercel Team** - Outstanding Next.js development
- **Tailwind Labs** - Beautiful utility-first CSS
- **Google Fonts** - Premium Montserrat typography

---

<div align="center">

**Built with ❤️ for sophisticated businesses**

[Live Demo](https://your-demo-url.com) • [Documentation](https://your-docs-url.com) • [Support](mailto:support@merchanthub.com)

</div>