import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Home from "./page";

it("should render home page", async () => {
  render(<Home />);

  expect(screen.getByRole("heading", { name: "Bitcoin wallet" })).toBeDefined();
  expect(screen.getByRole("link", { name: "Log in / Sign up" })).toBeDefined();
});
