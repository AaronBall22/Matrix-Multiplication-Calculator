const errorMessage = document.querySelector(".error-message");
const matrixInputContent = document.querySelectorAll(".matrix-input-content");
const resultingMatrixBorder = document.querySelector(".resulting-matrix");
const setMatrices = document.getElementById("set-matrices");
let matrixAValues = [];
let matrixBValues = [];
let matrixCValues = [];

const getMatrixBorder = (border) => {
  return document.querySelector(`.matrix${border}-border`);
};

// Used for styling new input boxes based on user input
const styleInputBox = (div, input, inputClass) => {
  div.style.padding = "5px";
  div.style.border = "1px #9966cc solid";
  div.style.marginLeft = "3px";
  input.style.width = "35px";
  input.style.height = "25px";
  input.style.padding = "3px";
  input.style.margin = "auto";
  input.setAttribute("type", "number");
  input.classList.add(`userInput${inputClass}`);
};

const make2DArray = function (rows, columns) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr.push(new Array(columns));
  }
  return arr;
};

const fill2DArray = function (array, inputClass) {
  const userInput = document.querySelectorAll(`.userInput${inputClass}`);
  let counter = 0;

  for (let i = 0; i < array.length; i++)
    for (let j = 0; j < array[0].length; j++) {
      array[i][j] = Number(userInput[counter].value);
      counter++;
    }
  return array;
};
// ADDING FUNCTIONALITY TO SET MATRICES BUTTON
setMatrices.addEventListener("click", function () {
  const matrixAInput = [
    // returning the values that the user input for the MatrixA rows and columns
    Number(document.querySelector(".matrixa-row").value),
    Number(document.querySelector(".matrixa-column").value),
  ];
  const matrixBInput = [
    // returning the values that the user input for the MatrixB rows and columns
    Number(document.querySelector(".matrixb-row").value),
    Number(document.querySelector(".matrixb-column").value),
  ];

  // Have program reset depending on the input from the user
  if (
    matrixAInput[0] <= 0 ||
    matrixAInput[0] >= 9 ||
    matrixAInput[1] <= 0 ||
    matrixAInput[1] >= 9
  ) {
    setMatrices.disabled = false;
    for (let i = 0; i < matrixInputContent.length; i++)
      matrixInputContent[i].reset(); // clears all values of form elements

    return; // running all previous code and then exiting the function
  } else if (
    matrixBInput[0] <= 0 ||
    matrixBInput[0] >= 9 ||
    matrixBInput[1] <= 0 ||
    matrixBInput[1] >= 9
  ) {
    setMatrices.disabled = false;
    for (let i = 0; i < matrixInputContent.length; i++)
      matrixInputContent[i].reset();

    return;
  }

  matrixAValues = make2DArray(matrixAInput[0], matrixAInput[1]);
  matrixBValues = make2DArray(matrixBInput[0], matrixBInput[1]);
  matrixCValues = make2DArray(matrixAInput[0], matrixBInput[1]);

  const displayInputDimensions = (matrix, border) => {
    for (let i = 0; i < matrix[0]; i++) {
      for (let j = 0; j < matrix[1]; j++) {
        const div = document.createElement("div");
        const input = document.createElement("input");
        styleInputBox(div, input, border);
        getMatrixBorder(border).appendChild(div).appendChild(input);

        div.style.display = "inline";
        if (j === matrix[1] - 1) {
          div.appendChild(document.createElement("br"));
        }
      }
    }
  };
  // check if columns of Matrix A === rows of Matrix B
  if (matrixAInput[1] === matrixBInput[0]) {
    // true: display input dimensions to the screen
    errorMessage.style.display = "none";
    getMatrixBorder("a").style.display = "block";
    getMatrixBorder("b").style.display = "block";
    displayInputDimensions(matrixAInput, "a");
    displayInputDimensions(matrixBInput, "b");
  } else {
    // false: display message to screen and reset input values
    for (let i = 0; i < matrixInputContent.length; i++) {
      // iterating through NodeList to reset input elements in each form
      matrixInputContent[i].reset();
    }
    errorMessage.style.display = "block";
    getMatrixBorder("a").style.display = "none";
    getMatrixBorder("b").style.display = "none";
  }
});

// FUNCTIONALITY FOR CALCULATE BUTTON
document.getElementById("Calculate").addEventListener("click", function () {
  matrixAValues = fill2DArray(matrixAValues, "a");
  matrixBValues = fill2DArray(matrixBValues, "b");

  for (let i = 0; i < matrixAValues.length; i++)
    for (let j = 0; j < matrixBValues[0].length; j++) {
      matrixCValues[i][j] = 0;
      for (let k = 0; k < matrixBValues.length; k++) {
        matrixCValues[i][j] += matrixAValues[i][k] * matrixBValues[k][j];
      }
    }

  for (let i = 0; i < matrixCValues.length; i++)
    for (let j = 0; j < matrixCValues[0].length; j++) {
      const div = document.createElement("div");
      const value = document.createTextNode(matrixCValues[i][j]);
      div.classList.add("matrix-outputs");
      resultingMatrixBorder.style.gridTemplateColumns = `repeat(${matrixCValues[0].length}, auto)`; // creates columns for grid
      resultingMatrixBorder.style.gridTemplateRows = `repeat(${matrixCValues.length}, auto)`; // creates rows for grid
      div.appendChild(value);
      resultingMatrixBorder.appendChild(div);
    }

  document.getElementById("result").style.display = "block";
  document.querySelector(".resulting-matrix").style.display = "grid";
});
