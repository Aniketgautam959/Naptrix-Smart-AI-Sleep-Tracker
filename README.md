# 😴 Naptrix - Smart AI Sleep Tracker

A modern sleep tracking web application built with Next.js 15, featuring real-time analytics, personalized insights, and comprehensive sleep data visualization.

![Next.js](https://img.shields.io/badge/Next.js-15.1.8-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 Sleep Analytics

- **Sleep Duration Tracking**: Record and monitor your daily sleep hours
- **Visual Charts**: Beautiful data visualizations using Chart.js
- **Best & Worst Sleep Analysis**: Track your sleep patterns and extremes
- **Average Sleep Calculation**: Get insights into your sleep habits

### 💼 Core Functionality

- **Sleep Record Management**: Add, edit, and delete sleep entries with ease
- **Real-time Statistics**: Comprehensive sleep analytics dashboard
- **Sleep History**: Complete sleep record history with search and filter
- **Date-based Tracking**: Track sleep patterns over time

### 🎨 Modern UI/UX

- **Fully Responsive**: Optimized for all screen sizes and devices
- **Beautiful Animations**: Smooth interactions and hover effects
- **Gradient Designs**: Modern card layouts with backdrop blur effects
- **Clean Interface**: Intuitive design focused on sleep data visualization

### 🔐 Authentication & Security

- **Multiple Login Options**: Google, GitHub, Facebook, or email/password
- **Secure Sessions**: Managed by Clerk authentication
- **User Profiles**: Personalized dashboards with user information
- **Protected Routes**: Secure access to sleep data

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React with concurrent features
- **[TypeScript](https://typescriptlang.org)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Chart.js](https://chartjs.org)** - Beautiful charts and visualizations
- **[React Chart.js 2](https://react-chartjs-2.js.org/)** - React wrapper for Chart.js

### Backend & Database

- **[Neon](https://get.neon.com/0pFcBSF)** - Serverless PostgreSQL database
- **[Prisma](https://prisma.io)** - Type-safe database ORM
- **Server Actions** - Direct server functions in Next.js

### Authentication

- **[Clerk](https://go.clerk.com/WSe7K8F)** - Complete authentication solution

### Deployment

- **[Vercel](https://vercel.com)** - Serverless deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Neon PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sahandghavidel/sleep-tracker-next.git
   cd sleep-tracker-next
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="your-neon-database-url"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses a clean and efficient database schema:

- **User**: Stores user information from Clerk authentication
- **Record**: Stores sleep records with duration, date, and user associations

### Key Models

```prisma
model User {
  id          String   @id @default(uuid())
  clerkUserId String   @unique
  email       String   @unique
  name        String?
  imageUrl    String?
  Records     Record[]
}

model Record {
  id        String   @id @default(uuid())
  text      String
  amount    Float    // Sleep duration in hours
  date      DateTime
  userId    String
  user      User     @relation(fields: [userId], references: [clerkUserId])
}
```

## 🎯 Key Features Walkthrough

### 1. Sleep Record Management

- Add new sleep entries with date and duration
- View comprehensive sleep history
- Edit or delete existing sleep records
- Real-time data synchronization

### 2. Sleep Analytics Dashboard

- Visual charts showing sleep patterns over time
- Average sleep duration calculations
- Best and worst sleep performance tracking
- Responsive data visualization

### 3. User Experience

- Secure authentication with multiple providers
- Personalized dashboard for each user
- Clean, intuitive interface design
- Mobile-responsive layout

### 4. Data Visualization

- Interactive Chart.js charts
- Color-coded sleep duration data
- Time-based sleep pattern analysis
- Export and share capabilities

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on every push to main branch**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sahandghavidel/sleep-tracker-next)

## 📎 Useful Links

- **[Neon Database](https://get.neon.com/0pFcBSF)** - Serverless PostgreSQL
- **[Clerk Authentication](https://go.clerk.com/WSe7K8F)** - User management
- **[GitHub Repository](https://github.com/sahandghavidel/sleep-tracker-next)** - Source code
- **[Next.js Documentation](https://nextjs.org)** - Framework docs
- **[Tailwind CSS](https://tailwindcss.com)** - Styling framework
- **[Chart.js](https://chartjs.org)** - Chart library
- **[Prisma Documentation](https://prisma.io)** - Database ORM
- **[Vercel Platform](https://vercel.com)** - Deployment platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💖 Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Built by Aniket Gautam

_A modern approach to sleep tracking with beautiful data visualization and user-friendly design._

