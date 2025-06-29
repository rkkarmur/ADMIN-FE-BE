import "./buttons.css";

interface CancelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export default function CancelButton({
    label = "Cancel",
    className = "",
    ...props
}: CancelButtonProps) {
    return (
        <button
            type="button"
            className={`btn btn-secondary btn-cancel ${className}`.trim()}
            {...props}
        >
            {label}
        </button>
    );
}
