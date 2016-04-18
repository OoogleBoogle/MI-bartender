// Prompt user whether they want drinks or food, based on prompt we run
// function that would build either bartender questions or chef questions

//Build drink or burger based off user selections
    //Drinks and burgers are built off constructor method
        //Ingredients for burgers and drinks are built off objects
        

// Objects needed

var StaffMember = function(questions) {
    this.currentQuestionIndex = 0;
    this.questions = questions;
}

StaffMember.prototype.askQuestion = function() {
    return this.questions[this.currentQuestionIndex];
}

StaffMember.prototype.completeOrder = function(orderedItem) {
    var response = "Arrrh! Then you'll be wanting the " + orderedItem.name + "! ";
    response += this.buildIngredientText(orderedItem);
    return response;
}

StaffMember.prototype.buildIngredientText = function(item) {
    var HTML = "";
    for (var i = 0; i < item.ingredients.length; i++) {
        if (i === 0) {
            HTML += "Made o' the finest ";
        } else if (i === item.ingredients.length - 1) {
            HTML += "...an a splash of " + item.ingredients[i] + " o'course!";
            break;
        }
        HTML += item.ingredients[i] + ", ";
    }
    return HTML;
}


// BUILD CUSTOM DRINK

function buildCustomDrink(option) {
    var text;
    switch (option) {
        case "Rum":
            text = "Piraty";
            break;
        case "Kerosene":
            text = "Hot Fuel";
            break;
        case "Axle Grease":
            text = "Slippery"
            break;
        case "Nitrous Oxide":
            text = "Booster";
            break;
        case "Pepperoni":
            text = "Spicealot";
            break;
        case "Red Dye #2":
            text = "Blood";
            break;
        default:
            // do something
            
    }
    return text;
}

var bartender = new StaffMember(
[
    // consider maybe these questions are random and seemingly unrelated
    "Rrrr ye looking fir somethin' strong?", // eg. could be "What's you're fave movie: Rocky or The Notebook" Rocky === Strong
    "Rrrr ye looking fir somethin' salty?",  
    "Rrrr ye looking fir somethin' spicy?",
    "Rrrr ye looking fir somethin' fruity?"
]);


// ref points (Must be string)
// strong === "1000"
// salty === "0100"
// fruity  === "0010"
// spicy === "0001"

// therefore strong and fruity would be "1010"
// strong + spicy === "0101"


// BUILDS FIXED DRINK MENU
var fixedDrinkMenu = [{
    name: "Grogulator",
    ingredients: ["Rum", "Kerosene", "Axle Grease", "Tonic"],
    type: '1111'
},
{
    name: "Diet Grog",
    ingredients: ["Rum", "Acetone", "Cactus Extract", "Diet Coke&trade;"],
    type: '0111'
},
{
    name: "Grog Turbo",
    ingredients: ["Rum", "Ghost Peppers", "Pepperoni", "Nitrous Oxide"],
    type: "1000"
},
{
    name: "Grog",
    ingredients: ["Rum", "Red Dye #2", "Aftershave", "Hydrogenated starch hydrolysate"],
    type: "0011"
}];


$(function() {
    $(".pirateMenuIntro").on("click", "button", function() {
        if ($(this).text() === "Grog") {
            $("#drinkSection").slideDown();  
            $("#foodSection").slideUp();
        } else if ($(this).text() === "Slog") {
            $("#foodSection").slideDown();  
            $("#drinkSection").slideUp();
        }
    })


    $('#setDrinkOptions').on('click', 'li', function(){
        var attr = $(this).data('type');
        console.log(attr);
        for (var i = 0; i < fixedDrinkMenu.length; i++) {
            if (fixedDrinkMenu[i].type === attr) {
                $('.drinkDescription').text(fixedDrinkMenu[i].name);
            }
        }
    })
 
    $('#customDrinkOrder').on('submit', function(event) {
        event.preventDefault();
        var option1 = $('input[name="col-1"]:checked').val();
        var option2 = $('input[name="col-2"]:checked').val();
        var option3 = $('input[name="col-3"]:checked').val();
        var text = buildCustomDrink(option1);
        text += " " + buildCustomDrink(option2);
        text += " " + buildCustomDrink(option3);
        $('.drinkDescription').text(text);
    })
})

