# Anonymous Message

Welcome to the Anonymous Message platform repository! This project enables users to send and receive anonymous messages in a secure and interactive environment. Designed for fun and engaging communication, it comes with a sleek UI and robust features.

## ✨ Features

### 📨 User Part
- **Send Messages Anonymously**: Easily send messages without revealing your identity.
- **Receive Anonymous Messages**: Collect and read messages sent to you.
- **Toggle Message Acceptance**: Control whether you want to accept messages or not.
- **Personal URL Sharing**: Logged-in users can generate a personal URL to share, allowing others to send them anonymous messages.
- **OTP Verification**: Secure login and registration using email-based OTP (Resend API for email verification).
- **Edit Profile**: Update your personal information conveniently.

### 🔒 Security and Validation
- **Authentication**: Integrated with NextAuth for secure user authentication.
- **Validation**: Ensures data integrity using Zod.

### 💌 Messaging
- **API Integration**: Powered by the Gemini API for handling messages seamlessly.

## 🌐 Live Links
- **User Frontend**: [Anonymous Message User App](https://anonymous-message-sepia.vercel.app/)

## 🖥️ Tech Stack
- **Frontend**: Next.js, shadcn for UI.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Validation**: Zod.
- **Authentication**: NextAuth.
- **Messaging API**: Gemini API.
- **Email Verification**: Resend API for OTP handling.

## ⚙️ Installation

### 📂 Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/SnehaSharma245/anonymous-message.git
```

### 🔧 Backend
1. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file with the required environment variables (e.g., API keys, database connection strings).
3. Start the backend server:
   ```bash
   npm start
   ```

### 🌟 Frontend
1. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev
   
