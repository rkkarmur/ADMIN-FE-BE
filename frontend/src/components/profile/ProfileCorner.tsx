import { useEffect, useRef, useState } from "react";
import { logoutAPI } from "@redux/auth/logout";
import { useAppDispatch, useAppSelector } from "@store";
import { useToast } from "@components/ui/ToastProvider";
import type { RootState } from "@store";
import ButtonLoader from "@components/ui/ButtonLoader";
import Button from "@components/ui/Button";
import { Link } from "react-router-dom";
import { FULL_ROUTES } from "@config/routes";

function useOutsideClick<T extends HTMLElement>(ref: React.RefObject<T | null>, handler: () => void) {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [ref, handler]);
}

interface ProfileCornerProps {
	onNavigate?: () => void;
}

export default function ProfileCorner({ onNavigate }: ProfileCornerProps) {
	const dispatch = useAppDispatch();
	const { addToast } = useToast();
	const authLoading = useAppSelector((s: RootState) => (s.loader as unknown as { authLoading: boolean }).authLoading);
	const [open, setOpen] = useState(false);
	const [dropUp, setDropUp] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLUListElement>(null);

	const closeMenu = () => setOpen(false);
	const handleNavigate = () => {
		closeMenu();
		onNavigate?.();
	};
	const toggleMenu = () => setOpen((prev) => !prev);

	useOutsideClick(containerRef, closeMenu);

	useEffect(() => {
		const updateDropUp = () => {
			if (containerRef.current && menuRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const menuHeight = menuRef.current.offsetHeight;
				const spaceBelow = window.innerHeight - rect.bottom;
				setDropUp(spaceBelow < menuHeight);
			}
		};

		if (open) updateDropUp();

		window.addEventListener("resize", updateDropUp);
		window.addEventListener("scroll", updateDropUp, true);

		return () => {
			window.removeEventListener("resize", updateDropUp);
			window.removeEventListener("scroll", updateDropUp, true);
		};
	}, [open]);

	const menuStyle = dropUp ? { bottom: "100%", top: "auto", transform: "translateY(-5px)" } : { top: "100%", bottom: "auto", transform: "translateY(5px)" };

	return (
		<div className="dropdown position-relative" ref={containerRef}>
			<Button variant="primary" className="dropdown-toggle w-100" type="button" aria-expanded={open} onClick={toggleMenu}>
				Profile
			</Button>
			<ul className={`dropdown-menu w-100 ${open ? "show" : ""}`} ref={menuRef} style={{ position: "absolute", ...menuStyle, zIndex: 1000 }}>
				<li>
					<Link className="dropdown-item" to={FULL_ROUTES.ADMIN_PROFILE} onClick={handleNavigate}>
						View Profile
					</Link>
				</li>
				<li>
					<Link className="dropdown-item" to={FULL_ROUTES.ADMIN_CHANGE_PASSWORD} onClick={handleNavigate}>
						Change Password
					</Link>
				</li>
				<li>
					<Button
						className="dropdown-item"
						variant="link"
						onClick={() => {
							logoutAPI({ addToast })(dispatch);
							handleNavigate();
						}}
						disabled={authLoading}
					>
						{authLoading ? <ButtonLoader /> : "Logout"}
					</Button>
				</li>
			</ul>
		</div>
	);
}
