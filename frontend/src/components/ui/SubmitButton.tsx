import ButtonLoader from "./ButtonLoader";
import "./buttons.css";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    label?: string;
}

export default function SubmitButton({
    loading,
    label = "Save",
    className = "",
    ...props
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            className={`btn btn-primary btn-submit ${className}`.trim()}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? <ButtonLoader /> : label}
        </button>
    );
}
