document.getElementById('movie-form').addEventListener('submit', function(e) {
  // Stop the default behavior of form submission/refresh
  e.preventDefault();

  // Grab values from the text boxes
  var searchQuery = document.getElementById('query').value;
  var userName = document.getElementById('username').value;

  // Make sure form is not empty
  if (searchQuery) {
    // Change the result title to reflect the user
    document.getElementById('result-title').textContent = userName + '\'s Faves';

    // Perform fetch (AJAX request)
    fetch('http://www.omdbapi.com/?apikey=5ff4115f&s=' + searchQuery)
    .then(function(responseData) {
      return responseData.json();
    })
    .then(function(jsonData) {
      // Empty any previous results
      document.getElementById('result').innerHTML = '';

      // Iterate through each movie
      jsonData.Search.forEach(function(movie) {
        // Create a div to hold all info
        let divContainer = document.createElement('div');

        // Make an h3 tag for the title
        let h3Title = document.createElement('h3');
        h3Title.textContent = `(${movie.Year}) ${movie.Title}`;

        // Make an image for the movie poster
        let poster = document.createElement('img');
        poster.src = movie.Poster;
        poster.style.height = '150px';
        poster.style.width = 'auto';

        // Add the info to the container div
        divContainer.append(h3Title);
        divContainer.append(poster);

        // Add the container div to some element that already lives in the DOM
        document.getElementById('result').append(divContainer);
      });
    });
  }
  else {
    // If form was empty, ask them for a query
    document.getElementById('result-title').textContent = 'Please Enter a Query';
  }
});
