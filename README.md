# React-Easy-Validate

React-Easy-Validate is designed to be a simple, yet flexible library for form validation. The project is in its very early stages at the moment, so a lot of functionalities are missing. Functionalities to come can be found at the bottom of this document. 

This isn't intended to be a super-feature-rich library that competes with the best-of-the-best validation libraries out there. Instead, it's meant to be a library for beginners, or those who don't need every possible validation feature. It's meant to be a quick and easy way to implemenet validation without much hassle. 

## Goals for the Library

* **Noob-Friendly:** Anyone who has a basic understanding of React should be able to use this without much trouble. Many React-specific validation libraries involve writing so much code that it can be overwhelming for fresh developers. This library aims to fix that.

* **Clear Separation of Concerns:** When all your validation code is in one place, your life can get a little messy. This library let's you designate a "settings" object, called `this.validationParams`. This is where you give instructions for how each of your input boxes should be validated. Handling warnings (errors), and formatting is performed in separate functions. Most importantly, these functions and "settings" objects are kept separate from the actual `<form>` component. 

* **Unadulterated Form Creation:** Many form validation libraries force you to adhere to their structure, making your `<form>` very different from HTML forms we're all used to. This library only asks you to do one thing in your `<form>` aside from your normal code: transform your inputs with a single `this.addValidation` function. 

## How to Use 

1) `import ReactValidate from react-easy-validate` component, which contains all the important functions built-in. 

2) Instead of writing your form component using `extends React.Component`, use `extends ReactValidate`. This class is itself a sub-class of `React.Component`, which basically means that you get everything you normally would with `extends React.Component`, just with a couple extra features built in. 

3) Create a `constructor`, with `super` nested inside, so you can use the `this` keyword. Following `super`, add an object called `this.validationParams`. All the keys of this object correspond to names of your `input` elements. A detailed explanation of formatting this object can be found below. 

4) Use the built-in mid-type formatting options or overwrite them with your own functions. These can be added as `format` functions in the `this.validationParams` object. 

5) There is no built-in warning handler function. Instead, you define your own, called `handleWarnings(warning)`. Every time you type, a warning object will automatically be passed into this function. You can choose what to do with it. A description of the warning object can be found below. 

6) Now, to actually add all these methods to your `input` elements, pass the input element into the `this.addValidation` function, and render the output. An example of this is shown under the Examples section. 

7) Great, almost there! Your inputs are now validating, formatting, and doing stuff with warnings. Now, React's `state` will keep track of the validation state of each of your inputs. Using these states, you can change the styling of your form elements. 

## `this.validationParams` options

All keys of `this.validationParams` correspond to the name of your input. 

The types of validation that this library currently supports are: zipcode, fullName, firstName, lastName, integer, float, password, passwordMatch. 

Naturally, you might be thinking "what if I have to validate two integer input elements with different validation parameters?" To handle something like this, instead of using the standard "integer" name, you create modified names with a dash: "age-integer", "group-size-integer". As long as you have "-integer" on the very end, React-Easy-Validate will add proper validation to each. In `this.validationParams`, instead of using "integer", you now use your modified, just with camelCase. That is, "group-size-integer" becomes "groupSizeInteger" for the `this.validationParams` key. 

Each type of validation takes an extra set of validation arguments.

* **zipcode:** none
* **integer:** min`<int>`, max`<int>`
* **float:** decimalLength`<int>`, min`<Number>`, max`<Number>`,
* **fullName:** none
* **singleName:** none
* **phoneNumber:** none
* **password:** uppercase`<boolean>`, lowercase`<boolean>`, numbers`<boolean>`, symbols`<boolean>`, minLength`<int>`

Here's how you utilize the options: 

```jsx
this.validationParams = {
	groupSizeInteger: {
		min: 0,
		max: 100
	},
	password: {
		uppercase: true;,
		lowercase: true,
		numbers: true,
		symbols: false,
		minLength: 8
	}
}
```

You can always leave an input alone in `this.validationParams`. For example, if you don't care about "age-integer" input constaints, just ignore it in `this.validationParams` and min and max will automatically be set to `-inf` and `inf`. 

However, if you do choose to set options for an input, you MUST set all of them. I'm working to eliminate this requirement. But for now, you must explicitly define all options to prevent errors. 

## Format

Formatting functions are built in for each input already. For example, the phone-number formatter will add `()` around the area code automatically. The full-name formatter will capitalize your first and last names. 

This can be annoying if you don't want it there. You can override any formatting by setting `format: false`

```jsx
this.validationParams = {
	fullName: {
		format: false
	}
}
```

Alternatively, you can insert your own formatting function, which will happen on every input change. 

```jsx
this.validationParams = {
	fullName: {
		format: (value) => {
			...
			return newValue
		}
	}
}
```

In this case, `newValue` will replace the current input value on the next render. 

I'll eventually upload a description of all built-in formatting. 

## Warnings

Every time the input changes, React-Easy-Validate will run the `handleWarning(warning)` function. The built-in `handleWarning` function is blank, meaning that nothing will happen with the warnings natively. 

To handle warnings, define your own `handleWarning(warning)` method, and do some cool stuff with the passed-in warning object. 

The object will basically contain a set of boolean values, corresponding to validation problems. For example, the fullName warning object will contain a `hasSymbols` key, allowing you to yell at the user for inputing a symbol into their name. 

The last element of each warning object will be the `errorMessage`, which is a string describing, in human-language, anything that's not supposed to be in your current input. I use this to debug by logging it to the console, but it probably doesn't make much sense to use in production. 

## Adding Validation to Input

This part is relatively straightforward. I'll just give a quick example. At this point, you've already set up your validation parameters and formatting/warning functions. 

```jsx
class MyForm extends ReactValidate {
	constructor(props) {
		super(props);
		this.validationParams = {
			groupSizeInteger: {
				min: 0,
				max: 100
			}
		}
	}

	handleWarning(warning) {
		...
	}

	render() {
		let groupInput = <input type="text" name="group-size-integer" />

		<form>
			{this.addValidation(groupInput)}
			<input type="submit" value="Submit!">
		</form>
	}
}
```

You can add any types of attributes you normally would to the input, except `onFocus`, `onBlur`, or `onChange`. You also cannot change the `handleFocus`, `handlingFocusOut` and `handleChange` methods. 

## Upcoming Features

### Custom Event Handling

The most annoying aspect of this library in it's current state is that you cannot add your own `onFocus`, `onBlur`, or `onChange` methods. These methods are pre-defined with all the validation added in, and added to your input via the `this.addValidation` method. 

This makes the library somewhat rigid and limits what you can do. I plan to add new keys to each input in the `this.validationParams` object called: `customFocus`, `customBlur`, and `customChange`. 

These will take a function to perform on each of these events for a given input. These will then be passed into the pre-defined methods for handling these events in a callback-like manner. That is, they will execute after all the standard validation/formatting/warning occurs. 

### Custom Warnings

I definitely missed plenty of warnings. I hope to improve these over time. For now, however, my goal is to let you specify your own warning functions, just like formatter functions. These will ideally increase the error types found in the warning object. 

### General Improvements

Flexiblity is really important for this library. In lieu of that, I'm always looking for ways to keep validation simple with lots of built-in features, but also enable lots of flexiblity by easily adding to, or overwriting the built-in features entirely. This is something I'm constantly mindful of and trying to expand on as much as possible. 





