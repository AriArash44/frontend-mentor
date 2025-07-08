# Contact Form Component Challenge

This folder contains the implementation for the **Contact Form Challenge** from [Frontend Mentor](https://www.frontendmentor.io). The objective was to build an accessible, responsive form component with real-time validation and user feedback.

## Technologies & Tools

- **Vue 3**  
  The foundation of the component logic and reactivity.

- **TypeScript**  
  Ensures type safety, clearer interfaces, and better DX.

- **Tailwind CSS**  
  Utility-first CSS framework for consistent styling.

- **Vanilla CSS**  
  Used to complement Tailwind where finer control was needed.

- **Toastify JS**  
  Lightweight toast notification library for success messages.

- **Lodash (`throttle`)**  
  Throttles the toast notification on form submission to prevent spam.

- **GitHub Pages (`gh-pages`)**  
  Used for deploying the live version of the project.

## Demo

Live Project:  
👉 [Contact Form Demo on GitHub Pages](https://ariarash44.github.io/frontend-mentor/14.contactForm/)

| Mobile View | Desktop View |
|-------------|--------------|
| ![Mobile Demo](./images/mobile-demo.png) | ![Desktop Demo](./images/desktop-demo.png) |
| *Optimized for smaller screens* | *Wide-screen layout with enhanced spacing and feedback* |


## Features

- 🧩 **Responsive Design** — adapts gracefully across devices
- ♿ **Accessible Markup** — uses semantic elements like `fieldset`, `legend`, `aria-*`
- 🛂 **Validation Handling** — regex and required field checks with error messaging
- 📬 **Toast Notifications** — success alerts using `toastify-js`
- 🚫 **Throttle Logic** — prevents toast spamming on form submit
- 🚀 **Deployed** with `gh-pages` on GitHub Pages
