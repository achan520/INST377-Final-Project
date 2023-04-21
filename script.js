/*
A processing request that uses array methods (.map, .filter, .find, .reduce) to change your data into the shape your chart, map, or other component needs for display
Then make sure that your data is visible through your chosen visualization library. It's okay if it's just one set or you can't change it this week.*/

/*An asynchronous data request to your API*/
 // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
function drawChart() {

    // Create the data table.
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    // Set chart options
    const options = {'title':'How Many Dogs in Each Dog Breed',
    'width':400,
    'height':300};

// Instantiate and draw our chart, passing in some options.
    const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

async function mainEvent() {
    const mainForm = document.querySelector('.main_form');


    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    /*textField.addEventListener('input', (event) => {

    });*/
}

