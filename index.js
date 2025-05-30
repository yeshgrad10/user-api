require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Types } = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// Insert test user only once
const insertTestUser = async () => {
  const existing = await User.findOne({ email: 'alice@example.com' });
  if (!existing) {
    await User.create({
      name: 'Alice Tester',
      email: 'alice@example.com',
      age: 29
    });
    console.log('Test user inserted');
  } else {
    console.log('Test user already exists');
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  await insertTestUser();
})
.catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('User API is running!');
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  try {
    const user = await User.findOne({ _id: id, age: { $gt: 21 } });

    if (!user) {
      return res.status(404).json({ message: 'User not found or age is 21 or below' });
    }

    return res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
