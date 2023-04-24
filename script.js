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
    const clearDataButton = document.querySelector('#data_clear');
    const generateListButton = document.querySelector('#generate');

    const loadAnimation = document.querySelector('#data_load_animation');
    const chartTarget = document.querySelector('#chart');

    loadAnimation.style.display = 'none';
    generateListButton.classList.add('hidden');


    const results = await fetch('https://dog.ceo/api/breeds/list/all');
    const arrayFromJson = await results.json();


    //API Data Request
    const chartData = await getData();
    const shapedData = shapeData(chartData);
    console.log(shapedData);
    const myChart = drawChart(chartTarget, shapeData);

    if (chartData.length > 0){
        submit.style.display = 'block';
        loadAnimation.classList.remove('lds-ellipsis');
        loadAnimation.classList.add('lds-ellipsis-hidden');

        let currentArray;
        mainForm.addEventListener('submit', async (SubmitEvent) => {
            SubmitEvent.preventDefault();
            currentArray = processBreeds(chartData);

            const dogs = currentArray.filter((item) => Boolean(item.geocoded_column_1));

            injectHTML(dogs);


        });

    }

}

