# Restawant

----------

## Table of Contents 
1. [Overview](#overview)
2. [Technologies](#technologies)
3. [Local Installation](#installation)
4. [App Display](#display)

<a name="overview"></a>
## Overview 

RestaWant takes social media marketing for restaurants to the next level with trackable QR Code Promotions and streamlined business-to-influencer cooperation. 

Businesses can skip the grunt work in finding and contacting influencers, while influencers of all sizes can easily help promote their favorite restaurants for cash rewards. 

In today’s dynamic business environment, where marketing are becoming more and more important, small businesses need a way to efficiently communicate their brand statements. By enabling influencers to search and promote restaurants around them within a couple minutes, Restawant makes influencer marketing easily accessible for establishments from small restaurants to hip cafes. Businesses no longer need thousands of dollars to launch a social media campaign, but at the same time can have several hundreds of influencers and customers promoting for them. For influencers and regular food enthusiasts alike,  it is extremely easy to sign up as a promoter and start earning income today by doing what they already do everyday - sharing food that they like online. 

<a name="technologies"></a>
## Technologies

 - Express.js 
 - Bootstrap
 - QRickit QR Code API 
	 - QR code generation with custom url 
 - Passport.js
   - Admin, Restaurant, and Influencer authentication 
 - Moment.js 
	 - Filter expired promotions 
 - React 4 
	 - React Routing 
	 - ES6 
 - Google Maps Autocomplete
   - Restaurant search 

<a name="installation"></a>
## Local Installation

### Step 1: Git Clone

Clone Restawant to your local git repo like the following:

> git clone https://github.com/lawrencel13110123/Restawant

The Restawant project and its files should now be in your project folder.

### Step 2: Install Dependencies

Install the following dependencies listed in the `package.json` file: 

> npm install

Once completed, you will see a `node_modules` folder in your local repo.

The dependencies should now be in the local `node_modules` folder.

### Step 3: Set up MySQL database 

Via terminal type in these bash command once you are in the db directory 

> mysql -u root -p
>
> enter your MySQL password 
>
> source schema.sql 
>
> exit 

### Step 4: Create secret.js 

Create a file in the Restawant root directory via terminal 
> touch secret.js 

In the file, type in the following code 
```javascript 
	exports.secret = 'keyboard cat';
```

### Step 4: Launch app 
Via terminal type in these bash command once you are in the Restawant root directory 

> webpack 
> node server.js 

Go to your browser and type in `localhost:8080` in your URL bar. Now you should see the application open locally.

To visit deployed application, go to https://aqueous-ravine-60303.herokuapp.com/ 

<a name="display"></a>
## App Display

### Admin Signup

![Admin Signup](/public/assets/images/admin_signup.gif)


### Restaurant Signup 

![Restaurant Signup](/public/assets/images/rest_signup.gif)

### Admin Login 

![Admin Login](/public/assets/images/admin_login.gif)

### Restaurant Login 

![Restaurant Login](/public/assets/images/rest_login.gif)

### Influencer Signup 

![Influencer Signup](/public/assets/images/inf_signup.gif)

### Influencer Login

![Influencer Login](/public/assets/images/inf_login.gif) 