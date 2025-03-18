
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipesRouter);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yemekyapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB\'ye bağlandı'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
