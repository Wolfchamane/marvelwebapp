import './styles.sass';
import type { ReactNode } from 'react';

export interface GridLayoutProperties {
    children: ReactNode;
}

export function GridLayout({ children }: GridLayoutProperties) {
    return (<div className={"grid-layout"}>{children}</div>);
}