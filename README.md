Book Club


Description:

The Book Club is a one-page website tha allows users to search for books available for trading or borrowing and writing reviews on the books.

----------

Requirements:

Axios
Babel-loader
Css-loader
Dotenv
Express
Express-validator
Mongoose
Nodemon (package.json -> under scripts: "dev" : "nodemon app.js")
React
ReactDOM
Style-loader 
Validator
Webpack (package.json -> under scripts: "watch" : "webpack --watch")
Webpack-cli 
@babel/preset-react 
@babel/preset-env 
@babel/core

installation express terminal: npm install express nodemon mongoose dotenv validator express-validator axios react react-dom
installation react terminal: npm install webpack webpack-cli css-loader style-loader babel-loader @babel/preset-react @babel/preset-env @babel/core 

----------

Depoyment:

Heroku (package.json -> under scripts: "start" : "node app.js")

----------

Author/Developer:

Rebeca Pastl

----------

Instructor: 

Jordan Miller

----------

License: 

ISC

----------

Acknowledgments:

This project was developed during CPSC 2600 classes, Final Project, Fall 2020.

----------

Citations and references:

•	Handling multiple input changes (BookAdd.js lines 70 to 82) 

Source: Stack Overflow
Author: Reply by Christopher Davies (thrid reply) on 14.mar.2016
Web address: https://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler

•	Banner image (used on file Style.css line 94, stored on folder public > images > banner.jpg) 

Source: Pexels (Free stock photos)
Author: Pixabay
Web address: https://www.pexels.com/photo/books-in-black-wooden-book-shelf-159711

•	User images (users submitted by the application and stored at the bookclub database on MongoDB)

Source: Pexels (Free stock photos)
Author: Laura Garcia
Web address: https://www.pexels.com/photo/photo-of-old-man-wearing-sun-hat-3271268/

Source: Pexels (Free stock photos)
Author: Edu Carvalho
Web address: https://www.pexels.com/photo/selective-focus-photography-of-woman-standing-near-green-plant-2050976/

Source: Pexels (Free stock photos)
Author: Maria Orlova
Web address: https://www.pexels.com/photo/crop-serene-woman-standing-with-eyes-closed-against-light-wall-4906286/

Source: Pexels (Free stock photos)
Author: Bruno Thethe
Web address: https://www.pexels.com/photo/man-leaning-on-red-cushion-2122850/

•	Book images (books submitted by the application and stored at the bookclub database on MongoDB)

The Silmarillion and the Hobbit covers: personal collection

----------

User Manual:

The Book Club is a one-page website. All the functionalities of the website are on the home page. There are two main categories on the Book Club website: Books and Users.

In this user manual, we will talk about how both can be used.

USER

In this category, you can see all users registered in the Book Clube and add new users.

See all users:

To see all users, click on the Show all users button on the top of the users’ section. All users will appear below the user section in chronological order (the newest user above).

Add a new user:

•	Name field: 
Insert the username (with a minimum length of 5 characters) into the field Name
•	Avatar field:
Copy the URL/URI of the image and paste it into the field Avatar (refer to the end of the manual to see how to copy the URL/URI using Chrome, Firefox and Edge)

Press Submit user for the user to be saved into the Book Club database.

If there are errors, they will be displayed below the Submit user button. 

BOOK

In this category, you can see all books available in the Book Clube, the book’s reviews, add new books and reviews.

See all books:

To see all books, click on the Show all books button on the top of the books’ section. All books will appear by the right of the book section in chronological order (the newest book above).

Add a new book:

•	Title field: 
Insert the book’s name to the field Title
•	Author field:
Insert the author’s name to the field Author
•	Cover field:
Copy the URL/URI of the image and paste it into the field Cover (refer to the end of the manual to see how to copy the URL/URI using Chrome, Firefox and Edge)
•	Owner field:
Choose from the dropdown the name of the user who owns the book
•	Availability field:
Choose from the dropdown if you are registering the book for trading with other users, for borrowing to other users, or if it is available for both

Press Submit book for the book to be saved into the Book Club database.

The new book will be exhibited as the Most recent book (below the book section), as well as in the list of all books.

If there are errors, they will be displayed below the Submit book button. 

See book details:

To see more details about a book, click on it and a new section will open by the right of the book section. This new section will show the owner of the book, what is it available for, and its reviews.  All reviews will appear in chronological order (the newest review above).

Add a review:

•	Text field:
Insert a review text between 5 and 300 characters
•	User field:
Choose from the dropdown the name of the user who is writing the review

Press Submit review for the review to be saved into the Book Club database.

The new review will be exhibited above all other reviews.

If there are errors, they will be displayed below the text field.

COPY IMAGE URL/URI

Chrome: Right-click the image and select Copy image address
Firefox: Right-click the image and select Copy Image Location
Edge: Right-click the image and select Copy image link