const searchBtn = document.getElementById('search-btn');
const drinkList = document.getElementById('drinks');
const drinkDetailContent = document.querySelector('.drink-content');
const drinkCloseBtn = document.getElementById('drink-close-btn');

//Event Listeners
searchBtn.addEventListener('click', getDrinkList);
drinkList.addEventListener('click', getDrinkInstructions)
drinkCloseBtn.addEventListener('click', () => {
    drinkDetailContent.parentElement.classList.remove('showDrinkDetails')
})


//Drink List Function
function getDrinkList () {
    const ingredient = document.querySelector('input').value.toLowerCase();

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then (res => res.json())
        .then (data => {
            console.log(data)
            let html = "";
            if(data.drinks){
                data.drinks.forEach(drink => {
                    html += `
            <div class="col-12 col-md-6 col-lg-4" data-id = "${drink.idDrink}">
              <div class="card drink-item w-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="drink">
                <div class="card-body">
                  <h5 class="card-title drink-name">${drink.strDrink}</h5>
                  <a href="#" class="btn drink-btn">Make this Drink!</a>
                </div>
              </div>
            </div>
            `;
                });
            }

            drinkList.innerHTML = html;
        })
        .catch(err => {
            console.log(`Error ${err}`)
        })
}

//Drink Insructions
function getDrinkInstructions (e) {
    e.preventDefault();
    if(e.target.classList.contains('drink-btn')) {
        let drinkItem = e.target.parentElement.parentElement.parentElement;

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`)
            .then (res => res.json())
            .then (data => drinkInstructionModal(data.drinks))

    }
}

//Modal creation
function drinkInstructionModal(drink) {
    console.log(drink)
    drink = drink[0];

    let html = `
      <h2 class="drink-title">${drink.strDrink}</h2>
        <div class="drink-instructions">
            <h3>Instructions:</h3>
            <p>${drink.strInstructions}</p>
        </div>
        <div class="drink-img">
            <img src="${drink.strDrinkThumb}" alt="drink">
        </div>
  `;

    drinkDetailContent.innerHTML = html;
    drinkDetailContent.parentElement.classList.add('showDrinkDetails')
}