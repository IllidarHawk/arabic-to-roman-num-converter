// The connections
const numInput = document.getElementById("input-num");
const convertBtn = document.getElementById("convert-btn");
const output = document.querySelector(".output");
const downArrow = document.querySelector(".down-arrow");

// Checker fn: Input validity
function isValidNumber(input) {
	/// Unwanted chars: no decimals. no 'e' - numeracally valid input
	const regex = /[.e]/;
	const invalidChars = input.match(regex);

	/// If invalid
	if (invalidChars || input === "" || input <= 0 || input > 3999) {
		hideOutputElements();
		alert("Accepted range: integers 1 - 3999");
		return false;
	}

	// If not invalid
	return true;

}

// Helper fn: Converter
function converter(input) {
	let times;
	let remainder;

	/// Base case
	if (input == 0) {
		return "";
	}

	/// Recursions
	if (input == 1) {
		return "I";
	} else if (input == 4) {
		return "IV";
	} else if (input == 5) {
		return "V";
	} else if (input == 9) {
		return "IX";
	} else if (input == 10) {
		return "X";
	} else {
		if (input < 10) {
			return converter(input - 1) + "I";
		} else if (input >= 10 && input < 40) {
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

// Helper fn: Handle output elements
const hideOutputElements = () => {
	downArrow.classList.add("hidden");
	output.classList.add("hidden");
};

// Main function
function arabicToRoman() {
	const userInput = numInput.value;
	let convertedNumber;

	/// If invalid input end
	if (!isValidNumber(userInput)) {
		return;
	}

	/// Convert and output
	convertedNumber = converter(userInput);
	output.innerText = `'${userInput}' equals '${convertedNumber}'`;

	downArrow.classList.remove("hidden");
	output.classList.remove("hidden");

	userInput = "";
}

// Event listeners
convertBtn.addEventListener("click", arabicToRoman);

numInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		arabicToRoman();
	}
});
