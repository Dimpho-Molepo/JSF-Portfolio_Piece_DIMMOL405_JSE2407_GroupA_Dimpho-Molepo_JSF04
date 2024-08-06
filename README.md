# JSF01 - Refactor the e-commerce store in Svelte.js

## Project Overview

This project is a refactor of the e-commerce store from the React project. The goal is to use Vue
to create a similar e-commerce store. The project is a single-page application that allows users to
add items to their cart and checkout. The project uses Vue to create a dynamic shopping cart and
checkout page. The project also uses Tailwind CSS for styling. The project is a good example of
how Vue can be used to create a dynamic and interactive user interface.
![Screenshot 2024-07-30 212320](https://github.com/user-attachments/assets/d3b6bc68-1abf-49a6-b89d-e493308b9c18)

## Features

- **Product Filtering**: Easily filter products by category or search term.
- **Sorting Options**: Sort products by price (low to high or high to low) or default ordering.
- **Detailed Product View**: Click on any product to view more details in a product detail page.
- **Category Navigation**: Browse products by category using the dropdown menu.

## Technologies Used

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (Vue.js)

## Getting Started

To get started with the project, follow these steps:

1. `git clone https://github.com/Dimpho-Molepo/Module_4_DIMMOL405_JSE2407_GroupA_Dimpho-Molepo_JSF03.git`
2. `npm install`
3. `npm i Vue-routing`
4. `npm install tailwindcss --save-dev`
5. `npm install Vue store`
6. Inside the `app.css` file add the following code

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

8. Inside the `tailwind.config.js` file add the following code

```
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Discussion and Reflection

### Project Analysis

The project was a success. I was able to complete the project in the time allocated. I was able to learn further about the Tailwind CSS framework and use Tailwind CSS to style my project. Importantly, I learned about `Vue.js`, which was not too bad considering how close the syntax is to `React.js` syntax, `Vue.js` is basically the combination of HTML and `JavaScript` all in one file. I converted the given `React.js` code into `Vue.js`. 

### Project Challenges

The project was challenging because I had to learn about `Vue.js` and how to use it. Another challenge was the user being able to see the applied filters and sorting afternavigating to a detailed view and returning to the home page without using local storage. I overcame this challenge by using the `pinia` store which made it easy to manage the different states in the app.

## Author
Dimpho Molepo