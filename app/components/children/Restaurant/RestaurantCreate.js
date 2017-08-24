import React from "react";

import helpers from "../../utils/helpers";

class RestaurantCreate extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			form_promo_name: "",
			form_promo: "",
			form_expiration: "",
			form_reward: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	handleSubmit(event) {
		event.preventDefault();
		// Save to Database if Valid
		console.log("Promo Name: ", this.state.form_promo_name);
		console.log("Promo Code: ", this.state.form_promo);
		console.log("Expiration: ", this.state.form_expiration);
		console.log("Reward: ", this.state.form_reward);

		let newPromo = {
			name: this.state.form_promo_name,
			offer: this.state.form_promo,
			expiration: this.state.form_expiration,
			reward: this.state.form_reward
		};

		helpers.createRestaurantPromo(newPromo);
		// helpers.createRestaurantPromo(newPromo).then(function() {
		// 	console.log("Promo code successfuly created!");
		// });
	}

	render () {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">Create Promotion</div>
				<div className="panel-body">
					<form>
						<div className="input-group">
							<span className="input-group-addon" id="certificate-icon"><i className="fa fa-certificate" aria-hidden="true"></i></span>
							<input
								type="text" 
								value={this.state.form_promo_name}
								className="form-control"
								id="form_promo_name" 
								placeholder="Promotion Name" 
								onChange={this.handleChange}
								required 
							/>	
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="gift-icon"><i className="fa fa-gift" aria-hidden="true"></i></span>
							<input
								type="text" 
								value={this.state.form_promo}
								className="form-control"
								id="form_promo" 
								placeholder="Offer Details" 
								onChange={this.handleChange}
								required 
							/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="calendar-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
							<input
								type="date" 
								value={this.state.form_expiration}
								className="form-control" 
								id="form_expiration"
								placeholder="Expiration Date" 
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="usd-icon"><i className="fa fa-usd" aria-hidden="true"></i></span>
							<input
								type="text" 
								value={this.state.form_reward}
								className="form-control" 
								id="form_reward"
								placeholder="Reward Per Scan" 
								onChange={this.handleChange}
								required
							/>
						</div>
						<button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
					</form>
				</div>
			</div>
		);
	};

};

export default RestaurantCreate;