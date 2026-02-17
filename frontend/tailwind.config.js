/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                'luxury-black': '#111111',
                'luxury-white': '#FFFFFF',
                'luxury-gold': '#D4AF37',
                'luxury-gray': '#F5F5F5',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
        },
    },
    plugins: [],
}
