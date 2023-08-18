export default {
    content: [
        "./src/index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontSize: {
            '12': '12px',
            '14': ['14px', '1.6em'],
            'base': ['16px', '1.3em'],
            '18': ['18px', '1.6em'],
            '20': ['20px', '1.3em'],
            '32': ['36px', '1.01em'],
            '36': ['36px', '1.2em'],
            '56': ['56px', '1.01em']
        },
        spacing: {
            '8': '8px',
            '12': '12px',
            '16': '16px',
            '20': '20px',
            '24': '24px',
            '32': '32px',
            '40': '40px',
            '80': '80px',
            '120': '120px',
            '200': '200px',
            '250': '250px'
        },
        extend: {
            colors: {
                'dark': '#202020',
                'white': '#ffffff'
            }
        }
    },
    plugins: [],
}