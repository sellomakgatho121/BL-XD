import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const GoodChild = () => <div>All good</div>;

const BadChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("renders default fallback on error", () => {
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("Try again")
    ).toBeInTheDocument();
  });

  it("renders custom fallback on error", () => {
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <BadChild />
      </ErrorBoundary>
    );
    expect(screen.getByText("Custom error UI")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  it("calls onError handler when error occurs", () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <BadChild />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Test error" }),
      expect.any(Object)
    );
  });

  it("recovers after clicking try again", async () => {
    const { rerender } = render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Click try again to reset
    const tryAgain = screen.getByText("Try again");
    tryAgain.click();

    // Re-render with good child after reset
    rerender(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );

    expect(screen.getByText("All good")).toBeInTheDocument();
  });
});
