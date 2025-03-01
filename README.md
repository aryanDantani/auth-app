# Backend API Documentation

## 🔥 Final API Endpoints for Postman Testing

### Authentication Routes

| Method | Endpoint | Description | Body |
|--------|---------|-------------|------|
| **POST** | `/api/auth/register/customer` | Register a customer | `{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "123456" }` |
| **POST** | `/api/auth/register/admin` | Register an admin | `{ "firstName": "Admin", "lastName": "User", "email": "admin@example.com", "password": "admin123" }` |
| **GET**  | `/api/auth/verify?token=<TOKEN>` | Email verification | No body, token in URL |
| **POST** | `/api/auth/login` | Admin login (customers not allowed) | `{ "email": "admin@example.com", "password": "admin123" }` |

---

## 🛠️ Backend `.env` Configuration

Create a `.env` file in the root of your backend project with the following contents:

```
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=authdb
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Replace `your_secret_key`, `your_email@example.com`, and `your_email_password` with your actual credentials.

---

### 🚀 How to Run the Backend Server
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server with nodemon:
   ```sh
   npm run dev
   ```
   (or manually start with `node server.js`)
3. Your backend should now be running on `http://localhost:5001`.

Test API requests using Postman or any API testing tool! 🎯

# auth-app
