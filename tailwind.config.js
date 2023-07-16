// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // Rest of your Tailwind configuration
  theme: {
    extend: {
      scale: {
        130: "1.3",
        120: "1.2",
        110: "1.1",
      },
    },
  },
};
