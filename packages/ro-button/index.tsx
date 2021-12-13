import React, { FC } from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

const RoButton: FC<ButtonProps> = ({
  children,
  variant = "contained",
  ...others
}) => (
  <MuiButton
    disableElevation
    variant={variant}
    {...others}
  >
    {children}
  </MuiButton>
);

export default RoButton;
