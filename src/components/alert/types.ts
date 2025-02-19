export type AlertType = 'info' | 'success' | 'warning' | 'error';
export const ALERT_TYPES = {
	INFO: 'info' as AlertType,
	SUCCESS: 'success' as AlertType,
	WARNING: 'warning' as AlertType,
	ERROR: 'error' as AlertType,
};

export interface AlertProperties {
	type: AlertType;
	message: string;
}
