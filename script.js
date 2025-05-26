const inputValue = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputPar = document.getElementById("output");
const outputContainer = document.querySelector(".output.container")
const downArrow = document.querySelector(".down-arrow")

function isIvalidNumber(input) {
  const regex = /[.e]/;
  const invalidChars = input.match(regex)

  if (input === "" || invalidChars) {
    outputPar.innerText = "Please enter a valid number";
    return true;
  } else if (input <= 0) {
    outputPar.innerText = "Please enter a number greater than or equal to 1";
    return true;
  } else if (input > 3999) {
    outputPar.innerText = "Please enter a number less than or equal to 3999";
    return true;
  } else {
    return false;
  }
}

// Main function
function arabicToRoman() {

  const integerInput = parseInt(inputValue.value);
  let convertedNumber;

  downArrow.classList.remove("hidden");
  outputContainer.classList.remove("hidden");

    // Checks for invalid input
  if (isIvalidNumber(inputValue.value)) {
    inputValue.value = "";
    return;
  };

  convertedNumber = converter(integerInput);

  outputPar.innerText = convertedNumber;
  
  inputValue.value = "";
}


function converter (input) {
  let times;
  let remainder;
  
  if (input === 1) {
    return "I";
  } else if (input === 4) {
    return "IV";
  } else if (input === 5) {
    return "V";
  } else if (input === 9) {
    return "IX";
  } else if (input === 10) {
    return "X";
  } else {
    if (input < 10) {
      return converter(input - 1) + "I";
    } else if (input > 10 && input < 40) {
      times = input / 10;
      remainder = input % 10;
      return "X".repeat(times) + converter(remainder);
    } else if (input < 50) {
      return "XL" + converter(input - 40);
    } else if (input < 90) {
      return "L" + converter(input - 50);
    } else if (input < 100) {
      return "XC" + converter(input - 90); 
    } else if (input < 400) {
      times = input / 100;
      remainder = input % 100;
      return "C".repeat(times) + converter(remainder);
    } else if (input < 500) {
      return "CD" + converter(input - 400);
    } else if (input < 900) {
      return "D" + converter(input - 500);
    } else if (input < 1000) {
      return "CM" + converter(input - 900);
    } else {
      times = input / 1000;
      remainder = input % 1000;
      return "M".repeat(times) + converter(remainder);
    }
  }
}

downArrow.classList.add("hidden");
outputContainer.classList.add("hidden");

convertBtn.addEventListener("click", arabicToRoman)

inputValue.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    arabicToRoman();
  }
})