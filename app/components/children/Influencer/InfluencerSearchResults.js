import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.results.length > 0) {
      // Render results if restaurants found
      return (
        <div>
          <table className="table">
            <tbody>
              {this.props.results.map((restaurant, i) => {
                return (
                  <tr key={restaurant.id}>
                    <th>{i + 1}</th>
                    <td><a href="#">{restaurant.name}</a></td>
                    <td>{restaurant.address}, {restaurant.city}</td>
                    <td><a href={"https://www.yelp.com/biz/" + restaurant.yelpId}>View on Yelp</a></td>
                    <td><button className="btn btn-default">See Promotions</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (!this.props.results) {
      // Render nothing if no search has been done
      return (
        <div>
          <br />
        </div>
      )

    } else {
      // Render text if no results were found after search
      return (
        <div className="text-center">
          <p>No results found.</p>
        </div>
      )
    }
  }
}

export default SearchResults;