console.log('hey dawg')



  
 let input = document.getElementById('input-box');
 let button = document.getElementById('submit-button');
 let showContainer = document.getElementById('show-container');
 let listContainer = document.getElementById('list');


 let input2 = document.getElementById('input-box2');
 let button2 = document.getElementById('submit-button2');
 let showContainer2 = document.getElementById('show-container2');
 let listContainer2 = document.getElementById('list2');

 let playerOne = ''
 let playerTwo = ''
 let playersToBattle = []





 let date = new Date();
 console.log(`This is my time stampe: ${date.getTime()}`);

 const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];




function displayWords(value){
  if (listContainer.textContent.length > 0){
  input.value = value;
  getRsult(input, showContainer);
  playersToBattle.push(input.value)
  input.value = ''
  selectedIndex = -1;
  removeElements(listContainer);
 } else if (listContainer2.textContent.length > 0) {
  input2.value = value;
  getRsult(input2, showContainer2);
  playersToBattle.push(input2.value)
  input2.value = ''
  selectedIndex = -1;
  removeElements(listContainer2);
 }
}
 function removeElements(thisContainer){
  thisContainer.innerHTML = "";
}


 
 const dropMenu = async(e, input, showContainer, listContainer) => {

  removeElements(listContainer);
  if(input.value.length < 2){
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();



  jsonData.data["results"].forEach((result, i) => {
    if (result.comics.available > 50 && result.thumbnail["path"].includes('image_not_available') === false){
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer"
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);




    input.addEventListener('blur', () => {
      setTimeout(() => {
        div.style.display = 'none';
      }, 200); // Delay the hide to allow clicking on options
    });
  }
  })
  
  let options = listContainer.children
  let selectedIndex = -1;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      console.log('Arrow Down Bitches!')
       // Remove previous selection
    if (selectedIndex >= 0) {
      options[selectedIndex].classList.remove('selected');
      options[selectedIndex].classList.remove('auto-keydown');
    }

    selectedIndex = Math.min(selectedIndex + 1, options.length - 1);

    // Highlight the selected option
    options[selectedIndex].classList.add('selected');
    options[selectedIndex].classList.add('auto-keydown')
    // Set the input value to the selected option
    input.value = options[selectedIndex].textContent;
  } else if (e.key === 'ArrowUp') {
    // Handle up arrow key
    e.preventDefault(); // Prevent page scrolling

    // Remove previous selection
    if (selectedIndex >= 0) {
      options[selectedIndex].classList.remove('selected');
      options[selectedIndex].classList.remove('auto-keydown');
    }
    selectedIndex = Math.max(selectedIndex - 1, -1);

    // Highlight the selected option
    if (selectedIndex >= 0) {
      options[selectedIndex].classList.add('selected');
      options[selectedIndex].classList.add('auto-keydown');
      // Set the input value to the selected option
      input.value = options[selectedIndex].textContent;
    }
  } else if (e.key === 'Enter' && input.value.length > 1) {
    // Handle Enter key (select the option)
      input.value = options[selectedIndex].textContent;
      displayWords(input.value);
  }
});
 }

 

document.addEventListener('keydown', function (e) {
  if (e.key === 'Tab') {
    input2.focus();
    e.preventDefault();
  }
})




input.addEventListener("input", (e) => dropMenu(e, input, showContainer, listContainer))

input2.addEventListener("input", (e) => dropMenu(e, input2, showContainer2, listContainer2))

  
  async function getRsult(input, showContainer) {
  if(input.value.trim().length < 1) {
    console.log("Input cannot be blank");
  }
  showContainer.innerHTML = "";
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();
  jsonData.data["results"].forEach((element) => {
    showContainer.innerHTML = `<div
    class="card-container">
    <div class="container-character-image">
    <img src="${
      element.thumbnail["path"] + "." + element.thumbnail["extension"]
    }"/></div>
    <div class="character-name">${element.name}</div>
    </div>`;
  });
  input.value = ''
 }
window.onload = () => {
  getRsult();
};



  const battleButton = document.getElementById('battle-btn');



  battleButton.addEventListener("click", async() => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${playersToBattle[0]}`;
    const url2 = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${playersToBattle[1]}`;
  
    const response = await fetch(url);
    const jsonData = await response.json();
    const response2 = await fetch(url2);
    const jsonData2 = await response2.json();
    const playerOneScore = jsonData.data.results[0].comics.available
    const playerTwoScore = jsonData2.data.results[0].comics.available
    const playerOneName = jsonData.data.results[0].name
    const playerTwoName = jsonData2.data.results[0].name
    const element = jsonData.data.results[0]
    const element2 = jsonData2.data.results[0]
  
    if (playerOneScore > playerTwoScore) {
      document.getElementById('results').innerHTML = `
      <div>${playerOneName} beats ${playerTwoName}: </div> 
      <div>${playerOneScore} - ${playerTwoScore}</div> `
      document.getElementById('result-pic').innerHTML = `<div><img src="${
        element.thumbnail["path"] + "." + element.thumbnail["extension"]
      }" id="winner-pic" ></div>`
    }else {
      document.getElementById('results').innerHTML = `
      <div>${playerTwoName} beats ${playerOneName}: </div>
      <div>${playerTwoScore} - ${playerOneScore}</div>`
      document.getElementById('result-pic').innerHTML = `<div><img src="${
        element2.thumbnail["path"] + "." + element2.thumbnail["extension"]
      }" id="winner-pic" ></div>`
    }
    playersToBattle = [];
   })

   battleButton.addEventListener('mouseover', () => {
   battleButton.style.backgroundColor = '#ff9900';
   battleButton.style.color = '#ffffff'
   });

   battleButton.addEventListener('mouseout', () => {
    battleButton.style.backgroundColor = 'yellow'
    battleButton.style.color = 'black'
   })

  
 





   

