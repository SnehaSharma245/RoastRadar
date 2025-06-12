# 🔥 RoastRadar - Anonymous Roasting Platform

![RoastRadar Banner](./public/logo2.png)
**Where Radar Catches the Roastest Toasts!**

RoastRadar is a modern, full-stack anonymous messaging platform built with Next.js 14, where users can send and receive savage (but fun) anonymous feedback. Share your profile and let the roasting begin!

## ✨ Features

### 🎯 Core Features

- **Anonymous Messaging**: Send completely anonymous roasts to any user
- **AI-Powered Suggestions**: Get witty roast ideas powered by Google Gemini AI
- **Real-time Dashboard**: Manage your roasts and settings in real-time
- **Email Verification**: Secure account creation with email verification

- **Responsive Design**: Beautiful UI that works on all devices

### 🛡️ Security & Privacy

- **100% Anonymous**: No way to trace messages back to senders
- **Secure Authentication**: NextAuth.js with credential-based login
- **Data Protection**: MongoDB with secure user data handling
- **Input Validation**: Comprehensive form validation with Zod schemas

### 🎨 UI/UX

- **Purple Theme**: Consistent purple gradient design throughout
- **Glass Morphism**: Modern backdrop-blur effects
- **Lucide Icons**: Beautiful, consistent iconography
- **Loading States**: Smooth loading transitions between pages
- **Mobile Optimized**: Perfect experience on all screen sizes

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion concepts

### Backend

- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js
- **Email**: Nodemailer for email verification
- **AI Integration**: Google Gemini API for roast suggestions
- **Validation**: Zod schemas

### DevOps & Tools

- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript
- **Deployment Ready**: Vercel optimized
- **Environment**: Edge Runtime support

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Google Gemini API key
- Nodemailer account for emails

### 1. Clone the Repository

```bash
git clone <https://github.com/SnehaSharma245/RoastRadar.git>
cd RoastRadar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Email Service (Resend)
SMTP_EMAIL=your_app_email
SMTP_PASSWORD=your_app_password
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running!

## 🎮 How to Use

### For Users Getting Roasted:

1. **Sign Up**: Create your account with email verification
2. **Get Your Link**: Copy your unique roasting profile URL
3. **Share**: Send your link to friends, social media, or anywhere
4. **Receive Roasts**: Check your dashboard for anonymous feedback
5. **Manage**: Toggle message acceptance on/off anytime

### For Users Sending Roasts:

1. **Visit Profile**: Go to someone's roasting profile URL
2. **Write Roast**: Type your savage (but fun) message
3. **Get Suggestions**: Use AI-powered roast suggestions if needed
4. **Send Anonymously**: Your identity remains completely private

## 🎨 Design System

### Color Palette

- **Primary Purple**: #8B5CF6 (purple-500)
- **Dark Purple**: #7C3AED (purple-600)
- **Light Purple**: #A78BFA (purple-400)
- **Background**: Gradient from purple-50 to violet-200

### Typography

- **Font Family**: System fonts (sans-serif)
- **Headings**: Bold, gradient text effects
- **Body**: Medium weight, purple-700/800

### Components

- **Cards**: Glass morphism with backdrop-blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Purple-themed with validation states
- **Icons**: Lucide React with consistent sizing

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:

- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `GEMINI_API_KEY`
- `SMTP_EMAIL`
- `SMTP_PASSWORD`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Lucide** for amazing icons
- **Google Gemini** for AI-powered suggestions
- **NextAuth.js** for secure authentication
- **Tailwind CSS** for rapid styling

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](link-to-issues) page
2. Create a new issue if your problem isn't listed
3. For direct support: [craftedbysneha.devs@example.com]

---

**Made with 🔥 and lots of ☕ by [Sneha Sharma]**

_Remember: Roast responsibly and keep it fun!_ 🎯
