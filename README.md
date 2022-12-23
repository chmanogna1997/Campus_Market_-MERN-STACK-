# Campus_Market

This website is to help international students to plan their stay around their university. check for available houses around the campus, buy and sell reused household items, books, electronics etc..

# How we developed 

Here we developed this application using React.JS for frontend, Node.js for backend services, Mongodb atlas and firebase storage for saving and retreving the data.

## Versions:
 1. "react": 18.0.0
 2. "npm" : 8.1.2
 3. "node" : 16.13.2

 # Components

 1. Header 
 2. SignIn_login  - User can either Signin or Login here
 3. Tips To Sell - User can sell their items here 
 4. Homepage - This about me page of the website
 5. Display Products - This is opening page of the website that displays the list of products on selected category( like tab) ![3](https://user-images.githubusercontent.com/91714626/189433927-a123e1e0-c1ee-473d-add6-26ac4b73871e.PNG)
 6. Show Product Details - This page shows details of the product
 7. User Profile - user can see his profile, products he bookmarked, produts he posted to sell
 8. Spinner
 9. Footer

# Mongodb Atlas

Used Mongodb database named Campus Market having following collections:

1. User_details
2. books
3. events
4. foodmarket
5. for rent : houses & apartments
6. household items
7. mobile & electronics.

# Firebase Storage

 Used to store and retieve images

# Regarding the website.

1. HomePage:![Homepage](https://user-images.githubusercontent.com/91714626/209271549-46a772b3-e408-46b0-acdb-1baa70ce59d6.png)

2. SigninPage:![sign inimage](https://user-images.githubusercontent.com/91714626/209271956-71d6d168-65a0-42a6-b419-d8f4e38a413d.png) on siginin the data gets added to user_details collections as shown here: ![data_in_userdetails_image](https://user-images.githubusercontent.com/91714626/209272211-a2121576-423e-47de-a6ea-a3a74a5f90d5.png)

3. Login Page :
 Error message for invalid credentials: ![inavlid_login_user_image](https://user-images.githubusercontent.com/91714626/209272523-1a228af3-df6f-46b6-9c61-7a3242854f68.png)

4. Reset Password : ![reset_pwd](https://user-images.githubusercontent.com/91714626/209272726-6ed73efc-d8e0-423c-b9a6-a394f8621ac9.png)
 
Password gets updated accordingly in user_detail collection: ![reset_pwd](https://user-images.githubusercontent.com/91714626/209272726-6ed73efc-d8e0-423c-b9a6-a394f8621ac9.png)

5. On suceesful login user can check their profile on clicking account button: ![account](https://user-images.githubusercontent.com/91714626/209273196-2b51c4ae-5ea1-4b69-895a-2b77ed65745b.png)

6. User can sell/post their product : on clicking sell button on header:
![sell_prd](https://user-images.githubusercontent.com/91714626/209273944-841fb5de-0658-489a-afb9-8d7f44e3cfb4.png)

On success message : data gets added to corresponding collection(category) and image to firebase storage.
![image](https://user-images.githubusercontent.com/91714626/209274397-0dbc45b6-5ce5-48d4-9fff-2987a46886ea.png)

Same produt posted can be seen on products page: ![image](https://user-images.githubusercontent.com/91714626/209274915-6bc38bf5-9bf9-4cbd-b809-5685de9d6b4a.png): Post has product name, product price, University, Email adrees of the user posted the item.

7. User profile page: ![image](https://user-images.githubusercontent.com/91714626/209275486-d6573b2b-2967-4e2f-9daa-54c033e5c985.png)

8. The website helps users to find products around their university using the global search bar. ![2](https://user-images.githubusercontent.com/91714626/189432579-bc7b921d-8e3a-46f9-8b4e-92a15addcc39.PNG)
9. User can like/bookmark the products he wished to. ![4](https://user-images.githubusercontent.com/91714626/189434297-0395b7c6-01a6-4983-9b51-ad51ac281d59.PNG)

# Business Rules

1. User needs to login to bookmark/ like any product
2. User should be a registered member to sell his product on the site.
3. User while selling his product must upload images of product but not more than 5. ![TTS](https://user-images.githubusercontent.com/91714626/189425111-a55c76bd-9e19-441b-a441-139c88950366.PNG)

# Accessibility

1. aria-hidden, aria-expanded, aria-labelled-by, aria-controls - for Accordions in TipsToSell component.
2. aria-checked, arai-labelled-by - for checkbox in SignIn_login component.
3. aria-roledescription,aria-label - for carousel in Homepage component.

# Default login :

you will be able to login with these default credentials too or you can signin and login to the website.

Email: 'j1@gmail.com' Password: 'j1'


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










