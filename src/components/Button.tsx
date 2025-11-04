import React, { forwardRef } from "react";

/**
 * Minimal local replacement for the 'clsx' utility to avoid an external dependency.
 * It concatenates truthy string values with a space.
 */
const clsx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

/**
 * Defines the available button variants for styling.
 */
type Variant = "primary" | "secondary" | "danger";

/**
 * Props for the Button component, extending standard button attributes.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual variant of the button. Defaults to "primary". */
  variant?: Variant;
  /** The content to display inside the button. */
  children: React.ReactNode;
}

/**
 * Base CSS classes applied to all button variants.
 */
const BASE_CLASSES = "px-4 py-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";

/**
 * Mapping of button variants to their corresponding CSS classes.
 */
const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
} as const;

/**
 * A customizable button component with predefined variants.
 *
 * @param variant - The button variant ("primary", "secondary", or "danger").
 * @param children - The content to render inside the button.
 * @param props - Additional props passed to the underlying button element.
 * @param ref - Ref forwarded to the button element.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", className, ...props }, ref) => {
    // Validate variant prop
    if (variant && !Object.keys(VARIANT_CLASSES).includes(variant)) {
      console.warn(`Invalid variant "${variant}". Falling back to "primary".`);
      variant = "primary";
    }

    return (
      <button
        ref={ref}
        className={clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";