const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var ObjectId = require('mongodb').ObjectId;




dbo.connectToServer();

//pour voir les pokémon dans la liste
app.get("/pokemon/list", function (req, res) {

  const dbConnect = dbo.getDb();
  
  dbConnect
    .collection("pokemonlist")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
  });

  
//pour inserer des pokémon dans la liste 
app.post('/pokemon/insert', jsonParser, (req, res) => {
  let body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection("pokemonlist")
  .insert({...body});
  
  res.json(body);
}); 

//pour inserer des pokémon dans le pokedex 
app.post('/pokemon/insert/pokedex', jsonParser, (req, res) => {
  let body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection("pokedex")
  .insert({...body});

  res.json(body);
}); 

//pour voir les pokémon dans le pokédex
app.get("/pokemon/list/pokedex", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokedex")
    .find({}) 
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
  });





app.post('/pokemon/update/pokedex', jsonParser, (req, res) => {
  let body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection("pokedex")
  .updateOne({
    _id:ObjectId(body._id)
  },{
      $set: {
          name:body.name,
          types:body.types
      }
  }).then(function(result,err){
    if(err){
      res.json(err.message);
    }
    res.json({"success":true});
  });
  
}); 



app.post('/pokemon/update/list', jsonParser, (req, res) => {
  let body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection("pokemonlist")
  .updateOne({
    _id:ObjectId(body._id)
  },{
      $set: {
          name:body.name,
         
      }
  }).then(function(result,err){
    if(err){
      res.json(err.message);
    }
    res.json({"success":true});
  });
  
}); 

app.delete('/pokemon/delete/pokedex', jsonParser, (req, res) => {
  let body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection("pokedex")
  .deleteOne({name:body.name});
  
  res.json(body);
});

app.delete('/pokemon/delete/list', jsonParser, (req, res) => {
  let body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection("pokemonlist")
  .deleteOne({name:body.name});
  
  res.json(body);
});


//pour inserer pulsieur types dans la variables types 
app.post('/pokemon/insert/types', jsonParser, (req, res) => {
  let body = req.body;
  const dbConnect = dbo.getDb();
  dbConnect.collection("types")
  .insertMany(body);
  res.json(body);
}); 


//pour voir les types de pokémon 
app.get("/pokemon/list/types", function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("types")
    .find({}) 
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
    
  });


  



app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});