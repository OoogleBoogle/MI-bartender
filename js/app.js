// Prompt user whether they want drinks or food, based on prompt we run
// function that would build either bartender questions or chef questions

//Build drink or burger based off user selections
    //Drinks and burgers are built off constructor method
        //Ingredients for burgers and drinks are built off objects
        

// Generic StaffMember Object for expansion

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
            HTML += "...an a splash of " + item.ingredients[i] + "!";
            break;
        }
        HTML += item.ingredients[i] + ", ";
    }
    return HTML;
}

var drinks =  {
    // drink menu code ref points (Must be string)
    // strong === "1000"
    // salty === "0100"
    // fruity  === "0010"
    // spicy === "0001"
    
    // therefore strong and fruity would be "1010"
    // strong + spicy === "0101"
    fixedDrinkMenu: [{
        name: "Grog Turbo",
        ingredients: ["Rum", "Ghost Peppers", "Pepperoni", "Nitrous Oxide"],
        type: "1111"
    },
    {
        name: "Kracken",
        ingredients: ["Ground Octopus Beak", "Pizza", "Sea Water", "Squid Ink"],
        type: "0111"
    },
    {
        name: "Cherry Grog",
        ingredients: ["Rum", "Red Dye #2", "Bath Scumm", "Reconstituted Cherry Extract"],
        type: "1011"
    },
    {
        name: "Grogulator",
        ingredients: ["Rum", "Kerosene", "Axle Grease", "Tonic"],
        type: '1101'
    },
    {
        name: "Near Grog",
        ingredients: ["Rum", "Red Dye #2", "Sulfuric Acid", "Hydrogenated starch hydrolysate"],
        type: "1110"
        
    },
    {
        name: "Grog Lite",
        ingredients: ["Rum", "Bread", "Old Battery Acid", "My Dandruff"],
        type: "0011"
    },
    {
        
        name: "Caffeine Free Grog",
        ingredients: ["Rum", "Palm Oil", "Acetone", "Paaaamplemoose"],
        type: "0101"
    },
    {
        name: "Diet Grog",
        ingredients: ["Rum", "Acetone", "Cactus Extract", "Diet Coke&trade;"],
        type: '0110'
    },
    {
        name: "Eau De Toilette",
        ingredients: ["Spit", "Dog Hair", "Lint", "Toilet Water"],
        type: "0000"
    }],
    drinkCode: "", // drink code is built from user options (see choice button manager at the end of the file)
    findDrink: function(code) {
        // loop through to find a drink 'type' that matches
        for (var i = 0; i < this.fixedDrinkMenu.length; i++) {
            if (this.fixedDrinkMenu[i].type === code) {
                return this.fixedDrinkMenu[i];
            } 
        }
        // if there's no match send back the rubbish option at the end of the drink menu array
        return this.fixedDrinkMenu[this.fixedDrinkMenu.length - 1];
    }
}



// create bartender StaffMember with his into (hello) statement and questions.
var bartender = new StaffMember({
    intro: "So it be a drink you're after?",
    questionsArray: [
    "Which be your favourite movie?",
    "Ave ye read any good books lately?",  
    "Halloween or Chrismas?",
    "What be the best way to clean a mirror?"
    ],
});

var reset = function() {
    drinks.drinkCode = "";
    $('#yourOrder').html("");
}


$(function() {
    $(".pirateMenuIntro").on("click", "button", function() {
        $('.pirateMenuIntro h1').slideUp(); // slide up for space saving in the window
        reset();
        if ($(this).text() === "Grog") {
            $("#foodSection").slideUp();
            $("#drinkSection").slideDown('fast', function() {
                $('.introduction').text(bartender.intro);
                var i = 0;
                $('.drinkQuestion').each(function() { //loop through bartender q's and put in place in html
                    $(this).text(bartender.questions[i]);
                    i++;
                });
                $(this).children().next().first().slideDown(); // slide down first Q
            });
        } else if ($(this).text() === "Slog") { // not yet implemented
            $("#drinkSection, .questionGroup").slideUp();
            $("#foodSection").slideDown();  
            
        }
    });
    // choice button manager
    $('.questionGroup').on('click', 'input', function() {
        var value = $(this).data('piratescore'); // cache pirate score data attribute in a 'value' var
        if (value === 1) {
            drinks.drinkCode += "1";
        } else {
            drinks.drinkCode += "0";
        }
        if ($(this).parent().next().hasClass('questionGroup')) {     // provided there's another Q
            $(this).parent().slideUp().next().slideDown();
        } else {
            $(this).parent().slideUp();                                // otherwise...
            var selection = drinks.findDrink(drinks.drinkCode);        // find the drink in the drinks list
            var text = bartender.completeOrder(selection);             // send drink to complete order proto
            $('#yourOrder').append($('<h1>').text(text)).slideDown();  // append the text to the order view section and slide down
        }
    });
});

