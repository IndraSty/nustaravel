import type { Config } from 'tailwindcss'
import colors from "tailwindcss/colors"

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.blue[500],
          hover: colors.blue[400],
        },
        miniText: colors.gray[500],
        secondary: {
          text: colors.neutral[500]
        }
      },
      boxShadow: {
        'top': '0 -2px 4px -1px rgba(0, 0, 0, 0.1), 0 -1px 2px -1px rgba(0, 0, 0, 0.05)',
        'bottom': '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      backgroundImage: {
        'my-image': "url('https://images.unsplash.com/photo-1602002418679-43121356bf41?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      },
    },
  },
  plugins: [],
}
export default config
