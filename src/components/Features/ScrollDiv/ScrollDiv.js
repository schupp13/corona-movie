import React, { useEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import ButtonToggle from "../../Features/ButtonToggle/ButtonToggle";
import "./ScrollDiv.scss";
import ScrollDivMobile from "../../Features/ScrollDivMobile/ScrollDivMobile";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { useWindowDimensions } from "../WindowHook/getWindowDimensions";
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
export default function ScrollDiv(props) {
  const {
    height,
    width,
    mobileSize,
    tabletSize,
    desktopSize,
  } = useWindowDimensions();
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
    return cards;
  };
  const cards = makeCards();
  const theme = useTheme();

  return (
    cards.length > 0 && (
      <div className="scroll-container-div">
        {props.title && (
          <Typography variant="h5" component="h2" color="textSecondary">
            {props.title}
          </Typography>
        )}
        <div className="buttons">{buttons}</div>
        {desktopSize || tabletSize ? (
          <ScrollMenu
            data={cards}
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
          <ScrollDivMobile cards={cards}></ScrollDivMobile>
        )}
      </div>
    )
  );
}
