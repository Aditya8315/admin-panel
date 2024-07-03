# Admin Panel Dashboard

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (`node --version`)
- npm installed (`npm --version`)

## Installation

1. **Clone the repository:**

   
   ```bash
   git clone https://github.com/Aditya8315/admin-panel.git
   cd admin-panel
   cd client
   npm install
   npm run dev

   cd ..
   cd server
   npm install
   npm run dev

Client will be running on http://localhost:5173
Server will be running on http://localhost:5000
Setup the Environment variables for both Client & Server.
Create a Mongodb cluster and set its URI as Server env -> MONGO_URI, Keep a JWT_SECRET & PORT of your choice.
