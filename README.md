Bike Service Application
This is a full-stack Bike Service application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to register, log in, and book bike services. Admins can view and manage customer bookings, update the status of services, and notify customers via email.

Features
User Functionality:
User Registration and Login: Users can register and log in to the system.
Service Booking: Users can book a bike service after logging in. They are not allowed to book another service until their previous booking is marked as 'Completed'.
Booking Status: Users can view the status of their booking and track its progress (e.g., Pending, Completed).
Email Notifications: Users receive email notifications after booking a service and when the status of the service is updated to 'Completed'.
Admin Functionality:
Admin Panel: Admins can log in to a dedicated admin panel to manage the service bookings.
View Bookings: Admins can view all customer bookings and their statuses.
Update Status: Admins can update the status of customer bookings (e.g., from 'Pending' to 'Completed').
Email Notifications: Admins can send email notifications to customers when their service is completed.
Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Email Service: Nodemailer (for sending emails)
Deployment: Render (for hosting the application)
Installation and Setup
Follow the instructions below to set up the project locally.

Prerequisites
Node.js installed
MongoDB installed and running locally or using MongoDB Atlas for a cloud database
Clone the Repository
bash
Copy code
git clone https://github.com/your-username/bike-service-app.git
cd bike-service-app
Backend Setup
Navigate to the backend directory.

bash
Copy code
cd backend
Install backend dependencies.

bash
Copy code
npm install
Run the backend server:

bash
Copy code
npm start
The backend server will run on http://localhost:8000.

Frontend Setup
Navigate to the frontend directory.

bash
Copy code
cd frontend
Install frontend dependencies.

bash
Copy code
npm install
Run the frontend React app:

bash
Copy code
npm start
The frontend server will run on http://localhost:3000.

Application URLs
Frontend: http://localhost:3000
Backend API: http://localhost:8000
Usage
User Registration and Login:
Users register and log in to their accounts.
After logging in, users are redirected to the home page, where they can book a bike service.
Users can view the status of their service booking.
Admin Functionality:
Admins log in to the admin panel to view all service bookings.
Admins can mark a booking as 'Completed' once the service is finished.
An email notification is sent to the user once the booking status is updated to 'Completed'
