// Prompt user whether they want drinks or food, based on prompt we run
// function that would build either bartender questions or chef questions

//Build drink or burger based off user selections
    //Drinks and burgers are built off constructor method
        //Ingredients for burgers and drinks are built off objects
        

// Objects needed

// var StaffMember(questions) = {
//     this.questions = questions;
// }

// StaffMember.prototype.askQuestion() {
    
// }


// var Bartender = {
//     // selection of ingerr
//     .call(Staff, this.BartenderQuestions.bind(this))
// }



// var Chef = {

// }

// joe = new bartender
// harry = new Chef


// harry.askQuestion()
// joe.askQuestion()



// var Bartender {
//     allQuestions: [{
//         question: "Salty"
//     },
//     {
//         question: "Strong"
//     }]
// }
// var z = 0;
// var ingredientSelection: drinkMenu[z].ingredients[z]
// var typeSelection: drinkMenu[z].type[z]

/*
for (i = 0, i < drinkMenu.length)
*/

function buildIngredientHTML(drink) {
    var HTML = "";
    for (var i = 0; i < drink.ingredients.length; i++) {
        HTML += drink.ingredients[i] + " ";
    }
    return HTML;
}

/*

fruity = ['pineapple', 'strawberry', 'apple']
sour = ['salt', ]
input
when input == Rum
    name: "Piraty"
when input == kerosene
    name: "burner"
if user input value = strong ....
else remove Grogulator from available selections
*/

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
            // return part of a name + ingredient choice
            text = "Slippery"
            break;
        case "Nitrous Oxide":
            text = "Booster";
            break;
        default:
            // do something
            
    }
    return text;
}

var fixedDrinkMenu = [{
    name: "Grogulator",
    ingredients: ["Rum", "Kerosene", "Axle Grease", "Tonic"],
    type: "Strong"
},
{
    name: "Diet Grog",
    ingredients: ["Rum", "Diet Coke", "Cactus Extract", "Acetone"],
    type: "Salty"
},
{
    name: "Grog Turbo",
    ingredients: ["Rum", "Nitrous Oxide", "Pepperoni", "Ghost Pepper"],
    type: "Spicy"
},
{
    name: "Grog",
    ingredients: ["Rum", "Red Dye #2", "Aftershave", "Artificial Sweeteners"],
    type: "Fruity"
}];



/*
var chosenDrink = function (object) {
    this.ingredients = object.ingredients;
    this.nameOfDrink = object.name;
    this.tag = tags;
}

var servedDrink = new chosenDrink({
    name: "Grog",
    ingerg: "Nitrous"
})


*/

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
    
        var text = buildCustomDrink(option1);
        text += " " + buildCustomDrink(option2);
        $('.drinkDescription').text(text);
    })
 
})

