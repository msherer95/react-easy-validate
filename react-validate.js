import React from 'react';
import {validator} from './validator';
import {warnings} from './warnings';
import {formats} from './formats';

export class ReactValidate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.validationParams;
		this.handleFocus = this.handleFocus.bind(this);
		this.handleFocusOut = this.handleFocusOut.bind(this);
		this.handleType = this.handleType.bind(this);
		this.handleWarning = this.handleWarning.bind(this);
		this.addInputInteractions = this.addInputInteractions.bind(this);
	}
	
	// possible states: null, accept, reject (inactive), typing, typing-accept, typing-reject (active)
	// name types: zipcode, fullName, firstName, lastName, integer, float, password, passwordMatch

	handleFocus(e) {
		let inputType = e.target.name;
		let inputState = eval('this.state.' + inputType + 'Validated');
		let inputStateKey = inputType + 'Validated';

		if (inputState) {
			this.setState({[inputStateKey]: 'typing-' + inputState})
		} else {
			this.setState({[inputStateKey]: 'typing'})
		}
	}

	handleFocusOut(e) {
		let inputType = e.target.name;
		let inputState = eval('this.state.' + inputType + 'Validated');
		let inputStateKey = inputType + 'Validated';

		if (inputState == 'typing') {
			this.setState({[inputStateKey]: 'reject'})
		} else if (inputState == 'typing-accept' || inputState == 'typing-reject') {
			let newState = inputState.split('-')[1];
			this.setState({[inputStateKey]: newState})
		}
	}

	handleType(e) {
		let inputValue = e.target.value;
		let inputType = e.target.name;
		let generalizedInputType = e.target.name == 'firstName' || e.target.name == 'lastName' ? 'singleName' : e.target.name;
		let inputState = eval('this.state.' + inputType + 'Validated');
		let inputStateKey = inputType + 'Validated';
		let warning = warnings[generalizedInputType];
		let validate = validator[generalizedInputType];
		let format = formats[generalizedInputType];

		let formattedInput;

		if (format) {
			formattedInput = format(inputValue);
		} else {
			formattedInput = inputValue.trim();
		}

		let extraArgs = this.validationParams[generalizedInputType] ? Object.values(this.validationParams[generalizedInputType]) : [];

		this.setState({[inputType]: formattedInput});
		this.handleWarning(warning(formattedInput, ...extraArgs));
		let isValidated = validate(formattedInput, ...extraArgs);

		if (isValidated) {
			this.setState({[inputStateKey]: 'typing-accept'});
		} else if (!isValidated && inputState == 'typing-accept') {
			this.setState({[inputStateKey]: 'typing-reject'});
		}
	}

	handleWarning(warning) {
		console.log(warning.errorMessage);
	}

	addInputInteractions(input) {

		let inputHandlers = {
			onFocus: this.handleFocus,
			onBlur: this.handleFocusOut,
			onChange: this.handleType,
			value: this.state[input.props.name]
		}


		return React.cloneElement(input, inputHandlers)
	}
} 