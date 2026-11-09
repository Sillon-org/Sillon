import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("Page d'accueil", () => {
  it("affiche le titre principal", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("garde une place pour le pilier Créer (en pause)", () => {
    render(<HomePage />);
    expect(screen.getByText("Créer · bientôt")).toHaveAttribute("aria-disabled", "true");
  });
});
