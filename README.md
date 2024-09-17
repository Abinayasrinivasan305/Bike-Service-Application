

---

# Bike Service Application

This is a full-stack Bike Service application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, log in, and book bike services, while admins can manage bookings and update service statuses.

## Features

### User Functionality
- **User Registration and Login**: Users can register and log in to the system.
- **Service Booking**: After logging in, users can book a bike service. Users cannot book another service until the current one is marked as "Completed."
- **Booking Status**: Users can track the status of their service (e.g., Pending, Completed).
- **Email Notifications**: Users receive emails for booking confirmation and upon service completion.

### Admin Functionality
- **Admin Panel**: Admins can log in to manage service bookings.
- **View Bookings**: Admins can view all customer bookings and their statuses.
- **Update Status**: Admins can update booking statuses (e.g., mark as "Completed").
- **Email Notifications**: Admins send an email to notify customers once a service is completed.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Deployment**: Render

## Installation and Setup

To set up the project locally, follow these steps:

### Prerequisites
- Install [Node.js](https://nodejs.org)
- Set up MongoDB (either locally or via MongoDB Atlas)

### Clone the Repository

git clone https://github.com/your-username/bike-service-app.git
cd bike-service-app


### Backend Setup

1. Navigate to the `backend` directory:
   
   cd backend
   

2. Install backend dependencies:
   
   npm install
   

3. Start the backend server:
   
   npm start
   

4. Backend server runs on `http://localhost:8000`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   
   cd frontend
   

2. Install frontend dependencies:
   
   npm install
   

3. Start the frontend React app:

   npm start
   

4. Frontend runs on `http://localhost:3000`.

### URLs

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`

## Usage

### User Workflow:
1. Users register and log in.
2. After logging in, users can book a bike service.
3. They can check the status of their service booking.

### Admin Workflow:
1. Admins log in to access the admin panel.
2. Admins can view all bookings and update their statuses.
3. Upon completion, an email is sent to the user, and the status is updated to "Completed."


