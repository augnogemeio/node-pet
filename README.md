# node-pet
Project for node training purposes

Description: API REST NodeJS with Express, using a single MySql table implementing the following HTTP actions: POST, GET, PATCH and DELETE.

# Instalation NODEJS
https://nodejs.org/en/

After installation, check if the node was added into %PATH% variable (Windows)
check:
node -v
npm -v

# Install MySql COMMUNITY VERSION (free)
Used "Custom" options (install only mySql Server and Workbench)

# Depencies used
npm install express

npm install --save-dev nodemon

npm install consign

npm install body-parser

npm install mysql

npm install moment 

npm install --save axios

# Notes
Edit package.json and add "nodemon index.js" as "start" on "scripts" section
After that, the project can be initialized with
npm start
 
Site with HTTP status description
https://httpstatuses.com/

Hint:
PUT ====> alter the entire object (full)
PATCH ==> alter only a few fiedls (partial)

# External Services
created folder 'services', add the 3 files and run 'npm install'

it creates an external service that bring the clients information of a given clientDocId
