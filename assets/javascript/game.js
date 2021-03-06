//create an array of words
var wordArray = ["carrot","onion","potato","pepper","cucumber","broccoli","tomato","lettuce", "asparagus", "cauliflower", "spinach", "kale", "cabbage", "zucchini", "eggplant"];
//a variable to hold a random number times the length of the array
var randomVeg = [];
//this array holds the guess
var guessArray = [];
var lettersGuessed = [];
//holds the number of guesses
var guessCount = 8;
var gamesWon = 0;
var gamesLost = 0;

//start program takes the random word selected by randomVeg
//and inserts into the guess array underscores for each letter and joins a space between
//each letter
function startProgram(){
    randomVeg = wordArray[Math.floor(Math.random() * wordArray.length)];
    for (var i = 0; i < randomVeg.length; i++){
        guessArray[i] = "_";

    }
    document.getElementById("answer").innerHTML = guessArray.join(" ");
}

function userPress(event){
    var oneRight = false;
    //converts the character code of the key press into a string, and then convert
    //to lowercase to make sure standardized
    var charPressed = String.fromCharCode(event.originalEvent.keyCode).toLowerCase();
    //console.log(charPressed);
    //check if letters guessed doesnt include the key pressed, if so push it so not
    //punished for guessing the same letter twice
    if (!lettersGuessed.includes(charPressed)){
        lettersGuessed.push(charPressed);
        //console.log(lettersGuessed);
        document.getElementById("lettersUsed").innerHTML = lettersGuessed.join(" ");
        //run through the length of word in randomVeg, and check if key pressed is in
        //it. if so set that position in the guess array with the actual letter
        //change one right to true
        for (var i = 0; i < randomVeg.length; i++){
            if (charPressed === randomVeg[i]){
                guessArray[i] = charPressed;
                oneRight = true;
            } 
        }
        //if one right is true from the prior for loop, push the guess array again to
        //the answer id in html, otherwise lower guess count and push that to html
        if (oneRight){
            document.getElementById("answer").innerHTML = guessArray.join(" ");
        }
        else{
           guessCount--;
           document.getElementById("chances").innerHTML = guessCount;
        }
        if (!guessArray.includes("_")){
            console.log(guessArray);
            guessCount=8;
            guessArray=[]
            lettersGuessed = [];
            gamesWon++;
            document.getElementById("lettersUsed").innerHTML = lettersGuessed.join(" ");
            document.getElementById("chances").innerHTML = guessCount;
            document.getElementById("won").innerHTML = gamesWon;
            document.getElementById("msg").innerHTML = ("Great Job, you won your last game!");
            startProgram();
            
        }
        if (guessCount === 0){
            guessCount=8;
            guessArray = [];
            lettersGuessed = [];
            gamesLost++;
            document.getElementById("lettersUsed").innerHTML = lettersGuessed.join(" ");
            document.getElementById("chances").innerHTML = guessCount;
            document.getElementById("lost").innerHTML = gamesLost;
            document.getElementById("msg").innerHTML = ("You lost your last game, better luck this time!");
            startProgram();
        }
    }
    
}
//calls to the functions. start program runs when the page has loaded, and userPress
//runs every time a key is pressed in the html.
$(document).ready(function(){
    startProgram();
    $(document).on("keypress",userPress);

})
