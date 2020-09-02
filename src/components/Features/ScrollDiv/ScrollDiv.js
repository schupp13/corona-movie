import React, { useEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import ButtonToggle from "../../Features/ButtonToggle/ButtonToggle";
import "./ScrollDiv.scss";
import ScrollDivMobile from "../../Features/ScrollDivMobile/ScrollDivMobile";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { findByLabelText } from "@testing-library/react";
import { useWindowDimensions } from "../WindowHook/getWindowDimensions";

export default function ScrollDiv(props) {
  const { height, width, mobileSize } = useWindowDimensions();
  let buttons = props.buttons ? (
    <ButtonToggle buttons={props.buttons}></ButtonToggle>
  ) : (
    ""
  );

  const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
  };
  const ArrowLeft = Arrow({
    text: <ArrowBackIosIcon />,
    className: "arrow-prev",
  });
  const ArrowRight = Arrow({
    text: <ArrowForwardIosIcon />,
    className: "arrow-next",
  });

  const makeCards = () => {
    const button = (
      <Button
        key="taco"
        style={{
          color: "rgb(224, 224, 224) ",

          width: 200,
          height: 200,
        }}
        onClick={() => props.addPage()}
      >
        LOAD MORE
      </Button>
    );
    const cards = props.cards;
    if (
      props.page < props.total_pages &&
      cards[cards.length - 1].key !== "taco"
    ) {
      cards.push(button);
    }
    console.log(cards[cards.length - 1].key == "taco");
    return cards;
  };
  return (
    props.cards.length > 0 && (
      <div className="scroll-container-div">
        <h2 className="scroll-title">{props.title}</h2>
        <div className="buttons">{buttons}</div>
        {width > mobileSize ? (
          <ScrollMenu
            data={makeCards()}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            wheel={false}
            hideArrows={true}
            hideSingleArrow={true}
            menuStyle={{
              display: "flex",
              alignItems: "center",
              userSelect: "none",
              justifyContent: "flex-start",
            }}
            innerWrapperStyle={{
              display: "flex",
              alignItems: "center",
              userSelect: "none",
              width: "100%",
              cursor: "pointer",
            }}
            wrapperStyle={{
              overflow: "hidden",
              userSelect: "none",
              padding: "0",
              display: "flex",
            }}
            alignCenter={false}
          />
        ) : (
          <ScrollDivMobile cards={makeCards()}></ScrollDivMobile>
        )}
      </div>
    )
  );
}
