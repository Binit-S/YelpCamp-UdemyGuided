const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const Campground = require('./models/Campground');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');

const db = mongoose.connection ;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connected");
})


//Middleware
app.use(express.urlencoded({ extended : true}));
app.use(cors()); 
app.use(express.json()); //Parses JSON sent from React


//-Routes-
app.get('/campgrounds',async(req,res) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
});

//2 . Get One (The Show Page)
app.get('/campgrounds/:id',async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    res.json(campground);
});


//3 . Create (The form submission)
app.post('/campgrounds',async (req,res) => {
    const campground = new Campground(req.body);
    await campground.save(); //send back the new campground so React can confirm it was made
    res.json(campground);
})

//4 . Update
app.put('/campgrounds/:id',async (req,res) => {
    const { id } = req.params; 
    const campground = await Campground.findByIdAndUpdate(id,req.body,{new : true});
    res.json(campground);
})

//5 . Delete 
app.delete('/campgrounds/:id',async(req,res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.json({message : "Deleted Successfully"});
});

app.listen(3000,() => {
    console.log('Server running on port 3000');
});