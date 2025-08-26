# Golden Hearts - Volunteering Platform

A LinkedIn-style platform for volunteering, designed to connect people of all ages with meaningful opportunities to serve their communities. While our platform is particularly well-designed for older adults and retirees, we welcome volunteers of all ages who want to contribute their time, skills, and passion to causes they care about.

## 🌟 Features

### For Volunteers
- **Comprehensive Profiles**: Detailed user profiles with volunteering preferences, skills, and history
- **Opportunity Discovery**: Browse and search for volunteering opportunities by category, location, and skills
- **Achievement System**: Earn badges and recognition for your contributions
- **Volunteering History**: Track your impact with detailed records of hours served
- **Community Connection**: Connect with other volunteers and organizations

### For Organizations
- **Opportunity Management**: Post and manage volunteering opportunities
- **Volunteer Matching**: Find volunteers based on skills, interests, and availability
- **Impact Tracking**: Monitor volunteer engagement and community impact
- **Communication Tools**: Direct messaging with volunteers

### Platform Features
- **Responsive Design**: Optimized for all devices and accessibility needs
- **Advanced Search**: Filter opportunities by multiple criteria
- **Real-time Updates**: Live notifications and status updates
- **Analytics Dashboard**: Comprehensive insights into platform usage

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Database**: Prisma ORM with SQLite (easily scalable to PostgreSQL/MySQL)
- **Authentication**: NextAuth.js (ready for implementation)
- **Backend**: Next.js API Routes with Prisma
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
golden-hearts/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── users/         # User management endpoints
│   │   │   └── ...
│   │   ├── profile/           # User profile pages
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── opportunities/     # Volunteering opportunities
│   │   ├── register/          # User registration
│   │   ├── login/             # User authentication
│   │   └── about/             # About page
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utility functions and database
│   └── styles/                # Global styles
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── package.json               # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

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
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Prisma Commands

- **Generate Client**: `npm run db:generate`
- **Push Schema**: `npm run db:push`
- **Seed Database**: `npm run db:seed`
- **Open Studio**: `npm run db:studio`
- **Reset Database**: `npm run db:reset`

### Database Schema

The platform uses a comprehensive schema with the following main entities:

- **Users**: Volunteer profiles with preferences and history
- **Organizations**: Non-profit and community organizations
- **Opportunities**: Volunteering positions and activities
- **Applications**: Volunteer applications and status tracking
- **VolunteerHistory**: Records of completed volunteer work
- **Achievements**: Badges and recognition system
- **Reviews**: Feedback and ratings system
- **Messages**: Communication between users

## 🔧 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for global styles
- Use the existing design system components

### Content
- Update text content in component files
- Modify sample data in `prisma/seed.ts`
- Customize categories and preferences

### Features
- Add new API routes in `src/app/api/`
- Create new pages in `src/app/`
- Extend the database schema in `prisma/schema.prisma`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
- **Netlify**: Similar to Vercel deployment
- **Railway**: Great for full-stack apps with database
- **DigitalOcean**: Self-hosted solution with App Platform

### Production Database
For production, consider migrating from SQLite to:
- **PostgreSQL**: Recommended for production
- **MySQL**: Alternative relational database
- **Supabase**: Managed PostgreSQL with real-time features

## 📈 Scalability Features

### Backend Architecture
- **API Routes**: RESTful endpoints with proper error handling
- **Database Optimization**: Efficient queries with Prisma
- **Caching**: Ready for Redis integration
- **Rate Limiting**: Built-in Next.js API protection

### Frontend Performance
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Built-in Next.js Image component
- **Lazy Loading**: Component-level optimization
- **Responsive Design**: Mobile-first approach

### Database Scaling
- **Connection Pooling**: Prisma handles database connections
- **Query Optimization**: Efficient schema design
- **Indexing**: Ready for performance tuning
- **Migrations**: Safe schema evolution

## 🧪 Testing

### Manual Testing
- Test all user flows (registration, profile editing, etc.)
- Verify responsive design on different devices
- Check accessibility features

### Automated Testing (Future)
- Unit tests with Jest
- Integration tests with Playwright
- API testing with Supertest

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or support:
- Check the documentation
- Review existing issues
- Create a new issue with detailed information

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ User registration and profiles
- ✅ Basic opportunity browsing
- ✅ Database schema and API
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 User authentication with NextAuth.js
- 🔄 Advanced search and filtering
- 🔄 Application system
- 🔄 Messaging between users

### Phase 3 (Future)
- 📋 Organization dashboard
- 📋 Advanced analytics
- 📋 Mobile app
- 📋 Integration with external platforms

---

**Built with ❤️ for building stronger communities**
