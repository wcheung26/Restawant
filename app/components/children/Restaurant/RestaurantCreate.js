import React from "react";

class RestaurantCreate extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
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
		console.log("Promo Code: ", this.state.form_promo);
		console.log("Expiration: ", this.state.form_expiration);
		console.log("Reward: ", this.state.form_reward);
	}

	render () {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">Create Promotion</div>
				<div className="panel-body">
					<form>
						<div className="input-group">
							<span className="input-group-addon" id="gift-icon"><i className="fa fa-gift" aria-hidden="true"></i></span>
							<input
								type="text" 
								value={this.state.promo}
								className="form-control"
								id="form_promo" 
								placeholder="Promotion" 
								onChange={this.handleChange}
								required 
							/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="calendar-icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
							<input
								type="date" 
								value={this.state.expiration}
								className="form-control" 
								id="form_expiration"
								placeholder="Expiration Date" 
								onChange={this.handleChange}
								required
							/>
						</div>
						<div className="input-group">
							<span className="input-group-addon" id="money-icon"><i className="fa fa-money" aria-hidden="true"></i></span>
							<input
								type="text" 
								value={this.state.reward}
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