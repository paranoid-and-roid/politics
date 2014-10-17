$.getJSON("constituencies.js", playGame);

//THE FIRST PART OF THE FILE IS CONCERNED WITH THE GAME

var score = 0;
var seconds = 20;

var playGame = function() {
    //The game begins with the appearance on the page of the central panel, which contains the image and the select boxes
       
    $("#sidebar img").slideUp();
    $("#intro").slideUp(); 
    $("#scores").css("visibility", "visible");
    $("#center").slideUp();
    var counter=setInterval(timer, 1000);

    function timer() {
        //Once the button is pressed, the 60-second countdown begins, and the clock appears on the right side.
        
        seconds=seconds-1;
        if (seconds <= 0){
            clearInterval(counter);
            var name = prompt("Please enter your name", " "); //The game ends with the appearance of a prompt box.
            
            $("#center").slideUp();
            $("#scoreTable").slideUp(); //The details of the game appear in a table which drops down.
            
            localStorage.name = name;
            localStorage.score = score;

            //Below are the details contained in the score table.
            var currentDate = new Date();
            var dateTime = currentDate.getDate() + "-"
                + (currentDate.getMonth()+1)  + "-"
                + currentDate.getFullYear() + " at "
                + currentDate.getHours() + "."
                + currentDate.getMinutes();

            var scoringTable = document.getElementById("scoreTable");
            scoreRow = document.createElement("tr");
            var newRow = scoringTable.appendChild(scoreRow);
            newRow.innerHTML += "<td>"+""+"</td><td>"+localStorage.name+"</td><td>"+localStorage.score+"</td><td>"+dateTime+"</td>";
            $("#keepScore").empty();
            $("#countDown").empty();
            return;
        }
        $("#countDown").html(seconds);
    }

    var num1, num2;
    //Randomly generate two numbers
    var chooseRandom = function() {
        num1 = Math.floor(Math.random()*(data.constituencies.length));
        num2 = Math.floor(Math.random()*(data.constituencies[num1].details.length));
        //Find the image
        var aMugShot = document.getElementById("mugShot");
        var mug = aMugShot.setAttribute("src", (data.constituencies[num1].details[num2].image));

        $("#image").html(mug);
        $("#tdName").html(data.constituencies[num1].details[num2].tdName);
    }

    var d, e;
    //This function checks that the option selected from each menu matches the correct details for each TD.
    var choice = function() {
        var a = document.getElementById("parties").selectedIndex;
        var b = document.getElementById("cons").selectedIndex;
        c = document.getElementById("parties");
        d = document.getElementById("cons");
        e = c.getElementsByTagName("option")[a].text;
        f = d.getElementsByTagName("option")[b].text;
        //If the details are correct, the player scores points
        if(e == data.constituencies[num1].details[num2].party) {
            score = score + 10 + (seconds / 2);
        }
        if(f == data.constituencies[num1].constituency_name) {
            score = score + 10 + (seconds / 2);
        }
        $("#keepScore").html(score); //The points are stored here.
        
        $("#parties").val("Political Parties");
        $("#cons").val("Constituencies");

        chooseRandom();

    }
    chooseRandom();
    $("#submit").on("click", choice);
    //This is the end of the game
};

$("#click").on("click", playGame);

//THE SECOND PART OF THE FILE IS CONCERNED WITH THE DETAILS ON DISPLAY IN THE INDEX PAGE
//This section of code is concerned with creating new paragraphs in the sidebar, and placing the JSON data inside each one.
for(var i = 0; i < data.constituencies.length; i++) {
    var side = document.getElementById("list");
    var li = document.createElement("li");
    side.appendChild(li)
        .setAttribute("id", "listItem"+i);

    li.setAttribute("title", data.constituencies[i].constituency_name);
    li.innerHTML += data.constituencies[i].constituency_name;
}

//This is the function. Clicking on a constituency name will cause an iteration through each link...
$("#list li").each(function() {
    $(this).on("click", function() {
        $("#intro").slideUp();
        $("#main div").empty().remove();
        $("#main").slideUp();

        //...And this causes the page to display the relevent info on the page
        for(var i = 0; i < data.constituencies.length; i++) {
            for(var j = 0; j < data.constituencies[i].details.length; j++) {

                if(this.title == data.constituencies[i].constituency_name) {
                    document.getElementById("main").innerHTML += "<div id = 'inner"+j+"'><div class = 'image'><img src = " +data.constituencies[i].details[j].image + " alt = 'picture of " + data.constituencies[i].details[j].tdName + "' /></div>\
				<dt><strong>"+data.constituencies[i].details[j].tdName + "</strong></dt>\
				<dd><strong>Political Party: </strong>"+data.constituencies[i].details[j].party+"</dd>\
				<dd><strong>Votes Received on First Count: </strong>"+data.constituencies[i].details[j].firstCount+"</dd>\
				<dd><strong>Elected on: </strong>"+data.constituencies[i].details[j].whenElected+"</dd></dl></div>";
                    $("#main").slideUp();
                }
            }
        }
    });
});