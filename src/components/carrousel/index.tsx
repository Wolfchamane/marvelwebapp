import './styles.sass';
import type { ReactNode } from 'react';

export interface CarrouselProperties {
	children: ReactNode;
}

export function Carrousel({ children }: CarrouselProperties) {
	return <div className={'carrousel'}>{children}</div>;
}
