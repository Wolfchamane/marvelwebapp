import './styles.sass';

export interface AlertProperties {
	type: 'info' | 'success' | 'warning' | 'error';
	message: string;
}

export function Alert({ type, message }: AlertProperties) {
	return <div className={['alert', `alert--${type}`].join(' ')}>{message}</div>;
}
