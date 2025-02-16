export interface Date {
	type: string;
	date: string;
}

export interface Price {
	type: string;
	price: number;
}

export interface Thumbnail {
	path: string;
	extension: string;
}

export interface Resource {
	name?: string;
	type?: string;
	resourceURI?: string;
	url?: string;
	role?: string;
}

export interface ResourceCollection {
	available: number;
	collectionURI: string;
	items: Resource[];
	returned: number;
}

export interface Character {
	comics: ResourceCollection;
	description: string;
	events: ResourceCollection;
	id: number;
	modified: string;
	name: string;
	resourceURI: string;
	series: ResourceCollection;
	stories: ResourceCollection;
	thumbnail: Thumbnail;
	urls: Resource[];
}

export interface Comic {
	id: number;
	digitalId: number;
	title: string;
	issueNumber: number;
	variantDescription: string;
	description: string;
	modified: string;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: number;
	textObjects: string[];
	resourceURI: string;
	urls: Resource[];
	series: Resource[];
	variants: Resource[];
	collections: Resource[];
	collectedIssues: Resource[];
	dates: Date[];
	prices: Price[];
	thumbnail: Thumbnail;
	images: Thumbnail[];
	creators: ResourceCollection[];
	characters: ResourceCollection[];
	stories: ResourceCollection[];
	events: ResourceCollection[];
}

export interface Collection<T> {
	count: number;
	limit: number;
	offset: number;
	results: T[];
	total: number;
}

export interface InfraOutput<T> {
	attributionHTML: string;
	attributionText: string;
	code: number;
	copyright: string;
	data: Collection<T>;
	etag: string;
	status: string;
}
