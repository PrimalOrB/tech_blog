# Tech Blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Express.js / Node.js / mySQL application allowing a user to control an employee database of Departments, Roles, Managers, and Salaries.

## Table Of Contents

- [Screenshot](#screenshot)
- [Webpage](#webpage)
- [Usage](#usage)
- [Built Using](#built)
- [License](#license)
- [Contribution](#contribution)
- [Tests](#tests)
- [Questions](#questions)

## Screenshot
![ezgif-7-399e606d311f](https://user-images.githubusercontent.com/69044956/120729118-57b79480-c4ac-11eb-8ecb-9003290dd747.gif)


## Webpage
[primalorb-tech-blog on heroku](https://primalorb-tech-blog.herokuapp.com/)

## Usage

- On arriving at the website, you are presented with a list of posts which have been created by users
- You can view the posts while not logged in, but cannot comment
- Click Sign up / login
  - Enter a username
    - If the username does not exist in the DB, you are prompted to create a password
    - If the username does exist in the DB, you are prompted to log in
- Once logged in, you have the ability to create new blog posts from your dashboard
- You can also edit existing posts when viewed through your dashboard
  - Once in edit mode for a specific post, you are able to delete the post 
- Your dashboard list of posts will be ordered by newest date (either original post, or update)
- From the homepage, you are albe to click on posts to view previous comments
  - As long as you are logged in, you are able to add comments also
- Login sessions are a rolling timeout, so you must be active on the page or it will force log you out 


## Built

- [Node.js](https://nodejs.org/en/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [connect-session-seuelize](https://www.npmjs.com/package/connect-session-sequelize)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [express-session](https://www.npmjs.com/package/express-session)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [threejs](https://threejs.org/)

## License

This application is covered under the [MIT](https://opensource.org/licenses/MIT) license.

## Contribution

- There is no contribution required for this project

## Tests

- There are no tests for this project

## Questions

Please feel free to contact me regarding any further questions:

- [GitHub Profile](https://github.com/PrimalOrB)
- [Email Me](mailto://primalorb@gmail.com)
