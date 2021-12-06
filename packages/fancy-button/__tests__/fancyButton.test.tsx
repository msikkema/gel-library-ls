import React from "react";
import { render, screen } from '@testing-library/react';
import FancyButton from "../index";

describe("fancy-button", () => {
  it("should render", () => {
    render(<FancyButton />);
    
    expect(screen).toBeDefined();
  });
});