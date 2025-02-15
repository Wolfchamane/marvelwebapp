export interface Resource {
	name?: string;
	type?: string;
	resourceURI?: string;
	url?: string;
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
	thumbnail: {
		extension: string;
		path: string;
	};
	urls: Resource[];
}

export interface CharacterCollection {
	count: number;
	limit: number;
	offset: number;
	results: Character[];
	total: number;
}

export interface CharactersOutput {
	attributionHTML: string;
	attributionText: string;
	code: number;
	copyright: string;
	data: CharacterCollection;
	etag: string;
	status: string;
}
