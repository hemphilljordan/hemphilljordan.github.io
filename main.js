console.log('hey')

//my api key:  aj6WRBMoV6vJDyiw2dEIGQ==RnlCqvbzOrPkpq2R


document.querySelector('button').addEventListener('click', getFetch)

document.getElementById('try-btn').addEventListener('click', getFetch)

//document.getElementById('click').addEventListener('click', dimensions)

const container = document.querySelector('.inner-container');

function dimensions() {
  const containerHeight = container.offsetHeight;
  if (containerHeight > 170){
    document.querySelector('.container').style.height = 'auto'}
  }
window.addEventListener('load', dimensions);




function getFetch(){

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then(res => res.json())
  .then(data => {
    const drinkPic = data.drinks[0].strDrinkThumb
    const drinkName = data.drinks[0].strDrink
    const drinkInstructions = data.drinks[0].strInstructions
    document.getElementById('drink-pic').src = drinkPic
    document.querySelector('h2').textContent = drinkName
    document.getElementById('drink-pic').style.display = 'block'
    document.querySelector('button').style.display = 'none'
    document.getElementById('recipe').textContent = drinkInstructions
    document.querySelector('.inner-container').style.display = 'grid'
    document.getElementById('try-btn').style.display = 'block'
    dimensions();
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}





