$(document).ready(function() {

    var disneyMovies = ["the lion king", "toy story", "cinderella", "finding nemo"];

    function renderMovies () {

        $('#buttons').empty();

        for (var i = 0; i < disneyMovies.length; i++){

            var newButton = $('<button type="button">');
            newButton.addClass('btn btn-dark movie-btn');
            newButton.attr('data-name', disneyMovies[i]);
            newButton.text(disneyMovies[i]);

            $('#buttons').append(newButton);
        }
    }

    function getMovieGif () {

        var disneyMovie = $(this).attr('data-name');
        console.log(disneyMovie);

        var apiKey = 'OSVrEhvlyTyFXiAvrvygeiXmjLtLocbD';
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyMovie + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then (function (response) {


          });
    
    }

    $(document).on('click', '.movie-btn', getMovieGif);

    $('#add-movie').on('click', function(event) {

        event.preventDefault();
        var newMovie = $('#input-text').val().trim();

        if (newMovie.length > 0) {
          
            disneyMovies.push(newMovie);
            $('#input-text').val(null);
            renderMovies();
        }
    });

    renderMovies();
});