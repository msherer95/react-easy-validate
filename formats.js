
let fullNameFormat = (name) => {
	let formattedName;

	if (name.match(/[A-Za-z]\s[A-Za-z]/)) {
		name = name.trim();
		let firstName = name.split(" ")[0];
		let lastName = name.split(" ")[1];

		let firstMultipleLetters = firstName[0].toUppercase() + firstName.slice(1).toLowercase();
		let firstSingleLetter = firstName[0].toUppercase()
		let formattedFirst = firstName.length > 1 ? firstMultipleLetters : firstSingleLetter;

		let lastMultipleLetters = lastName[0].toUppercase() + lastName.slice(1).toLowercase();
		let lastSingleLetter = lastName[0].toUppercase()
		let formattedLast = lastName.length > 1 ? lastMultipleLetters : lastSingleLetter;

		return formattedFirst + " " + formattedLast;
	} else if (name.match(/[A-Za-z]\s/)) {
		name = name.trim();

		let multipleLetterName = name[0].toUppercase() + name.slice(1).toLowercase();
		let singleLetterName = name[0].toUppercase();

		let formattedName = name.length > 1 ? multipleLetterName : singleLetterName;

		return formattedName + " ";
	} else if (name.match(/[A-Za-z]/)) {
		name = name.trim();

		let multipleLetterName = name[0].toUppercase() + name.slice(1).toLowercase();
		let singleLetterName = name[0].toUppercase();

		let formattedName = name.length > 1 ? multipleLetterName : singleLetterName;

		return formattedName;
	} else {
		return name;
	}
}

let singleNameFormat = (name) => {
	name = name.trim().split(" ")[0];

	if (!name.match(/\d/) && !name.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/) && name.length > 0) {
		let multipleLetterName = name[0].toUppercase() + name.slice(1).toLowercase();
		let singleLetterName = name[0].toUppercase();
		return name.length > 1 ? multipleLetterName : singleLetterName;
	} else {
		return name;
	}
}

let phoneFormat = (phone) => {
	if (phone.match(/\(\d{3}\)\s\d{3}$/)) {
		return phone + '-';
	} else if (phone.match(/\(\d{3}\)$/)) {
		return phone + " ";
	} else if (phone.match(/\(\d{3}$/)) {
		return phone + ") ";
	} else if (phone.match(/^\d/)) {
		return "(" + phone;
	} else {
		return phone;
	}
}

export const formats = {
	fullName: fullNameFormat,
	singleName: singleNameFormat,
	phone: phoneFormat
}