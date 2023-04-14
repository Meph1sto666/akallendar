import { Birthday } from "./birthday";
import { Episode, Event, IS } from "./event";
import { useState, useCallback } from "react"


export interface EventSortFunction {
	fn: (a:Event, b:Event) => number;
	desc: boolean;
}
export interface EpisodeSortFunction {
	fn: (a:Episode, b:Episode) => number;
	desc: boolean;
}
export interface ISSortFunction {
	fn: (a:IS, b:IS) => number;
	desc: boolean;
}
export interface BirthdaySortFunction {
	fn: (a:Birthday, b:Birthday) => number;
	desc: boolean;
}

export interface SortRule {
	key: string;
	desc: boolean
}

export const sortFunctions:Record<string, BirthdaySortFunction> = {
	"operator_name": {
		fn: (a:Birthday, b:Birthday): number => a.operator_name.localeCompare(a.operator_name),
		desc: false,
	},
	"operator_id": {
		fn: (a:Birthday, b:Birthday): number => a.operator_id.localeCompare(a.operator_id),
		desc: false,
	},
	"day": {
		fn: (a:Birthday, b:Birthday): number => a.day.getTime() - b.day.getTime(),
		desc: false,
	}
}
/*
export function useSort(rules:SortRule[]) {
	const [sortChain, setSortChain] = useState<SortRule[]>(rules);

	function toggleSort(key: string, desc?: boolean) {
		const filteredChain = sortChain.filter(li => li.key !== key);
		if (desc !== undefined) {
		  setSortChain(_ => [...filteredChain, { key: key, desc: desc }]);
		} else {
		  setSortChain(_ => [...filteredChain]);
		}
	}

	const sortFn = useCallback((a: Birthday, b: Birthday) => {
		return sortChain.map(({ key, desc }) => {return sortFunctions[key as keyof typeof sortFunctions].fn(a, b)*(desc?1:-1)}).reduce((a, b) => {return a || b}, 0);
	}, [sortChain])
	return [sortFn] as const
}*/
export function eventSortFn(a:Event, b:Event) {
	return a.start.getTime()-b.start.getTime();
}