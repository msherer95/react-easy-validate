
let zipcode = (zipcode) => {
	return zipcode.match(/(^\d{5}$)/) ? true : false;
}

let integer = (integer, min=-inf, max=inf) => {
	return integer.match(/^\d+$/) && parseInt(integer) > min && parseInt(integer) < max ? true : false;
}

let float = (float, decimalLength=false, min=-inf, max=inf) => {
	let re = decimalLength ? '^\\d+\\.\\d{'+decimalLength+'}$' : '^\\d+\\.\\d+$'
	return float.match(new RegExp(re)) && parseFloat(float) > min && parseFloat(float) < max ? true : false;
}

let fullName = (name) => {
	return name.match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/) ? true : false;
}

let singleName = (name) => {
	return name.match(/^[A-Za-z]+$/) ? true : false;
}

let phoneNumber = (phone) => {
	return phone.match(/\(\d{3}\)\s\d{3}-\d{4}/) ? true : false;
}

let password = (password, uppercase=false, lowercase=false, numbers=false, symbols=false, minLength=8) => {
	let containsUppercase = uppercase ? password.match(/[A-Z]/) ? true : false : true;
	let containsLowercase = lowercase ? password.match(/[a-z]/) ? true : false  : true;
	let containsNumbers = numbers ? password.match(/\d/) ? true : false  : true;
	let containsSymbols = symbols ? password.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/) ? true : false  : true;

	let isLongEnough = password.length >= minLength;

	let passwordIsValid = containsUppercase && containsLowercase && containsNumbers && containsSymbols && isLongEnough;
	return passwordIsValid;
}

let passwordMatch = (password1, password2) => {
	return password1 === password2;
}

export const validator = {
	zipcode,
	integer,
	float,
	fullName,
	singleName,
	phoneNumber,
	password,
	passwordMatch
}
