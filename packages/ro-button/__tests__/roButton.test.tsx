import React from "react";
import { render, screen } from "@testing-library/react";
import RoButton from "../index";

describe("ro-button", () => {
  it("should render child as button text", () => {
    const label = "Werther's Original";
    render(<RoButton>{label}</RoButton>);

    expect(screen.getByRole("button", {name: label})).toBeDefined();
  });
});