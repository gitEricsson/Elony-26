# Precious & Tony's Wedding Website

A beautiful, responsive wedding website built with modern web technologies to celebrate the union of Precious and Tony on January 10, 2026.

## 🎉 Features

- **Responsive Design**: Looks great on all devices
- **Interactive Gallery**: Photo carousel with fullscreen mode
- **Guestbook**: Leave messages and well-wishes for the couple
- **Blessings Wall**: View messages from other guests
- **Wedding Details**: All the important information about the big day
- **Elegant Animations**: Smooth transitions and hover effects

## 🛠️ Tech Stack

- ⚛️ **React 18** - Frontend library
- 🎨 **Tailwind CSS** - Styling with custom theme
- 🚀 **Vite** - Fast development server and build tool
- 🎭 **Framer Motion** - Smooth animations and transitions
- 📱 **React Router** - Client-side routing
- 🔄 **React Query** - Server state management
- 🗃️ **Upstash Redis** - Database for guest messages
- 🔍 **TypeScript** - Type-safe JavaScript

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/elony-wedding.git
   cd elony-wedding
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   VITE_UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   ```

### Running the App

- **Development**:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

- **Build for Production**:

  ```bash
  npm run build
  # or
  yarn build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  # or
  yarn preview
  ```

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Page components
├── lib/              # Utility functions and configurations
├── hooks/            # Custom React hooks
└── App.tsx           # Main application component
```

## 🌈 Customization

1. **Colors**: Update the color palette in `src/index.css`
2. **Content**: Modify the content in the respective component files
3. **Images**: Replace images in the `public/` directory
4. **Theme**: Adjust the theme in `tailwind.config.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

💍 Made with love for Precious & Tony's special day!
