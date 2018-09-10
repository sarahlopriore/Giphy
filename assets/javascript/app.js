$(document).ready(function() {

    // create vraiables
    var topics = ["avocado", "apple", "sweet potato", "bell pepper", "pineapple", "mango", "onion", "broccoli", "watermelon", "corn", "kiwi", "blueberry", "celery"]

    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics[i] + "&api_key=mMR97LCZTFVnxouA2wyRM7RKUTWNdMv7&limit=10&rating=g";



    // on page load create buttons for all items in the topics array
    // loop through the topics array to create each button
    for (i = 0; i < topics.length; i++) {
        var $newButton = $("<button class='btn btn-success btn-space'></button>").append(topics[i]);
        $("#buttons").append($newButton);
    }

    // for each button click, run an ajax request to the giphy api to get 10 search results for that topic
    // each gif should also display the rating underneath
    // results are displayed as static gifs
    // have the gif results overwrite the previous results

    // when a static gif is clicked, it moves
    // when moving gif is clicked, it stops moving



    // when user adds an topic through the newButtonInput, it is added to the topics array
    // this then creates a new button for that new topic
    // this new button will function the same as the others


})
