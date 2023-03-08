const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema)
// voici la creation du modele et du shema 


var createAndSavePerson = (done) => {
    var janeFonda = new Person({
      name: "Jane Fonda",
      age: 84,
      favoriteFoods: ["vodka", "air"]
    });
   
    janeFonda.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    });
  };
//   voici la creation de l'enregistrement


var arrayOfPeople = [
    {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
    {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
    {name: "Robert", age: 78, favoriteFoods: ["wine"]}
  ];
   
  var createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
  };
//   voici la creation de nombreuse enregistrement avec model.create


var findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (err, personFound) => {
      if (err) return console.log(err);
      done(null, personFound);
    });
  };
// voici la creation du model find() 


var findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  };
//  creation du model find one 


var findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  };
//   creation du model.findById()


const findEditThenSave = (personId, done) => {
    const foodToAdd = 'hamburger';
    // .findById() method to find a person by _id with the parameter personId as search key. 
    Person.findById(personId, (err, person) => {
      if(err) return console.log(err); 
     
      // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
      person.favoriteFoods.push(foodToAdd);
   
      // and inside the find callback - save() the updated Person.
      person.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson)
      });
    })
  };
// effectuation de la mise a jour classique 


	
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
   
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    });
  };
// effectuation des nouvelles mise a jour 


const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    });
  /*
    Person.findOneAndRemove({_id: personId}, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    });
  */
  };
//   suppression d'un document


const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
   
    Person.remove({name: nameToRemove}, (err, response) => {
      if(err) return console.log(err);
      done(null, response);
    });
  };
//   suppression des documents


const queryChain = (done) => {
    var foodToSearch = "burrito";
   
    Person
    .find({favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
  };
// affination des resultats de recherche


