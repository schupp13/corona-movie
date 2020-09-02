import React from "react";
import "./ScrollDivMobile.scss";
import ButtonToggle from "../../Features/ButtonToggle/ButtonToggle";
import Button from "@material-ui/core/Button";

export default function ScrollDivMobile(props) {
  let buttons = props.buttons ? (
    <ButtonToggle buttons={props.buttons}></ButtonToggle>
  ) : (
    ""
  );
  const makeCards = () => {
    const cards = props.cards;
    if (props.page < props.total_pages) {
      cards.push(
        <Button
          style={{
            color: "rgb(224, 224, 224) ",
            height: "100%",
            width: 100,
            height: 350,
          }}
          onClick={() => props.addPage()}
        >
          LOAD MORE
        </Button>
      );
    }

    return cards;
  };
  return (
    <div className="scroll-mobile">
      <h2 className="scroll-title">{props.title}</h2>
      <div className="buttons">{buttons}</div>
      <div className="cards-div">{makeCards()}</div>
    </div>
  );
}
