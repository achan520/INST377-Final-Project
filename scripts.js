// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    // Create the data table.
   const data = new google.visualization.DataTable();
   data.addColumn('string', 'Dog Breed');
   data.addColumn('number', 'Number for Each Breed');
   data.addRows([
        ['Affenpinscher', 1],
        ['African', 1],
        ['Airedale', 1],
        ['Akita', 1],
        ['Appenzeller', 1],
        ['Australian', 3]
    ]);
    //const info = Object.keys(object).map((item) => object[item].length);

    // Set chart options
    const options = {'title':'The Percent of Dogs That Make Up Each Breed',
    'width':400,
    'height':300};

// Instantiate and draw our chart, passing in some options.
    const chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
}

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