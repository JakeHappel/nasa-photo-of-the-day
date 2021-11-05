import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import "react-datepicker/dist/react-datepicker.css";
import { ReadableText } from "./styled-components/Style";

export default class Objects extends Component {
    render() {
      if (!this.props.data) {
        return <h1>Loading...</h1>;
      }
      return (
        <div className="card">
          <h1>{this.props.data[0].title}</h1>
          {this.props.data[0].url.includes("image") ? (
            <Tooltip title="Click on image to view the image in HD">
              <img
                src={this.props.data[0].url}
                alt="Space Img"
                onClick={() => window.open(this.props.data[0].hdurl, "_blank")}
              />
            </Tooltip>
          ) : (

            <iframe
              title="image"
              src={this.props.data[0].url}
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
              align="middle"
            />
          )}
          <ReadableText>{this.props.data[0].explanation}</ReadableText>
        </div>
      );
    }
  }
