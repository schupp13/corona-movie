import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Button from "@material-ui/core/Button";
import ButtonToggle from "../../Features/ButtonToggle/ButtonToggle";
import "./ScrollDiv.scss";
export default function ScrollDiv(props) {
  let buttons = props.buttons ? (
    <ButtonToggle buttons={props.buttons}></ButtonToggle>
  ) : (
    ""
  );

  return (
    props.cards.length > 0 && (
      <div className="scroll-container-div">
        <h2 className="scroll-title">{props.title}</h2>
        {buttons}
        <div className="scroll-div" onScroll={(e) => props.handleScroll(e)}>
          {props.cards ? props.cards : "No Results"}
          {props.page < props.total_pages && (
            <Button onClick={() => props.addPage()}>
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </Button>
          )}
        </div>
      </div>
    )
  );
}
