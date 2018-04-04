
let containsLetters = (value) => {
	return value.match(/[A-Za-z]/) ? true : false;
}

let containsNumbers = (value) => {
	return value.match(/\d/) ? true : false;
}

let containsSpaces = (value) => {
	return value.match(/\s/) ? true : false;
}

let containsSymbols = (value) => {
	return value.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/) ? true : false;
}

let containsSymbolsExcludingDot = (value) => {
	return value.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/) ? true : false;
}

let zipcodeWarning = (zipcode) => {

	let hasSpaces = containsSpaces(zipcode) ? '\n\t spaces not allowed' : '';
	let hasSymbols = containsSymbols(zipcode) ? '\n\t symbols not allowed' : '';
	let hasLetters = containsLetters(zipcode) ? '\n\t letters not allowed' : '';
	let isproperLength = zipcode.length != 5 ? '\n\t improper zipcode length' : '';

	let errorMessage = 'Problems with zipcode input: ' + hasSpaces + hasSymbols + hasLetters + isproperLength

	return {
		hasLetters: containsLetters(zipcode),
		hasSpaces: containsSpaces(zipcode),
		hasSymbols: containsSymbols(zipcode),
		properLength: zipcode.length != 5,
		errorMessage
	}
}

let integerWarning = (integer, min, max) => {

	let hasSpaces = containsSpaces(integer) ? '\n \t spaces not allowed' : '';
	let hasSymbols = containsSymbols(integer) ? '\n \t symbols not allowed' : '';
	let hasLetters = containsLetters(integer) ? '\n \t letters not allowed' : '';
	let tooSmall = parseInt(integer) < min ? '\n \t must be greater than ' + min : '';
	let tooBig = parseInt(integer) > max ? '\n \t must be less than ' + max : '';

	let errorMessage = 'Problems with integer input: ' + hasSpaces + hasSymbols + hasLetters + tooSmall + tooBig;

	return {
		hasLetters: containsLetters(integer),
		hasSpaces: containsSpaces(integer),
		hasSymbols: containsSymbols(integer),
		tooSmall: parseInt(integer) < min,
		tooBig: parseInt(integer) > max,
		errorMessage
	}
}

let floatWarning = (float, decimalLength, min, max) => {

	let hasSpaces = containsSpaces(float) ? '\n \t spaces not allowed' : '';
	let hasSymbols = containsSymbolsExcludingDot(float) ? '\n \t symbols not allowed' : '';
	let hasLetters = containsLetters(float) ? '\n \t letters not allowed' : '';
	let tooManyDots = float.match(/\./g).length > 1 ? '\n \t cannot have more than one point' : '';
	let startsWithDot = float[0] == '.' ? 'cannot start with point' : '';
	let endsWithDot = float[float.length-1] == '.' ? 'cannot end with point' : '';
	let tooSmall = parseInt(float) < min ? '\n \t must be greater than ' + min : '';
	let tooBig = parseInt(float) > max ? '\n \t must be less than ' + max : '';
	let properDecimalLength = decimalLength ? float.split(".")[1].length === decimalLength ? '' : '\n \t must have exactly ' + decimalLength + ' decimals' : '';

	let errorMessage = 'Problems with float input: ' + hasSpaces + hasSymbols + hasLetters + isproperLength + tooSmall + tooBig + properDecimalLength + tooManyDots;

	return {
		hasLetters: containsLetters(float),
		hasSpaces: containsSpaces(float),
		hasSymbols: containsSymbolsExcludingDot(float),
		tooSmall: parseInt(float) < min,
		tooBig: parseInt(float) > max,
		properDecimalLength: decimalLength ? float.split(".")[1].length === decimalLength : true,
		tooManyDots: float.match(/\./g).length > 1 ? true : false,
		startsWithDot: float[0] == '.',
		endsWithDot: float[float.length-1] == '.',
		errorMessage
	}
}

let fullNameWarning = (name) => {
	let hasSymbols = containsSymbols(name) ? '\n \t symbols not allowed' : '';
	let hasNumbers = containsNumbers(name) ? '\n \t numbers not allowed' : '';
	let hasBothNames = name.match(/[A-Za-z]\s[A-Za-z]/) ? '' : '\n \t must contain first AND last names';

	let errorMessage = 'Problems with full name input: ' + hasSymbols + hasNumbers + hasBothNames;

	return {
		hasSymbols: containsSymbols(name),
		hasNumbers: containsLetters(name),
		hasBothNames: name.match(/[A-Za-z]\s[A-Za-z]/) ? true : false,
		errorMessage
	}
}

let singleNameWarning = (name) => {

	let hasSymbols = containsSymbols(name) ? '\n \t symbols not allowed' : '';
	let hasNumbers = containsNumbers(name) ? '\n \t numbers not allowed' : '';
	let hasSpaces = containsSpaces(name) ? '\n \t spaces not allowed' : '';

	let errorMessage = 'Problems with single name input: ' + hasSymbols + hasNumbers + hasSpaces;

	return {
		hasSymbols: containsSymbols(name),
		hasNumbers: containsLetters(name),
		hasSpaces: containsSpaces(name),
		errorMessage
	}
}

let phoneWarning = (phone) => {

	let hasLetters = containsLetters(phone) ? '\n \t letters not allowed' : '';
	let hasAreaCode = phone.match(/\(\d{3}\)/) ? '' : '\n \t missing area code';
	let hasPrefix = phone.match(/\(\d{3}\)\s\d{3}/) ? '' : '\n \t missing prefix';
	let hasLineNumber = phone.match(/\(\d{3}\)\s\d{3}-\d{4}/) ? '' : '\n \t missing line number'; 

	let errorMessage = 'Problems with phone number input: ' + hasLetters + hasAreaCode + hasPrefix + hasLineNumber;

	return {
		hasLetters: containsLetters(phone),
		hasAreaCode: phone.match(/\(\d{3}\)/) ? true : false,
		hasPrefix: phone.match(/\(\d{3}\)\s\d{3}/) ? true : false,
		hasLineNumber: phone.match(/\(\d{3}\)\s\d{3}-\d{4}/) ? true : false,
		errorMessage
	}
}

let passwordWarning = (password, uppercase=false, lowercase=false, numbers=false, symbols=false, minLength=8) => {
	
	let hasUppercase = uppercase ? password.match(/[A-Z]/) ? '' : '\n \t missing uppercase letter' : '';
	let hasLowercase = lowercase ? password.match(/[a-z]/) ? '' : '\n \t missing lowercase letter' : '';
	let hasNumbers = numbers ? containsNumbers(password) ? '' : '\n \t missing number' : '';
	let hasSymbols = symbols ? containsSymbols(password) ? '' : '\n \t missing symbol' : '';
	let properLength = password.length >= minLength ? '' : '\n \t needs to be at least ' + minLength + ' characters'

	let errorMessage = 'Problems with password: ' + hasUppercase + hasLowercase + hasNumbers + hasSymbols + properLength;

	return {
		hasUppercase: uppercase ? password.match(/[A-Z]/) ? true : false : 'not required',
		hasLowercase: lowercase ? password.match(/[a-z]/) ? true : false : 'not required',
		hasNumbers: numbers ? containsNumbers(password) ? true : false : 'not required',
		hasSymbols: symbols ? containsSymbols(password) ? true : false : 'not required',
		properLength: password.length >= minLength ? true : false,
		errorMessage
	}
}

let passwordRepeatWarning = (password1, password2) => {

	let passwordsMatch = password1 == password2 ? '' : 'passwords do not match';
	let errorMessage = 'Problems with repeating password: ' + passwordsMatch;

	return {
		passwordsMatch: password1 == password2,
		errorMessage
	}
}

export const warnings = {
	zipcode: zipcodeWarning,
	integer: integerWarning,
	float: floatWarning,
	fullName: fullNameWarning,
	singleName: singleNameWarning,
	phone: phoneWarning,
	password: passwordWarning,
	passwordRepeat: passwordRepeatWarning
}
