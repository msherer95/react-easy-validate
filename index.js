import React from 'react';
import ReactDOM from 'react-dom';
import {ReactValidate} from './react-validate';

class MyForm extends ReactValidate {
	constructor(props) {
		super(props);
		this.state = {};
		this.validationParams = {
			integer: {
				min: 0,
				max: 100
			}
		}
	}

	render() {
		let integerInput = <input type='text' name='integer' />
		return (
			<form>
				{this.addInputInteractions(integerInput)}
			</form>
		)
	}
}

ReactDOM.render(<MyForm />, document.getElementById('app'));