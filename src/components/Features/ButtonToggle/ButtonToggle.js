import React, { Component, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "./ButtonToggle.scss";

class ButtonToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    let buttons = this.props.buttons.map((button, index) => {
      return (
        <Button
          key={index}
          className={index === this.state.activeIndex && "active"}
          onClick={() => this.setState({ activeIndex: index }, button.function)}
        >
          {button.name}
        </Button>
      );
    });
    return (
      <>
        <ButtonGroup className="button-group">{buttons}</ButtonGroup>
      </>
    );
  }
}

export default ButtonToggle;
