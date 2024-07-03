# Admin Panel Dashboard

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (`node --version`)
- npm installed (`npm --version`)

## Installation

1. **Clone the repository:**
   git clone https://github.com/Aditya8315/admin-panel.git
   cd admin-panel
  
#Set up the client environment:
   cd client
   npm install

#Create a .env file in the client directory and add your environment variables.
set the VITE_BACKEND_BASE_URL

Run the client development server:

   npm run dev
   
#The client server will start at http://localhost:3000.

#Set up the server environment:
   cd ../server
   npm install

#Create a .env file in the server directory and add your environment variables.
#PORT
#JWT_SECRET
#MONGO_URI , create a Mongodb cluster on mongodb atlas and copy the connection string to this variable.
#Run the server:
   npm run dev
   
The server will start running at http://localhost:5000.

Usage
Navigate to http://localhost:5173 in your browser to view the application.
