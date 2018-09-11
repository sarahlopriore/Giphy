$(document).ready(function() {

    // create topics variable
    var topics = ["avocado", "apple", "sweet potato", "bell pepper", "pineapple", "mango", "onion", "broccoli", "watermelon", "corn", "kiwi", "blueberry", "celery"];

 

    // on page load create buttons for all items in the topics array
    // loop through the topics array to create each button
    for (i = 0; i < topics.length; i++) {
        var $newButton = $("<button class='btn btn-success btn-space topics-btn'></button>").append(topics[i]);
        $newButton.attr("id", topics[i]);
        $("#buttons").append($newButton);
    };

    // for each button click, run an ajax request to the giphy api to get 10 search results for that topic
    // results are displayed as static gifs
    $(document).on("click", ".topics-btn", function() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + "&api_key=mMR97LCZTFVnxouA2wyRM7RKUTWNdMv7&limit=10&rating=pg-13";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var $display = $("#gifDisplay");
            var dataArray = response.data;
            var gifCounter = 0;
            // have the gif results overwrite the previous results
            $display.empty();
            for (j = 0; j < dataArray.length; j++) {
                // increase gifCounter by 1 
                gifCounter++;
                var dataNum = dataArray[j];
                var $newGifDiv = $("<div class='col-md-3'></div>");
                var staticURL = dataNum.images.fixed_height_still.url;
                var $staticGif = $("<img />").attr("src", staticURL);
                $staticGif.addClass("spacing");
                $newGifDiv.append($staticGif);
                // each gif should also display the rating underneath
                var gifRating = dataNum.rating;
                var $ratingDisplay = $("<p></p>").append("Rating: " + gifRating);
                $newGifDiv.append($ratingDisplay); 
                console.log(gifCounter);
                $display.append($newGifDiv); 
                // create a new row for every 3 gifs
                //if (gifCounter ) {
                    //var $newRow = $("<div class='row'></div>")
                    //$newRow.append($newGifDiv)
                    //$("#gifSection").append($newRow);
                //}
            }
        })
    })


    // when a static gif is clicked, it moves
    // when moving gif is clicked, it stops moving



    // when user adds an topic through the newButtonInput, it is added to the topics array
    // this then creates a new button for that new topic
    // this new button will function the same as the others


})
