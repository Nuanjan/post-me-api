# Grocery-Helper-Api: A Description

Welcome to my Grocery-Helper-Api project. The purpose of this project is to create the API for client that want to request the data from grocery-helper-api to create a grocery-list. My Grocery-Helper-Api will allow client to create the new grocery list, show grocery-list that the user created, update grocery-list and delete the grocery-list. The require of this API is the client must have authentication to access the API. The client must sign-up with the unique email and password. Client will be able to change the password and signout after sign in.

## Important links
<!-- need the web application link -->

[Post-Me-Client gitHub Repo](https://github.com/Nuanjan/grocery-helper-client)

[Heroku-deployed-site](https://pure-thicket-03244.herokuapp.com)

[Post-Me-Client-Deployed-site](https://nuanjan.github.io/grocery-helper-client/)

## User Stories
* As an Post-Me API...
* Can response authentication include sign in, sin up, change password and sign out.
* Can response create get post path of post-me request.

## Tecnologies used

   * Express
   * MongoDb
   * Mongoose
   * nodemon
   * multer

   ## Unsolved Problem
   * The upload AWS S3 Routes still need to be fixed.

   ## Images

   ### ERD(entities Relation diagram)
   This ERD is the advance plan for my grocery roject. But the project has only one to many relation of user and List only. The one to many of list item will be create in the future.

![post-me ERD](https://i.imgur.com/WsFeWsy.png)
