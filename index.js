const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { deleteOne } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "Arroç al forn",
      level: "Amateur Chef",
      ingredients: ["rice", "potatoes", "chickpea"],
      cuisine: "Spanish",
      dishType: "main_course",
      image: "arroz",
      duration: 60,
      creator: "valenciano",
      created: 05/05/1870,
    })
  })
    .then (response => {
      console.log(response.title)
    })
    .then(() => {
      return Recipe.insertMany(data)
    }) 
    .then(response =>{
      response.forEach(response => {
        console.log(response.title)
      })
    })
    .then(() => {
      return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
    })
    .then(response => {
      console.log(response + " Well done!")
    })
    .then(()=>{
      return Recipe.deleteOne({title: "Carrot Cake"})
    })
    .then(response => {
      console.log( response + " Well done!")
    })
    .then(() => {
      return mongoose.connection.close()
    })
    
    // Run your code here, after you have insured that the connection was made
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  