// przycisk wielokrotnego użytku, wygląd zależy od wariantu
type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  variant = "secondary",
  type = "button", // żeby przypadkiem nie wysyłał formularza
  ...props
}: ButtonProps) {
  return <button type={type} className={`btn btn-${variant}`} {...props} />;
}
