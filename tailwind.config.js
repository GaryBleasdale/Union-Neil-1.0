/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				lato: ["Lato", "sans-serif"],
				notoSans: ["Noto Sans", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
