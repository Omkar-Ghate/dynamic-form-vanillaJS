import "./styles.css";
const btn = document.querySelector("#addBtn");
const inputList = document.querySelector(".input-list");
var labelName = "";
btn.addEventListener("click", handleClick);
var count = 1;
function handleClick(e) {
  if (count <= 6) {
    //creating new div with class: input-item
    labelName = prompt("Enter the label name");
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input-item");
    //inner div with class: input-text, to hold the input tag
    const newItem = document.createElement("div");
    newItem.innerHTML = `
  <label html-for="name">${labelName}</label>
  <input id="name" type="text" placeholder="Enter your name"> </input>
  `;

    newItem.classList.add("input-text");
    inputDiv.appendChild(newItem);

    //attach final input element to previous div
    inputList.appendChild(inputDiv);
  }
  count++;
}
