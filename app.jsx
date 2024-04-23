const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 4000;

const uri = 'mongodb+srv://ranasahil78922:MhT1KYRyOByM28Pg@crud.lfhcbaq.mongodb.net/data?retryWrites=true&w=majority&appName=Crud';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const itemSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  number: String,
  company: String,
  web: String,
});

const Item = mongoose.model('Item', itemSchema, 'item');

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://shopiee.hubsyntax.com'
}));

app.post('/api/items', async (req, res) => {
  try {
    const { first, last, email, number, company, web } = req.body;
    const newItem = new Item({ first, last, email, number, company, web });
    await newItem.save();
    console.log('Item created successfully:', newItem);
    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
