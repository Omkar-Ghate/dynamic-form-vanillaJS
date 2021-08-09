import "./styles.css";
const textBtn = document.querySelector("#textBtn");
const imgBtn = document.querySelector("#imgBtn");
const inputList = document.querySelector(".input-list");
const dragText = document.querySelector("#header");
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const imgList = document.querySelector(".imgList");
const dropArea = document.querySelector(".drag-area");

var labelName = "";

textBtn.addEventListener("click", handleTextClick);
imgBtn.addEventListener("click", handleImgClick);

//Variables to store count of input text and images
var textInputCount = 1,
  imgInputCount = 1;
//boolean to check if addImg button is clicked
// var imgBtnClicked = false;
var file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
  input.click(); //if user click on the button then the input will also be clicked
};
input.addEventListener("change", function () {
  //getting user select file and [0] this means if user selects multiple files then we'll select only the first one

  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});
//If user Drags File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});
//If user leaves dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});
//If user drops File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one

  file = event.dataTransfer.files[0];
  showFile(); //calling function
});
function showFile() {
  let fileType = file.type; //getting selected file type
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  if (validExtensions.includes(fileType)) {
    //if user-selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
      let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

//Function to handle text input button click
function handleTextClick(e) {
  if (textInputCount <= 6) {
    //creating new div with class: input-item
    labelName = prompt("Enter the label name");
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input-item");
    //inner div with class: input-text, to hold the input tag
    const newItem = document.createElement("div");
    newItem.innerHTML = `
  <label html-for="name">${labelName}</label>
  <input id="name" type="text" placeholder="Type here"> </input>
  `;

    newItem.classList.add("input-text");
    inputDiv.appendChild(newItem);

    //attach final input element to previous div
    inputList.appendChild(inputDiv);
  }
  textInputCount++;
}

//Function to handle img button click
function handleImgClick() {
  var imgName = prompt("Enter the image heading");
  dropArea.style.visibility = "visible";
  if (imgInputCount <= 3) {
    const dragAreaDiv = document.createElement("div");
    dragAreaDiv.classList.add("drag-area");
    dragAreaDiv.innerHTML = `<h2>${imgName}</h2><div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
  <header>Drag & Drop to Upload File</header>
  <span>OR</span>
  <button>Browse File</button>
  <input type="file" hidden>`;
    imgList.appendChild(dragAreaDiv);
  }
  imgInputCount++;
}
