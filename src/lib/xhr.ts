/* eslint-disable @typescript-eslint/no-explicit-any */
export type XHRMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export interface XHRError {
	errorCode: number;
	errorMessage: string;
}

export interface XHROptions {
	method: XHRMethod;
	headers?: Record<string, any>;
	params?: Record<string, any>;
	body?: object | string;
}

export interface XHR {
	fetch<T>(url: string, options?: XHROptions): Promise<T | XHRError | undefined>;
	abort(): void;
}

export class DefaultXHR implements XHR {
	protected timeout: number = 1000 * 60 * 10;

	private request: Request | undefined;
	private response: Response | undefined;
	private controller: AbortController | undefined;

	private _parseURL(url: string, params?: Record<string, any>): string {
		let target: string = `https://${import.meta.env.VITE_API_HOSTNAME}`;
		if (url.startsWith('/') && target.endsWith('/')) {
			target += url.substring(1);
		} else if (!url.startsWith('/') && !target.endsWith('/')) {
			target = [target, url].join('/');
		} else {
			target += url;
		}

		const queryParams: Record<string, any> = Object.assign({}, params || {}, {
			apikey: `${import.meta.env.VITE_API_KEY}`,
		});
		if (/({\w+})/g.test(target)) {
			target = target.replace(/({\w+})/g, match => {
				const key: string = match.replace(/[{}]+/g, '');
				const value = queryParams[key];
				if (value) {
					delete queryParams[key];
				}

				return value;
			});
		}

		target = [
			target,
			Object.keys(queryParams)
				.map(key => `${key}=${queryParams[key]}`)
				.join('&'),
		].join('?');

		return target;
	}

	private _buildRequestHeaders(headers?: Record<string, any>): Headers {
		const target: Headers = new Headers();
		if (headers) {
			Object.keys(headers).forEach(key => target.set(key, headers[key]));
		}
		return target;
	}

	private _parseRequestBody(body: any, headers?: Record<string, any>): string {
		let result: string = '';
		const contentType: string = headers && (headers['content-type'] || headers['Content-Type']);
		switch (contentType) {
			case 'application/json':
				result = JSON.stringify(body);
				break;
			case 'text/plain':
				result = body.toString();
				break;
		}

		return result;
	}

	private _buildRequest(url: string, { method, params, headers, body }: XHROptions): Request {
		this.controller = new AbortController();

		return new Request(new URL(this._parseURL(url, params)), {
			method: method.toUpperCase() || 'GET',
			headers: this._buildRequestHeaders(headers),
			signal: this.controller?.signal,
			body: ['POST', 'PUT'].includes(method) && body ? this._parseRequestBody(body, headers) : null,
		});
	}

	private async _parseResult<T>(preValue?: XHRError): Promise<T | XHRError | undefined> {
		if (!preValue) {
			switch (this.request?.headers?.get('Content-Type')) {
				case 'application/json':
					return (await this.response?.json()) as T;
				case 'text/plain':
					return (await this.response?.text()) as T;
			}
		}

		return preValue;
	}

	async fetch<T>(url: string, options: XHROptions): Promise<T | XHRError | undefined> {
		let result: T | XHRError | undefined = undefined;

		try {
			setTimeout(this.abort.bind(this), this.timeout);
			this.request = this._buildRequest(url, options);
			this.response = await fetch(this.request);
		} catch (e: unknown) {
			result = {
				errorCode: 500,
				errorMessage: (e as Error).message,
			} as XHRError;
		} finally {
			result = await this._parseResult<T>(result);
		}

		return result;
	}

	abort(): void {
		this.controller?.abort();
	}
}
/* eslint-enable @typescript-eslint/no-explicit-any */