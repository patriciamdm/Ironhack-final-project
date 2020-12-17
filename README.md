# Ironhack Final Project | Dealz_

<img src="./Dealz_.jpg" alt="Dealz_ Home">

## Introduction

Dealz_ is a Single Page Application to buy and sell products, inspired in the Spanish company Wallapop.

#### Authors:

Manuel de la Barreda & Patricia Muñoz de Dios

#### Thanks to:

- Teacher: Germán Alvarez
- TA: Jon Arechalde

### Description:

Users will be able to buy from and sell to other registered users, add products to their favourites list and give other users a rating including a comment. To contact a seller we have two stablished options - an email form and a WhatsApp window - and one under contruction which renders an internal chat bewteen users.
Each product created will have a category and location assigned by the user from an assortment previously stablished, along with a file update field to give the product and image that will be hosted using Cloudinary.
There's an admin console where products, users, categories and locations can be managed, along with an analytics panel with different graphics for the  available data.


## Technologies:

### Languages and dependencies

- HTML5 & CSS
- JavaScript (ES6)
  - react
  - axios
  - bootstrap
  - node
  - express
  - mongo
  - mongoose
  - passport
  - cloudinary
  - connect-flash
  - cors
  - multer
  - nodemailer
  - socket.io
  - flash
  - bcrypt
  - nivo.rocks

### API

We have developed our own API with the following endpoints.

| Paths        | Methods           | JSON response  |
  | ------------- | ------------- | ------------- |
  | `/api/products` | GET POST PUT DELETE | Products Management|
  | `/api/location` | GET POST PUT DELETE | Locations Management|
  | `/api/category` | GET POST PUT DELETE | Categories Management|
  | `/api/rating` | GET POST PUT DELETE | User Reviews Management|
  | `/api/users` | GET POST PUT DELETE | Users Management|
  | `/api/auth` | GET POST | Authorized Sessions Management|
  | `/api/files` | POST | Files Management|
  | `/api/mailing` | POST | Mail Management|
  



<h1>Proyecto Final del Bootcamp de Ironhack</h1>
<img src="./Dealz_.jpg" alt="Dealz_ Home">
<br>
<br>
<h1>Dealz_</h1>
<hr>
<h2>Authors:</h2> Patricia Muñoz de Dios & Manuel de la Barreda.
<hr>
<h2>Specials thanks to:</h2>
<ul>
  <li> Teacher: Germán Álvarez</li>
  <li> Teacher assistant: Jon Arechalde</li>
 </ul>
<hr>
<h2>Languages and Dependencies used:</h2>
<ul>
  <li> HTML5</li>
  <li> CSS3</li>
  <li> Our own API</li>
  <li> Javascript (ES6):</li>
  <ul>
  <li>react</li>
  <li>axios</li>
  <li>bootstrap</li>
  <li>node</li>
  <li>express</li>
  <li>mongo</li>
  <li>mongoose</li>
  <li>passport</li>
  <li>cloudinary</li>
  <li>connect-flash</li>
  <li>cors</li>
  <li>multer</li>
  <li>nodemailer</li>
  <li>socket.io</li>
  <li>flash</li>
  <li>bcrypt</li>
  </ul>
</ul>
<hr>
<h2>Description:</h2> Its a Single Page Application where you can buy and sell products, inspired in Wallapop.
<hr>
<h2>Index API Endpoints:</h2>

  | Paths        | Methods           | JSON response  |
  | ------------- | ------------- | ------------- |
  | `/api/products` | GET POST PUT DELETE | Products Management|
  | `/api/location` | GET POST PUT DELETE | Locations Management|
  | `/api/category` | GET POST PUT DELETE | Categories Management|
  | `/api/rating` | GET POST PUT DELETE | User Reviews Management|
  | `/api/users` | GET POST PUT DELETE | Users Management|
  | `/api/auth` | GET POST | Authorized Sessions Management|
  | `/api/files` | POST | Files Management|
  | `/api/mailing` | POST | Mail Management|
