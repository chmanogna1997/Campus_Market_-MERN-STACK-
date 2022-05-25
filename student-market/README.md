# Summary

This website is to help international students to plan their stay around their university. Get houses, buy and sell reused household items, books etc..

# Components
 1. Header
 2. Homepage
 3. Signin_login
 4. Tips To Sell
 5. DisplayProducts
 6. Spinner
 7. Footer

 # Navigation

 1. Clicking on campusMarket logo redirects to home page.
 2. Login button to login/signin components
 3. Clicking on Sell button redirects to Tips to sell component. 

# complex concepts
1. Skip link( in HomePage component)
2. Carousel( in HomePage component)
3. Accordions (in TipsToSell component)
4. Tool Tip( in header Component : will be shown only when the user logged in)
 
# Used react-router-dom for routing.

# Services

has following services..
1. adds user details on signup
2. validates use's credentials on login
3. gets data of products choose that being displayed on DisplayProduct component.

# Forms

 1. SignIn Form ( You can sucessfully signIn and then loginIn with the credentials)[all fields are required, used regex pattern to validate the email, proper error messages are shown accordingly ]
 2. Login Form. ( invalid credentials prevent user from login in )[all fields are set required and error messages shown when password and username have a mismatch]
 3. Sell your products Form. [[all fields are set required and proper error messages are shown]]

# Display Products Page
 
 This page displays the list of products on selected category( like tab)

# only on login the user data will be shown on header section.

![userdetails](https://user-images.githubusercontent.com/91714626/166177069-26775515-3713-4ad6-977a-c2a36580d3bd.png)

# Accessibility

used following ARIA properties in following components
1. aria-hidden, aria-expanded, aria-labelled-by, aria-controls - for Accordions in TipsToSell component.
2. aria-checked, arai-labelled-by - for checkbox in SignIn_login component.
3. aria-roledescription,aria-label - for carousel in Homepage component.


# Spinner Coomponent

1. Used CSS animation 
2. Can be seen on choosing different categories( like books, houses for rent tab ) in the header section of the page.

# References:

1. main image on homepage : https://unsplash.com/photos/ZWD3Dx6aUJg
2. carousel images : https://thecollegeinvestor.com/19838/buy-college-textbooks-online/
                   : https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.apartmentguide.com%2Fapartments%2FFlorida%2FPensacola%2F2-beds-1z141y8%2F&    psig=AOvVaw1aeFYlt9HEv5719CA1X77M&ust=1651548166642000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMiPzcnuv_cCFQAAAAAdAAAAABAE
                   :https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy0OeUpXcUBrhdw8MClVfBB57s6mvNfQlLsg&usqp=CAU
3. Unicode : forward arrow : https://www.codetable.net/decimal/10095
           : backward arrow : https://www.codetable.net/decimal/10094
4. Used Font Awesome icons : In Footer component: icons: facebook, instagram, twitter
5. 

# Default login :
 you will be able to login with these default credentials too or you can signin and login to the website.

 Email: 'E1@gmail.com'
 Password: 'p1'


        
                     


***************************************************************************************************************************************************

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
