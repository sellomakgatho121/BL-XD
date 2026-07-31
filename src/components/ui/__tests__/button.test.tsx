import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import React from "react";

describe("Button", () => {
  it("renders children", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("applies default variant classes", () => {
    const { container } = render(<Button>Default</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("data-variant", "default");
    expect(button).toHaveClass("bg-primary");
  });

  it("applies destructive variant", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("data-variant", "destructive");
    expect(button).toHaveClass("bg-destructive");
  });

  it("applies size classes", () => {
    const { container } = render(<Button size="lg">Large</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveAttribute("data-size", "lg");
    expect(button).toHaveClass("h-10");
  });

  it("renders as child when asChild is true", () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveTextContent("Link");
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Button className="custom-class">Custom</Button>
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("custom-class");
  });

  it("forwards additional props", () => {
    const { container } = render(
      <Button disabled type="submit" aria-label="Submit form">
        Submit
      </Button>
    );
    const button = container.querySelector("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "Submit form");
  });
});
