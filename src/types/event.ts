export interface Event {
	name: string;
	start: Date;
	end: Date;
	rerun?: boolean
}

export interface Episode {
	id: number;
	date: Date;
}

export interface IS {
	name: string;
	date: Date;
}

export interface JsonEventObj {
	name: string;
	start: string;
	end: string;
	rerun?: boolean
}

export interface JsonEpisodeObj {
	id: number;
	date: string;
}

export interface JsonISObj {
	name: string;
	date: string;
}

export function eventFromJson(json:JsonEventObj):Event {
	return {
		"name": json.name,
		"start": new Date(json.start),
		"end": new Date(json.end),
		"rerun": json.rerun
	}
}

export function episodeFromJson(json:JsonEpisodeObj):Episode {
	return {
		"id": json.id,
		"date": new Date(json.date),
	}
}

export function isFromJson(json:JsonISObj):IS {
	return {
		"name": json.name,
		"date": new Date(json.date),
	}
}