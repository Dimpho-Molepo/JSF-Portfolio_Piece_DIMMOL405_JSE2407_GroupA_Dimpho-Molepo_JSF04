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

The first thing that i tackled in the Portfolio Piece was the login authentication. I fetched the authentication login with the username and password that is submitted in the login page, if the information is correct it will reroute the user to page they were original trying to access. The rerouting is handled in the `index.js` which contains all the routes and also this code:
```
router.beforeEach((to, from, next) => {
  const login = useAuthenticationStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && !login.isAuthenticated) {
    login.setReturnTo(to.fullPath)
    next({ path: '/login', query: { returnTo: to.fullPath } })
  } else {
    next()
  }
})
```
This code is responsible for the rerouting the user the previously intended page by access the `returnTo` varibale that saves the protect URL/page the user was trying to access. This was accoplished with the help `claude.ai`.

I then worked on the shopping cart, which needed a cartStore to handle the state of adding, removing products from the cart and also saves the cart to local storage. One thing that was difficult to implement was use  of the `jwt-decode` which was utilized in the `loginAuthenticate` store. I also used `cluade.ai` to get help help implementing the `jwtDecode`.


I then moved on to work on creating the comparison list which was the simplest to do out of all the user stories. The only thing that was a bit of a challenge was presenting the products in table format for side by side comparison but I managed to successfully accomplish this with the help of this article [Building a Dynamic Vue.js Table Component: A Step-by-Step Guide](https://medium.com/@dlodeprojuicer/building-a-dynamic-vue-js-table-component-a-step-by-step-guide-60883bf82b45).


Then I preceeded to work on the stretch goals. I started with the wishlist component. I created the wishlist sort that handles most of the fucntionality of adding, removing and so on, plus saving the filter and sort varibales that may be different from the ones used in the `ProductList`. On thing that was difficult was setting sort and filter specifically in the `wishlist` page. I had to use props and emits event changes to make sure that the correct information is recieved by the correct store. The `FilterSort` component emits events to the parent component when the user selects a new category, sort option, or clicks the reset button. The parent component passes the categories, selectedCategory, and selectedSort data to the FilterSort component as props. The styling of the carousel was hell on earth for because I am not particularly good with styling, so I had to consult with my collegue `Mr Mushi` for some assistance and although it is not as I wanted its better then where it was.

The theme was next on my task list. This was fairly medium in difficulty because the only thing that wanted a lot of brain power was the creating the dark class. The following article helped alot [How to Add Dark Mode to a Vue Project](https://medium.com/@dgongoragamboa/how-to-add-dark-mode-to-a-vue-project-74de5a6988a6) to provide the direction of what I need to do but `claude.ai` gave the step by step on how to setup the dark class in the `tailwind.config.js` and also gave this code `isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches` which matches the user's system preference.


I lastly worked on the dummy check out which I couldn't complete due to time constraints but I tried my best although some of the user stories were not achieved.

### Project Challenges

The project was challenging because I had to learn about `Vue.js` and how to use it. Another challenge was the user being able to see the applied filters and sorting afternavigating to a detailed view and returning to the home page without using local storage. I overcame this challenge by using the `pinia` store which made it easy to manage the different states in the app.

This project was a beast that I tried with my all to tame the beast that vue is. The was a lot of challenges in this project to be fully honest and the major one i struggled with the most was definetly styling the components but my collegues helped alot in this aspect, they guidence and overview was greatly needed. 


### [YouTube](https://youtu.be/UjNYJcteEfE)
## Author
Dimpho Molepo