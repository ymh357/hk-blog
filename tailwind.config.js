module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/demos/**/*.{js,jsx,ts,tsx}',
    './src/utils/**/*.{js,jsx,ts,tsx}',
    './src/hooks/**/*.{js,jsx,ts,tsx}',
    './src/hocs/**/*.{js,jsx,ts,tsx}',
    './blog/**/*.mdx',
  ],
  theme: {
    extend: {
      borderRadius: {
        half: '50%',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      fontSize: {
        t1: ['24px', '34px'],
        t2: ['20px', '28px'],
        t3s: ['18px', '24px'],
        t3l: ['18px', '30px'],
        t4s: ['16px', '22px'],
        t4l: ['16px', '26px'],
        t5: ['14px', '20px'],
        t6: ['13px', '18px'],
        t7: ['12px', '18px'],
        t8: ['10px', '14px'],
        t9: ['17px', '24px'],
        t10: ['19px', '26px'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
}
