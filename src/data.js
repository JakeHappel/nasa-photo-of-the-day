import React, { Component } from "react";
import axios from "axios";
import Card from "./components/Card";
import DatePicker from "react-datepicker";

var moment = require("moment");
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const begin = moment().utcOffset(timezone)._d;
const max = moment().utcOffset(timezone)._d;
const currentTime = moment()
  .utcOffset(timezone)
  .format();

  export default class Data extends Component {

    constructor(props) {
      super(props);
      this.state = {
        max: max,
        begin: begin,
        startDate: currentTime,
        data: null
      };
      this.handleChange = this.handleChange.bind(this);
    }
  
    // Function Run on Date Change
    handleChange(date) {
      this.setState(
        {
          startDate: date,
          begin: date
        },
        () => {}
      );
      setTimeout(
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?api_key=nJAgnS7nNqV1KFXfIvaSZ6FG8wIIrVVd1kJ7ggIo&date=${
              this.state.startDate === "2019-07-17"
                ? this.state.startDate.toISOString().slice(0, -14)
                : date.toISOString().slice(0, -14)
            }`
          )
          .then(response => {
            this.setState({
              data: [response.data]
            });
          }),
        3000
      );
    }
  
    // Initial Data
    componentDidMount() {
      axios
        .get(
          `https://api.nasa.gov/planetary/apod?api_key=nJAgnS7nNqV1KFXfIvaSZ6FG8wIIrVVd1kJ7ggIo&date=${this.state.startDate.slice(
            0,
            -15
          )}`
        )
        .then(response => {
          this.setState({
            data: [response.data]
          });
        });
    }
  
    render() {
      return (
        <>
          <h1>Select Date:</h1>
          {/* Displays Calendar */}
          <DatePicker
            maxDate={this.state.max}
            selected={this.state.begin}
            onChange={this.handleChange}
          />
          <Card data={this.state.data} />
        </>
      );
    }
  }