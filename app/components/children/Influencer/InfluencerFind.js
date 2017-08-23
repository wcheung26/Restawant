import React from "react";

class InfluencerFind extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			searchCity: ""
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
		console.log("Promo Code: ", this.state.searchCity);
	}

	render () {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-center">Search Your City</div>
				<div className="panel-body">
					<form>
						<div className="input-group">
							<span className="input-group-addon" id="building-o-icon"><i className="fa fa-gift" aria-hidden="true"></i></span>
							<input
								type="text" 
								value={this.state.searchCity}
								className="form-control"
								id="searchCity" 
								placeholder="Promotion" 
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

export default InfluencerFind;