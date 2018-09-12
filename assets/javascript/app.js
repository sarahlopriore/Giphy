$(document).ready(function() {

    // create topics variable
    var topics = ["avocado", "apple", "sweet potato", "bell pepper", "pineapple", "mango", "onion", "broccoli", "watermelon", "corn", "kiwi", "blueberry", "celery"];

 
    
    // on page load create buttons for all items in the topics array
    // loop through the topics array to create each button
    var createButtons = function() {
        for (i = 0; i < topics.length; i++) {
            var $newButton = $("<button class='btn btn-success btn-space topics-btn'></button>").append(topics[i]);
            $newButton.attr("id", topics[i]);
            $("#buttons").append($newButton);
        };
    };

    createButtons();

    // when user adds an topic through the newButtonInput, it is added to the topics array
    // this then creates a new button for that new topic
    // this new button will function the same as the others
    $(document).on("click", "#submitBtn", function() {
        event.preventDefault();
        var newTopic = $("#newButtonInput").val();
        console.log(newTopic);
        topics.push(newTopic);
        $("#buttons").empty();
        createButtons();
    });


    // for each button click, run an ajax request to the giphy api to get 10 search results for that topic
    // results are displayed as static gifs
    $(document).on("click", ".topics-btn", function() {
        //var buttonId = $(this).attr("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + "&api_key=mMR97LCZTFVnxouA2wyRM7RKUTWNdMv7&limit=10&rating=pg-13";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var $display = $("#gifDisplay");
            var dataArray = response.data;
            var gifCounter = -1;
            // have the gif results overwrite the previous results
            $display.empty();
            for (j = 0; j < dataArray.length; j++) {
                // increase gifCounter by 1 
                gifCounter++;
                var dataNum = dataArray[j];
                var $newGifDiv = $("<div class='col'></div>");
                var staticURL = dataNum.images.fixed_height_still.url;
                var $staticGif = $("<img />").attr("src", staticURL);
                $staticGif.addClass("spacing staticImg");
                $staticGif.attr("gif-count", gifCounter);
                // add the button's text as a variable to be used later
                //var staticId = $(this).attr("id");
                $newGifDiv.append($staticGif);
                // each gif should also display the rating underneath
                var gifRating = dataNum.rating;
                var $ratingDisplay = $("<p></p>").append("Rating: " + gifRating);
                $newGifDiv.append($ratingDisplay); 
                console.log(gifCounter);
                console.log(dataNum.images);
                //console.log(dataNum.images.fixed_height.url);
                $display.append($newGifDiv); 
            };

            // when a static gif is clicked, it moves
            $(document).on("click", ".staticImg", function() {
                var gifArray = response.data;
                var count = $(this).attr("gif-count");
                var specificGif = gifArray[count];
                var animatedURL = specificGif.images.fixed_height.url;
                //var $animatedGif = $(this).removeAttr("src");
                $(this).attr("src", animatedURL);
                $(this).removeClass("staticImg");
                $(this).addClass("animatedImg");
            });
            // when moving gif is clicked, it stops moving
            $(document).on("click", ".animatedImg", function() {
                var gifArray2 = response.data;
                var count2 = $(this).attr("gif-count");
                var specificGif2 = gifArray2[count2];
                var staticURL2 = specificGif2.images.fixed_height_still.url;
                $(this).attr("src", staticURL2);
                $(this).removeClass("animatedImg");
                $(this).addClass("staticImg");
            })

        });
    });


});
