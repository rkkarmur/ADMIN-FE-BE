import "./buttons.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
    label?: string;
}

export default function Button({
    variant = "primary",
    label,
    className = "",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`btn btn-${variant} ${className}`.trim()}
            {...props}
        >
            {label ?? children}
        </button>
    );
}
