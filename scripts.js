// Load the Visualization API and the corechart package.
google.charts.load('current', {packages: ['table']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawTable);

const tableOptions = {
  showRowNumber: true, // Display row numbers
  width: '100%', // Set the width of the table
  height: '100%', // Set the height of the table
};

function drawTable() {

    // Create the data table.
   const data = new google.visualization.DataTable();
   const tableData = [
    ['Breed', 'Number of Sub Breeds'],
    ['Affenpinscher', 0],
    ['African', 0],
    ['Airedale', 0],
    ['Akita', 0],
    ['Appenzeller', 0],
    ['Australian', 1],

    ['Basenji', 0],
    ['Beagle', 0],
    ['Bluetick', 0],
    ['borzoi', 0],
    ['boxer', 0],
    ['brabancon', 0],
    ['briard', 0],
    ['buhund', 1],
    ['bulldog', 3],
    ['bullterrier', 1],

    ['cattledog', 1],
    ['chihuahua', 0],
    ['chow', 0],
    ['clumber', 0],
    ['cocakpoo', 0],
    ['collie', 1],
    ['coonhound', 0],
    ['corgi', 1],
    ['cotondetulear', 0],

    ['dachshund', 0],
    ['dalmation', 0],
    ['dane', 1],
    ['deerhound', 1],
    ['dhole', 0],
    ['dingo', 0],
    ['doberman', 0],

    ['elkhound', 1],
    ['entlebucher', 0],
    ['eskimo', 0],

    ['finnish', 1],
    ['frise', 1],

    ['germanshepherd', 0],
    ['greyhound', 1],
    ['groenendael', 0],
 
    ['havanese', 0],
    ['hound', 7],
    ['husky', 0],

    ['keeshond', 0],
    ['kelpie', 0],
    ['komondor', 0],
    ['kuvasz', 0],

    ['labradoodle', 0],
    ['labrador', 0],
    ['leonberg', 0],
    ['lhasa', 0],

    ['malamute', 0],
    ['malinois', 0],
    ['maltese', 0],
    ['mastiff', 3],
    ['mexicanhairless', 0],
    ['mix', 0],
    ['mountain', 2],

    ['newfoundland', 0],

    ['otterhound', 0],
    ['ovcharka', 1],

    ['papillon', 0],
    ['pekinese', 0],
    ['pembroke', 0],
    ['pinscher', 1],
    ['pitbull', 0],
    ['pointer', 2],
    ['pomeranian', 0],
    ['poodle', 4],
    ['pug', 0],
    ['puggle', 0],
    ['pyrenees', 0],

    ['redbone', 0],
    ['retriever', 4],
    ['ridgeback', 1],
    ['rottweiler', 0],

    ['saluki', 0],
    ['samoyed', 0],
    ['schipperke', 0],
    ['schnauzer', 2],
    ['segugio', 1],
    ['setter', 3],
    ['sharpei', 0],
    ['sheepdog', 2],
    ['shiba', 0],
    ['shihtzu', 0],
    ['spaniel', 7],
    ['spitz', 1],
    ['springer', 1],
    ['stbernard', 0],

    ['terrier', 23],
    ['tervuren', 0],

    ['vizsla', 0],

    ['waterdog', 1],
    ['weimaraner', 0],
    ['whippet', 0],
    ['wolfhound', 1]
    // Add more data rows here
  ];
    //const info = Object.keys(object).map((item) => object[item].length);

    // Set chart options
    

// Instantiate and draw our chart, passing in some options.
    const table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(google.visualization.arrayToDataTable(tableData), tableOptions);
    
//Take an array and return an object
function shapeData(array){
  return array.reduce((collection, item) => {

      //If there's no key then create new array with the first thing that matches that key
      if(!collection[item.category]) {
          collection[item.category] = [item]

      }

      //If exists, then push the item currently looking at into that key to make a new array of every thing in the list
      else{
          collection[item.category].push(item);
      }

      return collection;
  }, {});
  
}
}

const generateListButton = document.getElementById('generate');
const dog_list = document.getElementById('dog_list');

const breedSearch = document.getElementById('breed_search');
let allBreeds = [];
generateListButton.addEventListener('click', () => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        allBreeds = Object.keys(data.message);
        displayBreeds(allBreeds);
  })
});

const collection = {
    data: [],
    add: function(item){
        this.data.push(item);
        this.save();
    },

    //Function to save the collection to localStorage
    save: function(){
        localStorage.setItem('collectionData', JSON.stringify(this.data));
    },

    //Function to load the collection from localStorage
    load: function(){
        const saveData = localStorage.getItem('collectionData');
        if(saveData){
            this.data = JSON.parse(saveData);
        }

    },

    //Refresh to do an API call that will swap out the localStorage for something new.
    refresh: function(){
        fetch('https://dog.ceo/api/breeds/list/all')
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              const dogs = Object.keys(data.message);
              this.data = dogs;
              this.save();
              console.log('Dog breeds data refreshed and stored in the collection.');
              this.display();
            } else {
              console.log('Failed to retrieve dog breeds data from API.');
            }
        })
    }
       
}


//Get data from API and load into the collection
fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      const dogs = Object.keys(data.message);
      collection.data = dogs;
      collection.save(); // Save the collection to localStorage
      console.log('Dog breeds data loaded and stored in the collection.');
    } else {
      console.log('Failed to retrieve dog breeds data from API.');
    }
  });

  
  // Attach click event listener to the refresh button
  const refreshButton = document.getElementById('refreshButton');
  refreshButton.addEventListener('click', function() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        allBreeds = Object.keys(data.message);
        displayBreeds(allBreeds);
        
  })
    

});

// Function to display a list of breeds
function displayBreeds(breeds) {
  // Clear any existing list items
  dog_list.innerHTML = '';

  // Loop through the breeds and add a new list item for each breed
  for (const breed of breeds) {
    const listItem = document.createElement('li');
    listItem.textContent = breed;
    dog_list.appendChild(listItem);
  }
}

// Add an event listener to the search box
breedSearch.addEventListener('input', () => {
  const searchString = breedSearch.value.trim().toLowerCase();
  const filteredBreeds = allBreeds.filter(breed => breed.toLowerCase().includes(searchString));
  displayBreeds(filteredBreeds);
});