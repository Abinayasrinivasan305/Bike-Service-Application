const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
const RegFormModel = require('./models/Registrationform');
const SerRegModel = require('./models/Servicereg');
const Admin = require('./models/Admin');
const nodemailer = require('nodemailer'); // Add Nodemailer
const app = express();

// Middleware
app.use(express.json());//with the help of express.json whatever the req get from respone that is automaticallay parsed through the json
app.use(cors());  //using this our reactjs project connect to express app on port 4000

const verifyToken = (req, res, next) => {
  console.log("Checking token...");
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Token received:", token);

  if (!token) return res.status(401).send("Access Denied: No Token Provided");

  try {
    const verified = jwt.verify(token, 'secret_bikeser');
    req.user = verified;
    console.log("Token verified:", req.user);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).send("Access Denied: Invalid Token");
  }
};


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Bike_service")
  .then(() => {
    console.log("Connected to MongoDB!!!");
  })
  .catch(() => {
    console.log("Failed to connect");
  });

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'geerup26@gmail.com', // Replace with your email
    pass: 'vnqd yrmj nezz encq'   // Replace with your email password or app-specific password if using 2FA
  }
});

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user already exists
    let checkUser = await RegFormModel.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user
    const newUser = new RegFormModel({ name, email, password }); // Ensure password is hashed before saving
    await newUser.save();

    // Generate token
    const data = {
      user: {
        email: newUser.email,
      }
    };
    const token = jwt.sign(data, 'secret_bikeser', { expiresIn: '1h' }); // Adjust expiration as needed

    return res.json({ success: true, token });
  } catch (err) {
    console.error('Error during registration:', err); // Log the error for debugging
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});


// Login a user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, errors: 'Email and password are required' });
    }

    if (email === 'john24@gmail.com') {
      // Admin login
      const admin = await Admin.findOne({ email });
      if (admin && admin.password === password) {
        const token = jwt.sign({ email: admin.email, role: 'admin' }, 'secret_bikeser', { expiresIn: '1h' });
        console.log("hi admin");
        return res.json({ success: true, token, redirect: '/admin/adminpanel' });
      } else {
        return res.status(400).json({ success: false, errors: 'Invalid credentials for admin' });
      }
    } else {
      // Regular user login
      const user = await RegFormModel.findOne({ email });
      if (user && user.password === password) {
        const token = jwt.sign({ email: user.email, role: 'user' }, 'secret_bikeser', { expiresIn: '1h' });
        return res.json({ success: true, token, redirect: '/home' });
      } else {
        return res.status(400).json({ success: false, errors: 'Invalid credentials for user' });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, errors: 'Server error' });
  }
});



app.post('/home',verifyToken,(req,res)=>{
      res.send(`welcome to Home page ${req.user.user.email}`)
})

app.post('/regservice', verifyToken, async (req, res) => {
  const { fullname, emailid, model, service, date } = req.body;

  if (!fullname || !emailid || !model || !service || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Log incoming request data
    console.log('Registration request received:', { fullname, emailid, model, service, date });

    // Find existing pending registration for the user
    let existingRegistration = await SerRegModel.findOne({ emailid, status: 'pending' });

    // Log existing registration result
    console.log('Existing registration:', existingRegistration);

    if (existingRegistration) {
      return res.status(400).json({
        message: `You have already registered for ${existingRegistration.service} service on ${existingRegistration.date}.`
      });
    }

    // Create a new service registration
    const ser_reg_form = await SerRegModel.create({
      fullname,
      emailid,
      model,
      service,
      date,
      status: 'pending'
    });

    // Log newly created registration
    console.log('New registration created:', ser_reg_form);

    // Create and send email
    const newToken = jwt.sign({ user: { email: emailid } }, 'secret_bikeser');
    const mailOptions = {
      from: 'geerup26@gmail.com',
      to: emailid,
      subject: 'Service Registration Confirmation',
      text: `Dear ${fullname},\n\nThank you for contacting Gear Up Bike Services. We have received your request for ${service} service on your ${model} on ${date}. We will contact you as soon as possible.\n\nBest regards,\nGear Up Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error registering service. Email not sent." });
      } else {
        res.status(201).json({
          message: "Registered successfully! Email confirmation sent.",
          serviceDetails: ser_reg_form,
          token: newToken
        });
      }
    });
  } catch (error) {
    console.error('Server Error:', error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to fetch all booking records for the logged-in user
app.get('/booking-records', verifyToken, async (req, res) => {
  try {
      // Retrieve booking records for the logged-in user
      const userEmail = req.user.email;
      const records = await SerRegModel.find({ emailid: userEmail });

      if (!records) {
          return res.status(404).json({ message: 'No records found' });
      }

      res.json(records);
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});


// Route to search for bookings by user email
app.post('/admin/search', async (req, res) => {
  const { email } = req.body; // Extract email from the request body

  try {
    // Find registrations in the database that match the email
    const userRegistrations1 = await SerRegModel.find();
     console.log('All registered users:', userRegistrations1);

    const userRegistrations = await SerRegModel.find({ emailid:email });
    console.log(userRegistrations);
    
    if (userRegistrations.length > 0) {
      // If records are found, return them
      res.json(userRegistrations);
    } else {
      // If no records are found, send a message
      res.status(404).json({ message: 'No registrations found for this user' });
    }
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.patch('/admin/update-status/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Only allow status to be updated to "completed"
  if (status !== 'completed') {
    return res.status(400).json({ message: 'Invalid status. Only "completed" is allowed.' });
  }

  try {
    // Log request parameters
    console.log('Updating status for registration ID:', id, 'New Status:', status);

    // Find and update the registration with the given ID
    const updatedRegistration = await SerRegModel.findByIdAndUpdate(id, { status }, { new: true });

    // Check if the registration exists
    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Log updated registration details
    console.log('Updated registration:', updatedRegistration);

    // Send email to notify the user that their service is completed
    const mailOptions = {
      from: 'geerup26@gmail.com',
      to: updatedRegistration.emailid,
      subject: 'Service Completed',
      text: `Dear ${updatedRegistration.fullname},\n\nWe are pleased to inform you that your ${updatedRegistration.service} service on your ${updatedRegistration.model}, registered on ${updatedRegistration.date}, has been completed. We will contact you soon for delivery arrangements.\n\nBest regards,\nGear Up Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error updating status. Email not sent.' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({
          message: 'Status updated successfully! Email notification sent.',
          updatedRegistration
        });
      }
    });
  } catch (error) {
    console.error('Server Error:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/admin/customer-bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await SerRegModel.find(); // Fetch all bookings
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching customer bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Example middleware with `next()`
app.use((req, res, next) => {
  console.log("Express works!!!");
  next();
});

// Start server
app.listen(8000, () => {
  console.log("Server running on port 8000!!");
});
