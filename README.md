# Golden Hearts - Volunteer Together

A LinkedIn-style platform designed specifically for older adults to find meaningful volunteering opportunities and build community connections.

## 🌟 Overview

Golden Hearts is a modern web application that connects older adults with volunteering opportunities in their communities. The platform features a user-friendly interface, comprehensive search and filtering, and social networking elements to help volunteers find the perfect opportunities while building lasting relationships.

## ✨ Features

### For Volunteers
- **Smart Opportunity Matching**: Find volunteering opportunities based on location, interests, and availability
- **Comprehensive Profiles**: Build detailed profiles showcasing skills, experience, and preferences
- **Volunteering History**: Track your impact with detailed records of hours served and achievements
- **Community Building**: Connect with other volunteers and organizations
- **Achievement System**: Earn badges and recognition for your contributions

### For Organizations
- **Opportunity Management**: Post and manage volunteering opportunities
- **Volunteer Matching**: Find volunteers with the right skills and availability
- **Communication Tools**: Built-in messaging and coordination features
- **Impact Tracking**: Monitor volunteer hours and community impact

### Platform Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Advanced Search**: Filter opportunities by category, location, time commitment, and more
- **Real-time Updates**: Stay informed about new opportunities and community events
- **Accessibility**: Designed with older adults in mind, featuring clear typography and intuitive navigation

## 🚀 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Database**: Prisma with SQLite (easily upgradable to PostgreSQL/MySQL)
- **Authentication**: NextAuth.js
- **Deployment**: Vercel-ready

## 📱 Pages & Components

### Core Pages
- **Homepage** (`/`): Hero section, featured opportunities, platform benefits
- **Opportunities** (`/opportunities`): Browse and search volunteering opportunities
- **Registration** (`/register`): User signup with detailed preferences
- **Login** (`/login`): User authentication
- **Profile** (`/profile`): User profile management and volunteering history

### Components
- **Navigation**: Responsive navigation with search and user actions
- **Opportunity Cards**: Detailed opportunity information with apply functionality
- **Profile Forms**: Editable profile sections with validation
- **Search & Filters**: Advanced filtering for opportunities

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd golden-hearts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Email provider for notifications
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
```

## 🗄️ Database Setup

The project uses Prisma for database management. To set up the database:

1. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

2. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

3. **Seed the database** (optional)
   ```bash
   npx prisma db seed
   ```

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Use the predefined CSS classes: `.btn-primary`, `.btn-secondary`, `.card`

### Components
- All components are located in `src/components/`
- Use TypeScript interfaces for type safety
- Follow the existing component patterns for consistency

### Data Models
- Update Prisma schema in `prisma/schema.prisma`
- Add new API routes in `src/app/api/`
- Implement server actions in `src/lib/actions.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **Railway**: Deploy with automatic environment variable detection
- **Docker**: Use the provided Dockerfile for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Basic platform structure
- ✅ User registration and authentication
- ✅ Opportunity browsing and search
- ✅ User profiles and preferences

### Phase 2 (Next)
- 🔄 Organization management
- 🔄 Advanced search and filtering
- 🔄 Messaging system
- 🔄 Calendar integration

### Phase 3 (Future)
- 📅 Mobile app development
- 📅 AI-powered opportunity matching
- 📅 Community forums and groups
- 📅 Impact analytics and reporting

## 🎯 Target Audience

Golden Hearts is specifically designed for:
- **Older adults** (55+) looking to stay active and engaged
- **Retirees** seeking meaningful ways to contribute
- **Community organizations** needing reliable volunteers
- **Local communities** wanting to strengthen social bonds

## 💡 Design Principles

- **Accessibility First**: Clear typography, high contrast, keyboard navigation
- **User Experience**: Intuitive interfaces that don't require technical expertise
- **Community Focus**: Emphasis on building relationships and connections
- **Trust & Safety**: Verified organizations and secure user data
- **Flexibility**: Accommodate various schedules and physical abilities

## 📞 Support

For questions, support, or collaboration:
- Create an issue in the GitHub repository
- Contact the development team
- Join our community discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for communities and the volunteers who make them stronger.**
