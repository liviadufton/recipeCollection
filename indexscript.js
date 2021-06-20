//Recipe Submit

let quantityValues = ["none", "cups", "tablespoons", "teaspoons", "grams", "liters", "milliliters", "packets"];

function addIngredient() {
    newIngredient = document.createElement("li");    
    newIngredient.classList.add("ingredientFieldSet");
    document.getElementById("ingredientList").appendChild(newIngredient);
    
    //ingredient - quantity
    quantityDiv = document.createElement("div");
    quantityDiv.classList.add("ingredientQuantityField");
    newIngredient.appendChild(quantityDiv);

    quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.name = "quantity";
    quantityInput.classList.add("quantity");
    quantityInput.placeholder = "Qty";
    quantityDiv.appendChild(quantityInput);

    //ingredient - unit selection dropdown
    quantityUnitDiv = document.createElement("div");
    quantityUnitDiv.classList.add("ingredientUnitField");
    newIngredient.appendChild(quantityUnitDiv);

    quantitySelection = document.createElement("select");
    quantitySelection.name = "measurementUnit";
    quantitySelection.classList.add("measurementUnit");
    quantityUnitDiv.appendChild(quantitySelection);

    for (let i=0; i<quantityValues.length; i++) {

        quantityValue = document.createElement("Option");
        quantityValue.value = quantityValues[i]; 
        quantityValue.innerText = quantityValues[i];
        quantitySelection.appendChild(quantityValue);
    }

    //ingredient name
    ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("ingredientNameField");
    newIngredient.appendChild(ingredientDiv);

    ingredientField = document.createElement("input");
    ingredientField.type = "text";
    ingredientField.setAttribute("name", "ingredientName");
    ingredientField.classList.add("ingredientName");
    ingredientField.placeholder = "Ingredient";
    ingredientDiv.appendChild(ingredientField);
}

function addInstruction() {
    newInstruction = document.createElement("li");
    newInstruction.classList.add("instructionLi");
    newInstructionText = document.createElement("textarea");
    newInstructionText.classList.add("recipeStep");
    newInstructionText.setAttribute("name", "recipeStep");
    
    document.getElementById("instructionList").appendChild(newInstruction);
    newInstruction.appendChild(newInstructionText);
}

// const submitButton = document.getElementById("submit");

// if (submitButton) {
//     submitButton.addEventListener("click",() => {
//         alert("Your recipe was submitted")
//     });
// }

//API


document.getElementById("search_button").addEventListener("click", redirectPage);

document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      redirectPage();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const urlParms = new URLSearchParams(window.location.search);
    search = urlParms.get('q');
    if (search != null) {
        searchFunction(search);
    }
  });



function redirectPage(){
    const search = document.getElementById("search").value;
    window.location.href = 'search.html?q=' + search;
}

function searchFunction(search) {
    document.getElementById("searchText").innerText = "Showing recipe results for: " + search + ".";

    const searchTerm = escape(search);
    const apiUrl = `https://api.edamam.com/search?q=${searchTerm}&app_id=5e1aaba6&app_key=d648c6eb9cfb38785d3e45c7432878ee&to=12`;
    if (searchTerm.length == 0) {
        alert("Please enter a search term");
        return;
    }
        
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(apiUrl);
            const allRecipes = data.hits;
            const searchResults = document.getElementById("search_results");
            while (searchResults.firstChild) {
                searchResults.removeChild(searchResults.firstChild);
            }
            for (let i = 0; i < allRecipes.length; i++) {
                const card = createNewRecipeCard(allRecipes[i].recipe);
                searchResults.appendChild(card);
            }
      });
}
  
  
function createNewRecipeCard(oneRecipe) {
      const newRecipeCard = document.createElement("a");
      newRecipeCard.classList.add("card");
      newRecipeCard.href = oneRecipe.url;
      newRecipeCard.target = "_blank";
  
      const cardImage = createRecipeImage(oneRecipe.image);
      newRecipeCard.appendChild(cardImage);
      const cardWrapper = createRecipeWrapper(oneRecipe.label, oneRecipe.dietLabels.join(', '));	
      newRecipeCard.appendChild(cardWrapper);
      return newRecipeCard;
}
  
function createRecipeImage(image_src) {
      const cardImage = document.createElement("div");
      cardImage.classList.add("card_image");
  
      const recipeSearchPhoto = document.createElement("img");
      recipeSearchPhoto.src = image_src;
      cardImage.appendChild(recipeSearchPhoto);
      
      return cardImage;
}
  
function createRecipeWrapper(label, dietLabels) {
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("card_wrapper");
  
      const recipeInfo = document.createElement("div");
      cardWrapper.appendChild(recipeInfo);
  
      const recipeTitle = document.createElement("h4");
      recipeTitle.innerText = label;
      recipeInfo.appendChild(recipeTitle);
  
      const recipeTags = document.createElement("h6");
      recipeTags.innerText = dietLabels;
      recipeInfo.appendChild(recipeTags);
      
      return cardWrapper;
}
