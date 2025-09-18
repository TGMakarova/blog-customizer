import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpenSideBar: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	sideBarRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpenSideBar,
	sideBarRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {if (!isOpenSideBar) {return}
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !sideBarRef.current?.contains(target)) {
				isOpenSideBar && onClose?.();
				onChange?.(false);
			}
		
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpenSideBar]);
};
