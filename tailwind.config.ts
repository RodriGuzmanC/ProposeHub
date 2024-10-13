/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'principal': {
				50: 'var(--color-principal-50)',
				100: 'var(--color-principal-100)',
				200: 'var(--color-principal-200)',
				300: 'var(--color-principal-300)',
				400: 'var(--color-principal-400)',
				500: 'var(--color-principal-500)',
				600: 'var(--color-principal-600)',
				700: 'var(--color-principal-700)',
				800: 'var(--color-principal-800)',
				900: 'var(--color-principal-900)',
				950: 'var(--color-principal-950)',
			},
			'secundario': {
				50: 'var(--color-secundario-50)',
				100: 'var(--color-secundario-100)',
				200: 'var(--color-secundario-200)',
				300: 'var(--color-secundario-300)',
				400: 'var(--color-secundario-400)',
				500: 'var(--color-secundario-500)',
				600: 'var(--color-secundario-600)',
				700: 'var(--color-secundario-700)',
			},
				'bg-primary': 'var(--bg-primary)',
				'bg-secondary': 'var(--bg-secondary)',
				'text-primary': 'var(--text-primary)',
				'text-secondary': 'var(--text-secondary)',
				'btn-bg': 'var(--btn-bg)',
				'btn-text': 'var(--btn-text)',
				'btn-hover': 'var(--btn-hover)',
				'btn-active': 'var(--btn-active)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
