import React from "react";
import TextField from "@material-ui/core/TextField";

export default function InputField({ name, value, label, onChange, type }) {
  return (
    <TextField
      autoFocus
      value={value}
      name={name}
      id="outlined-basic"
      label={label}
      variant="outlined"
      onChange={onChange}
      type={type}
    />
  );
}
