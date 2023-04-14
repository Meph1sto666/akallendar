import { Birthday } from "./birthday";
import { Event } from "./event";

export interface FilterRule {
	key: string;
	desc: boolean
}

export function birthdayFilterFn(x:Birthday) {	
	return x.day.getTime() > new Date().getTime();
}
export function eventFilterFn(x:Event) {	
	return x.end.getTime() > new Date().getTime();
}