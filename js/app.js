// Prompt user whether they want drinks or food, based on prompt we run
// function that would build either bartender questions or chef questions

//Build drink or burger based off user selections
    //Drinks and burgers are built off constructor method
        //Ingredients for burgers and drinks are built off objects
        

// Objects needed

var StaffMember = function(obj) {
    this.intro = obj.intro;
    this.questions = obj.questionsArray;
    this.currentQuestionIndex = 0;
    
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

var findDrink = function(code) {
    for (var i = 0; i < fixedDrinkMenu.length; i++) {
        if (fixedDrinkMenu[i].type === code) {
            return fixedDrinkMenu[i];
        }
    }
}

var bartender = new StaffMember({
    intro: "So it be a drink you're after?",
    questionsArray: [// consider maybe these questions are random and seemingly unrelated
    "Rrrr ye looking fir somethin' strong?", // eg. could be "What's you're fave movie: Rocky or The Notebook" Rocky === Strong
    "Rrrr ye looking fir somethin' salty?",  
    "Rrrr ye looking fir somethin' spicy?",
    "Rrrr ye looking fir somethin' fruity?"
    ],
});


$(function() {
    $(".pirateMenuIntro").on("click", "button", function() {
        if ($(this).text() === "Grog") {
            $("#foodSection").slideUp();
            $("#drinkSection").slideDown('fast', function() {
                var i = 0;
                $('.drinkQuestion').each(function() {
                    $(this).text(bartender.questions[i]);
                    i++;
                });
                $(this).children().next().first().slideDown();
            });  
            
        } else if ($(this).text() === "Slog") {
            $("#foodSection").slideDown();  
            $("#drinkSection").slideUp();
        }
    });
    // choice button manager
    var itemCode = "";
    $('.questionGroup').on('click', 'input', function() {
        var value = this.value;
        if (value === 'yes') {
            itemCode += "1";
        } else {
            itemCode += "0";
        }
        if ($(this).parent().next().hasClass('questionGroup')) {
            $(this).parent().slideUp().next().slideDown();
        } else {
            $(this).parent().slideUp();
            var selection = findDrink(itemCode);
            var text = bartender.completeOrder(selection);
            $('#yourOrder').append($('<h1>').text(text)).slideDown();
        }
    });
});

