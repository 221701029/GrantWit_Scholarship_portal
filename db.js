const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://<Keerthana>:<keerthanadb>@cluster0.mongodb.net/scholarship_portal?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error("MongoDB Connection Error:", err));

module.exports = mongoose;
