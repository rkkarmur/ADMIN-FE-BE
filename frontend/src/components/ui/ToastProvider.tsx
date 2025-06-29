import { createContext, useContext, useState, type ReactNode } from "react";
/* eslint react-refresh/only-export-components: off */

interface Toast {
	id: number;
	type: "success" | "error";
	message: string;
}

export type AddTost = (toast: Omit<Toast, "id">) => void;
interface ToastContextProps {
	addToast: AddTost;
}

const ToastContext = createContext<ToastContextProps>({ addToast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = (toast: Omit<Toast, "id">) => {
		const id = Date.now();
		setToasts((t) => [...t, { ...toast, id }]);
		setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
	};

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
				{toasts.map((t) => (
					<div key={t.id} className={`toast show text-bg-${t.type} mb-2`} role="alert">
						<div className="d-flex">
							<div className="toast-body">{t.message}</div>
						</div>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	return useContext(ToastContext);
}
