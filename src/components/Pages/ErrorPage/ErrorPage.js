import React from "react";
import { Typography } from "@material-ui/core";
import "./ErrorPage.scss";
export default function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-page-content">
        <Typography variant="h1" component="h1">
          Oops!
        </Typography>
        <Typography variant="h3" component="h3">
          404 - Page Not Found
        </Typography>
        <Typography variant="p" component="p">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.{" "}
        </Typography>
      </div>
    </div>
  );
}
