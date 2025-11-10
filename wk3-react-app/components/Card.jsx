import React from "react"

// simple local Button component to avoid missing ./ui/button module
export const Button = ({
  children,
  variant,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "link" | "outline" | "default"
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
  const variants: Record<string, string> = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-gray-200 hover:bg-gray-100",
    link: "bg-transparent text-primary underline",
  }
  const cls = [base, variants[variant || "default"], className].filter(Boolean).join(" ")
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}

// Minimal Card UI components defined locally to resolve missing module error
export const Card = ({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>{children}</div>
);
export const CardHeader = ({ children }: React.PropsWithChildren) => (
  <div className="mb-4">{children}</div>
);
export const CardTitle = ({ children }: React.PropsWithChildren) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);
export const CardDescription = ({ children }: React.PropsWithChildren) => (
  <p className="text-gray-500 text-sm">{children}</p>
);
export const CardAction = ({ children }: React.PropsWithChildren) => (
  <div className="mt-2">{children}</div>
);
export const CardContent = ({ children }: React.PropsWithChildren) => (
  <div className="my-4">{children}</div>
);
export const CardFooter = ({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`mt-4 flex ${className}`}>{children}</div>
);
// Minimal Input component to resolve missing module error
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";

// Minimal Label component to resolve missing module error
export const Label = ({
  htmlFor,
  children,
  className = "",
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
