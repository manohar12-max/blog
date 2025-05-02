Blog Application

This is a full-stack blog application with a backend built using Node.js, Express, and MongoDB, and a frontend built using React and Vite. The application enables users to sign up, log in, create, edit, and delete blog posts, view a paginated list of blogs, and access detailed blog content. Access to certain features is restricted to authenticated users and blog authors, ensuring secure and role-based functionality.

Features
SignIN/SignUp Page: Allows users to create an account or log in securely using JWT authentication and password hashing.
Blog Creation Page: Accessible only to logged-in users, enabling the creation of new blog posts with a title and description.
Blog Listing Page: Publicly accessible, displays a paginated list of all blog posts for easy navigation.
Blog Detail Page: Publicly accessible, shows the full content of a selected blog post.
Blog MyBlogs Page:Only accessible by author where it list all the blogs created my author.
Blog Edit Page: Accessible only to the blog’s author, provides a form to edit the blog’s title and description.
Blog Edit/Delete Options: Available only to the blog’s author, with options to edit or delete their posts, accessible via the Blog Detail or Blog Edit pages.

Setup Instructions

1. Clone the Repository
If the project is hosted in a repository, clone it:
git clone <repository-url>
cd <repository-name>

2. Backend Setup
Navigate to the Backend Directory:
cd backend
Install Dependencies:
npm install
Configure Environment Variables:
Create a .env file in the backend directory with the following content:

PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
Replace <your-mongodb-connection-string> with your MongoDB connection string (e.g., mongodb://localhost:27017/blog for a local instance or a MongoDB Atlas URI).
Replace <your-jwt-secret-key> with a secure, random string for JWT authentication (e.g., a 32-character random string).
Start the Backend Server:
npm run dev
The backend will run on http://localhost:5000 (or the port specified in .env). The nodemon package ensures the server restarts automatically on code changes.

3. Frontend Setup

Navigate to the Frontend Directory:
cd frontend
Install Dependencies:
npm install
Configure API Base URL:
Ensure the frontend communicates with the backend by setting the API base URL. Create or update a configuration file (e.g., src/api.js) with the following:
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});
export default api;
Use this api instance for all Axios requests in your React components to interact with the backend.
Start the Frontend Development Server:
npm run dev
The frontend will run on http://localhost:5173 (Vite’s default port). Open this URL in your browser to access the application.

4. Build for Production

Backend
No build step is required for the backend. For production, run:
npm run dev
Ensure the .env file is configured with production settings (e.g., a production MongoDB URI).
Frontend
To build the frontend for production:
npm run build
This generates a dist folder with optimized static files. Serve these files using a web server.

5. Usage

Access the Application:
Open http://localhost:5173 in your browser.
Navigate to the Signup page (e.g., /signup) to create a new account or the Login page (e.g., /login) to access an existing account.
Create a Blog:
After logging in, navigate to the Blog Creation page (e.g., /create).
Enter a title and description, then submit to create a new blog post.
View Blogs:
Visit the Blog Listing page (e.g., /blogs) to see a paginated list of all blogs.
Click on a blog title to view its full content on the Blog Detail page (e.g., /blogs/:id).
Edit/Delete Blogs:
On the Blog Detail page of a blog you authored, you’ll see "Edit" and "Delete" buttons (visible only to the author).
Click "Edit" to navigate to the Blog Edit Page (e.g., /edit/:id), modify the title or description, and save changes.
Click "Delete" to remove the blog (with a confirmation prompt).
Authentication and Authorization:
Only logged-in users can access the Blog Creation and Blog Edit pages.
Edit and delete options are restricted to the blog’s author, enforced by backend checks.

6. API Endpoints

Base URL: http://localhost:5000/api
Authentication (/api/auth)
POST /auth/signup: Register a user (username, email, password). Returns JWT.
POST /auth/login: Log in (email, password). Returns JWT.
Blogs (/api/blog)
GET /blog/: Get paginated blogs (?page=1&limit=10). Public.
GET /blog/my-blog: Get authenticated user’s blogs. Requires JWT.
POST /blog/create: Create a blog (title, description). Requires JWT.
GET /blog/:id: Get a single blog by ID. Public.
PUT /blog/:id: Update a blog (title, description). Requires JWT, author-only.
DELETE /blog/:id: Delete a blog. Requires JWT, author-only.
Authentication: Protected endpoints require Authorization: Bearer <token>.

7. Dependencies

Backend
express: API framework.
mongoose: MongoDB ORM.
jsonwebtoken: JWT authentication.
bcryptjs: Password hashing.
cors: Frontend CORS support.
dotenv: Environment variables.
nodemon: Auto-restart server.

Frontend
react: UI library.
react-router-dom: Routing.
axios: API requests.
react-toastify: Notifications.
react-icons: UI icons.
moment: Date formatting.
vite: Build tool.
eslint: Code linting.

8. Troubleshooting
MongoDB Issues: Check MONGODB_URI and ensure MongoDB is running.
CORS Errors: Verify CORS setup in server.js:
app.use(cors({ origin: 'http://localhost:5173' }));
JWT Errors: Ensure JWT_SECRET matches and token is sent as Bearer <token>.
Author Access: Backend must check user ID vs. blog author ID for PUT/DELETE.
Notifications: Use react-toastify for success/error messages.