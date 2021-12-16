import React from "react";
import { render, screen } from "../../test-utilities/testUtils";
import CheckIn from "../index";

describe.only("check-in", () => {
  it("should render", () => {
    render(<CheckIn />);
    screen.debug();
  });
});