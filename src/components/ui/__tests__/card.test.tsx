import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card", () => {
  it("renders children", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent("Content");
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-card">Card</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toHaveClass("custom-card");
    expect(card).toHaveClass("bg-card");
  });
});

describe("CardHeader", () => {
  it("renders children", () => {
    const { container } = render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    );
    const header = container.querySelector('[data-slot="card-header"]');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Header");
  });
});

describe("CardTitle", () => {
  it("renders title text", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
      </Card>
    );
    const title = container.querySelector('[data-slot="card-title"]');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Title");
    expect(title).toHaveClass("font-semibold");
  });
});

describe("CardDescription", () => {
  it("renders description text", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardDescription>Test description content</CardDescription>
        </CardHeader>
      </Card>
    );
    const desc = container.querySelector('[data-slot="card-description"]');
    expect(desc).toBeInTheDocument();
    expect(desc).toHaveTextContent("Test description content");
    expect(desc).toHaveClass("text-muted-foreground");
  });
});

describe("CardContent", () => {
  it("renders content area", () => {
    const { container } = render(
      <Card>
        <CardContent>Main content here</CardContent>
      </Card>
    );
    const content = container.querySelector('[data-slot="card-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Main content here");
    expect(content).toHaveClass("px-6");
  });
});

describe("CardFooter", () => {
  it("renders footer", () => {
    const { container } = render(
      <Card>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    );
    const footer = container.querySelector('[data-slot="card-footer"]');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("Footer actions");
  });
});

describe("Card composition", () => {
  it("renders a complete card with all sections", () => {
    const { container } = render(
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>All sections rendered</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main body content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-header"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-title"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-description"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-content"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="card-footer"]')
    ).toBeInTheDocument();
    expect(container.querySelector("p")).toHaveTextContent("Main body content");
    expect(container.querySelector("button")).toHaveTextContent("Action");
  });
});
