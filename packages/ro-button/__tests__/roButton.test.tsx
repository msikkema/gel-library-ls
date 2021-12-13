import React from "react";
import { render, screen } from '@testing-library/react';
import RoButton from "../index";

describe("ro-button", () => {
  it("should render", () => {
    render(<RoButton />);
    
    expect(screen).toBeDefined();
  });
});