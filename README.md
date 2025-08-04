🔗 LinkSphere
LinkSphere is a mini-community web application inspired by LinkedIn. Built with the MERN stack, it allows users to sign up, create and explore posts, view user profiles, and access an admin dashboard.

🌟 Features
🔐 JWT-based Authentication

🏠 Home Feed showing all public posts

✍️ Create Post (only available to logged-in users)

👤 View Profiles with user-specific posts

🔍 Search Users by name

📄 My Profile Page for managing user info and posts

Option to edit user profile




🚀 Tech Stack
🔹 Frontend
React.js

Tailwind CSS

Axios

🔹 Backend
Node.js

Express.js

MongoDB Atlas



🔹 Other Tools
JWT for Authentication

Cloudinary for Image Uploads

Multer for file handling



🛠️ Installation & Setup
Clone the repository and install dependencies for both frontend and backend.

🔧 Backend Setup

git clone https://github.com/1234bk/linksphere-assignment.git
cd linksphere-assignment/backend
npm install
Create a .env file in /server with the following:

env backend
MONGO_URI=mongodb://temp:temp@ac-tkbbofv-shard-00-00.yya0xap.mongodb.net:27017,ac-tkbbofv-shard-00-01.yya0xap.mongodb.net:27017,ac-tkbbofv-shard-00-02.yya0xap.mongodb.net:27017/template?ssl=true&replicaSet=atlas-241kq0-shard-0&authSource=admin&retryWrites=true&w=majority
JWT_SECRET=Temp
PORT=3000

CLOUDINARY_CLOUD_NAME="surajgsn"
CLOUDINARY_API_KEY="852652549314759"
CLOUDINARY_API_SECRET="QJz1gDQk0Fts_Qu3E3W6sK2Imrk"
ORIGIN_URL="http://localhost:3000"

Then run the server:
npm run dev



🔧 Frontend Setup
cd ../frontend
npm install
Create a .env file in /client with the following:


VITE_BASE_URL=http://localhost:3000
VITE_BACKEND_PORT=3000

then run at terminal
npm run dev


🔐 Demo Credentials
👤 User Login
Email: brijesh6514@example.com
Password: brijesh6514@example.com



