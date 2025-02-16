import type { ReactNode } from 'react';
import './styles.sass';

export interface CarrouselProperties {
	children: ReactNode;
}

export function Carrousel({ children }: CarrouselProperties) {
	return <div className={'carrousel'}>{children}</div>;
}
