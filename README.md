# React-Easy-Validate

React-Easy-Validate is designed to be a simple, yet flexible library for form validation. The project is in its very early stages at the moment, so a lot of functionalities are missing. Functionalities to come can be found at the bottom of this document. 

## Goals for the Library

* **Noob-Friendly:** Anyone who has a basic understanding of React should be able to use this without much trouble. Many React-specific validation libraries involve writing so much code that it can be overwhelming to fresh developers. This library aims to fix that.

* **Clear Separation of Concerns:** When all your validation code is in one place, your life can get a little messy. This library let's you designate an "settings" object, called `this.validationParams`. This is where you give instructions for how each of your input boxes should be validated. Handling warnings (errors), and formatting is performed in separate functions. Most importantly, these functions and "settings" objects are kept separate from the actual `<form>` component, allowing you to keep your form mostly unchanged. 

* **Unadulterated Form Creation:** Many form validation libraries force you to adhere to their structure, making your `<form>` very different from HTML forms we're all used to. This library only asks you to do one thing in your `<form>` aside from your normal code: transform your inputs with a single `this.addValidation` function. 

## How to Use 

1) `import ReactValidate` component, which contains all the important functions built-in. 

2) Instead of writing your form component using `extends React.Component`, use `extends ReactValidate`. This class is itself a sub-class of `React.Component`, which basically means that you get everything you normally would with `extends React.Component`, just with a couple extra features built in. 

3) Create a `constructor`, with `super` nested inside, so you can use the `this` keyword. Following `super`, add an object called `this.validationParams`. All the keys of this object correspond to names of your `input` elements. A detailed explanation of formatting this object can be found below. 

4) Use the built-in mid-type formatting options or overwrite them with your own functions. These can be added as `format` functions in the `this.validationParams` object. 

5) There is no built-in warning handler function. Instead, you define your own, called `handleWarnings(warning)`. Every time you type, a warning object will automatically be passed into this function. You can choose what to do with it. A description of the warning object can be found below. 

6) Now, to actually add all these methods to your `input` elements, pass the input element into the `this.addValidation` function, and render the output. An example of this is shown under the Examples section. 

7) Great, almost there! Your inputs are now validating, formatting, and doing stuff with warnings. Now, React's `state` will keep track of the validation state of each of your inputs. Using these states, you can change the styling of your form elements. 


