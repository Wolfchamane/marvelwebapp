import './styles.sass';
import type { AlertProperties } from './types';

export function Alert({ type, message }: AlertProperties) {
	return <div className={['alert', `alert--${type}`].join(' ')}>{message}</div>;
}
