/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#0B0E1A',
                    secondary: '#14162B',
                    card: '#1A1C2E', // Slightly lighter for cards
                },
                primary: {
                    DEFAULT: '#7C5CFF', // Primary Accent
                    hover: '#6B4BE0',
                },
                secondary: {
                    DEFAULT: '#5ED3F3', // Secondary Accent
                },
                text: {
                    primary: '#FFFFFF',
                    muted: '#9AA0B5',
                },
                status: {
                    error: '#FF6B6B',
                    success: '#22C55E'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-hero': 'linear-gradient(180deg, #14162B 0%, #0B0E1A 100%)',
                'gradient-card': 'linear-gradient(145deg, rgba(124, 92, 255, 0.05) 0%, rgba(94, 211, 243, 0.02) 100%)',
            }
        },
    },
    plugins: [],
}
