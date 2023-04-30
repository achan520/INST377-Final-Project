/*
A processing request that uses array methods (.map, .filter, .find, .reduce) to change your data into the shape your chart, map, or other component needs for display
Then make sure that your data is visible through your chosen visualization library. It's okay if it's just one set or you can't change it this week.*/

/*An asynchronous data request to your API*/
 // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min + 1) + min);
  
  }

  function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector('#dog_list');
    target.innerHTML = '';
    list.forEach((item, index) => {
      const str = `<li>${item.name}</li>`;
      target.innerHTML += str
    })

  }

  function filterList(list, query) {
    /*
      Using the .filter array method, 
      return a list that is filtered by comparing the item name in lower case
      to the query in lower case
    */
  
      return list.filter((item) => {
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();
        return lowerCaseName.includes(lowerCaseQuery);
      })
  }

  function cutDogList(list) {
    console.log('fired cut list');
    const range = [...Array(15).keys()]; /* a smaller array, makes an array of 15 elements */
    return newArray = range.map((item) => {
      const index = getRandomIntInclusive(0, list.length - 1);
      return list[index]
  
    }) /* applies every function to every element inside an array and returns the new transformed element to a new array */
  
  }



async function getData(){
    const url = 'https://dog.ceo/api/breeds/list/all';
    const data = await fetch(url);
    const json = await data.json();
    const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item) => Boolean(item.name));
    return reply;
}

async function mainEvent() {
    
    const mainForm = document.querySelector('.main_form');
    const loadDataButton = document.querySelector('#data_load');
    //const clearDataButton = document.querySelector('#data_clear');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto');

    const loadAnimation = document.querySelector('#data_load_animation');
    const chartTarget = document.querySelector('#chart');

    loadAnimation.style.display = 'none';
    generateListButton.classList.add('hidden');

    const storedData = localStorage.getItem('storedData');
    const parsedData = JSON.parse(storedData);
    if (parsedData.length > 0){
      generateListButton.classList.remove("hidden");
    }

    let storedList = [];
    let currentList = []; // this is "scoped" to the main event function

     /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener('click', async (submitEvent) => {
      
        // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
        console.log('Loading data');
        loadAnimation.style.display = 'inline-block';

        const results = await fetch('https://dog.ceo/api/breeds/list/all');
        const arrayFromJson = await results.json();

        localStorage.setItem('storedData', JSON.stringify(storedList));
        // Make sure generate button toggles properly when load button is clicked
        
        loadAnimation.style.display = 'none';
        //console.table(storedList); /*This array initially contains all 1,000 records from your request,*/
       });

    //API Data Request
       const chartData = await getData();
       const shapedData = shapeData(chartData);
       console.log(shapedData);
       const myChart = drawChart(chartTarget, shapeData);
   
       if (chartData.length > 0){
           submit.style.display = 'block';
           loadAnimation.classList.remove('lds-ellipsis');
           
   
           let currentArray;
           mainForm.addEventListener('submit', async (SubmitEvent) => {
               SubmitEvent.preventDefault();
               currentArray = processBreeds(chartData);
   
               const dogs = currentArray.filter((item) => Boolean(item.geocoded_column_1));
   
               injectHTML(dogs);
   
   
           });

       generateListButton.addEventListener('click', (event) => {
        console.log('generate new list');
        /*currentList = cutDogList(storedList);
        console.log(currentList);
        injectHTML(currentList);*/
        const DogsList = cutDogList(currentList);
        console.log(DogsList);
    
      })
  
      textField.addEventListener('input', (event) => {
          console.log('input', event.target.value);
          const newList = filterList(currentList, event.target.value);
          console.log(newList);
          injectHTML(newList);
      })
    }
    function processDogs(list) {
      console.log('fired restaurants list');
    }

  
}

    async function mainEvent() {
        /*
          ## Main Event
            Separating your main programming from your side functions will help you organize your thoughts
            When you're not working in a heavily-commented "learning" file, this also is more legible
            If you separate your work, when one piece is complete, you can save it and trust it
        */
      
        // the async keyword means we can make API requests
        const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
        const submit = document.querySelector('button[type="submit"]'); // get a reference to your submit button
       
      
        /*
          Let's get some data from the API - it will take a second or two to load
          
         */
        const results = await fetch('https://dog.ceo/api/breeds/list/all');
        const arrayFromJson = await results.json(); // here is where we get the data from our request as JSON
      
        /*
          Below this comment, we log out a table of all the results:
        */
        console.table(arrayFromJson);
        

      
        // This IF statement ensures we can't do anything if we don't have information yet
        if (arrayFromJson?.length > 0) { // the question mark in this means "if this is set at all"
          submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
      
          // And here's an eventListener! It's listening for a "submit" button specifically being clicked
          // this is a synchronous event event, because we already did our async request above, and waited for it to resolve
          form.addEventListener('submit', (submitEvent) => {
            // Using .preventDefault, stop the page from refreshing when a submit event happens
            // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
      
            // This constant will contain the value of your 15-restaurant collection when it processes
            const DogList = processDogs(arrayFromJson);
      
            // And this function call will perform the "side effect" of injecting the HTML list for you
            injectHTML(DogList);
          });
        }
      }
      

 /*
    This last line actually runs first!
    It's calling the 'mainEvent' function at line 57
    It runs first because the listener is set to when your HTML content has loaded
  */
document.addEventListener('DOMContentLoaded', async () => mainEvent()); 

