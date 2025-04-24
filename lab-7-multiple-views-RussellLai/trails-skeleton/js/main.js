
// Global objects go here (outside of any functions)
const dispatcher = d3.dispatch('filterCategories');


/**
 * Load data from CSV file asynchronously and render charts
 */ 
let data, scatterplot, barchart; 

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     // ... data preprocessing etc. ... TODO: you add code here for numeric
     data.forEach(d => {
        d.time = +d.time;
        d.distance = +d.distance;
      });
     // Be sure to examine your data to fully understand the code
     console.log(data);



     // Initialize scale
     const colorScale = d3.scaleOrdinal()
        .domain(['Easy', 'Intermediate', 'Difficult'])
        .range(['#c7e9c0', '#74c476', '#00441b']); 
     
     
     // TODO: add an ordinal scale for the difficulty
     const config = {
        parentElement: '#vis',
        containerWidth: 800,
        containerHeight: 500,
        margin: { top: 40, right: 40, bottom: 60, left: 60 },
        colorScale: colorScale
      };

     // See Lab 4 for help
     scatterplot = new Scatterplot({
        parentElement: '#scatterplot',
        colorScale: colorScale
      }, data);
     //we will update config soon
     scatterplot.updateVis();

     barchart = new Barchart({
        parentElement: '#barchart',
        colorScale: colorScale,
        dispatcher: dispatcher
      }, data);
     barchart.updateVis();
   })
  .catch(error => console.error(error));



/**
 * Use bar chart as filter and update scatter plot accordingly
 */
let difficultyFilter = [];

// function filterData() {
//     if (difficultyFilter.length == 0) {
//           scatterplot.data = data;
//      } else {
//         scatterplot.data = data.filter(d =>
//         difficultyFilter.includes(d.difficulty));
//      }
//      scatterplot.updateVis();
// }

dispatcher.on('filterCategories', selectedCategories => {
	if (selectedCategories.length == 0) {
		scatterplot.data = data;
	} else {
		scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
	}
	scatterplot.updateVis();
});





