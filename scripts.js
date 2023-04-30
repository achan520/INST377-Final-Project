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

/*generateListButton.addEventListener('click', () => {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      // Clear any existing list items
      dog_list.innerHTML = '';

      // Loop through the breeds and add a new list item for each breed
      for (const dog in data.message) {
        const listItem = document.createElement('li');
        listItem.textContent = dog;
        dog_list.appendChild(listItem);
      }
    })
    
});*/

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