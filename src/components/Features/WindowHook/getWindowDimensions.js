import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    currentWidth: width,
    mobileSize: width <= 451,
    tabletSize: width < 770 && width > 451,
    desktopSize: width >= 770,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      // setWindowDimensions(getWindowDimensions());
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => setWindowDimensions(getWindowDimensions()),
        150
      );
      const { innerWidth: width, innerHeight: height } = window;
      if (width <= 451 && windowDimensions.mobileSize !== true) {
        timeoutId = setTimeout(
          () => setWindowDimensions(getWindowDimensions()),
          150
        );
      } else if (
        width > 451 &&
        width < 770 &&
        windowDimensions.tabletSize !== true
      ) {
        timeoutId = setTimeout(
          () => setWindowDimensions(getWindowDimensions()),
          150
        );
      } else if (width >= 770 && windowDimensions.desktopSize !== true) {
        timeoutId = setTimeout(
          () => setWindowDimensions(getWindowDimensions()),
          150
        );
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
