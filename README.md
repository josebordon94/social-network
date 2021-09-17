# Social network
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Set up</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

## About The Project
This project is a social network inspired in Instagram. Users can create an account, share photos, like other people posts and write comments.
### Built With
* ReactJS
* NodeJS + Express
* MongoDB

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

1. NodeJS installed is required to run the backend server. You can install it following [this link](https://nodejs.org/es/). 
2. MongoDB instance is needed to store the application data. You can user a local server, or create an Atlas account. Follow [this link](https://www.mongodb.com/es) to get information about MongoDB if you are not familiar with it.  

### Set up

1. Clone the repo
   ```sh
   git clone https://github.com/josebordon94/social-network.git
   ```
2. Set a valid mongoDB connection in back/bin/mongodb.js file. You can change `dataBaseName  =  'socialNetworkDB'` for the name of your preference.
3. Install NPM packages in back directory and run the server
   ```sh
   cd back
   npm install
   npm start
   ```
4. Install NPM packages in front directory and run the server (using a new terminal)

   ```sh
   cd front
   npm install
   npm start
   ```
## Usage

By default, back server will run on port 4000, and front server will run on 3000. You can access to the application using a web browser, entering localhost:3000. 
The login screen is displayed. You can register in the website, and then login.
In the top navigation bar, you can access to:

1. Home: other users posts will be displayed.
2. My profile: current user posts will be displayed
3. New post: a form to create a new post will be displayed. Users can upload a photo and write a text.
4. Logout

Users can like posts using the heart icon at the bottom, and write a comment using the textarea.
