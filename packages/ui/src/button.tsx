import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/**
 * Bouton accessible : vrai <button>, cible ≥ 44 px, focus visible.
 * Styles dans button.css (s'appuie sur les tokens CSS de apps/web).
 */
export function Button({ variant = "primary", type = "button", className, ...props }: ButtonProps) {
  const classes = ["sillon-btn", `sillon-btn--${variant}`, className].filter(Boolean).join(" ");
  return <button type={type} className={classes} {...props} />;
}
