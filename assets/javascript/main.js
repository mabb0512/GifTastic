$(document).ready(function() {

    var disneyMovies = ["finding dory", "toy story", "cinderella", "finding nemo"];
    var clickCount = 0;
    var disneyMovie = "";

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

    function getMovieGif (disneyMovie, clickCount) {

        var offSet = clickCount * 10;

        var apiKey = 'OSVrEhvlyTyFXiAvrvygeiXmjLtLocbD';
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disneyMovie + "&api_key=" + apiKey + "&limit=10&offset=" + offSet;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then (function (response) {

            var resultGifs = response.data;

            console.log(resultGifs);

            for (var i = 0; i < resultGifs.length; i++) {

                var gifDiv = $('<div class="gif-margin">');
                var p1 = $('<div>').text('Rating: ' + resultGifs[i].rating);
                var downloadLink = $('<a href="' + resultGifs[i].images.preview_webp.url + '" target="_blank">Open in new window</a>');
                var p2 = $('<p>');

                var gifImage = $('<img data-state="still" class="gif">');
                
                gifImage.attr('data-still', resultGifs[i].images.fixed_height_still.url);
                gifImage.attr('data-animate', resultGifs[i].images.fixed_height.url);
                gifImage.attr('src', resultGifs[i].images.fixed_height_still.url);
                p2.append(downloadLink);
                gifDiv.append(p1);
                gifDiv.append(p2);
                gifDiv.append(gifImage);
                gifDiv.append('<hr class="style6">');
                $('#gifs').prepend(gifDiv);
            }
          });
    }

    function changeGifState () {
        
        var state = $(this).attr("data-state");
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    }

    $(document).on('click', '.movie-btn', function () {
        
        if (disneyMovie.length > 0) {

            if ($(this).attr('data-name').toLowerCase() == disneyMovie.toLowerCase())
                clickCount = clickCount + 1;

            else {

                clickCount = 0;
                $('#gifs').empty();
            }  
                
        }

        else   
            clickCount = 0;

        disneyMovie = $(this).attr('data-name');
        getMovieGif(disneyMovie, clickCount);
    });

    $('#add-movie').on('click', function(event) {

        event.preventDefault();
        var newMovie = $('#input-text').val().trim();

        if (newMovie.length > 0) {
          
            disneyMovies.push(newMovie);
            $('#input-text').val(null);
            renderMovies();
        }
    });

    $(document).on("click", '.gif', changeGifState);

    renderMovies();
});