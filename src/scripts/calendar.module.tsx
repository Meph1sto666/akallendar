import { Episode, Event, IS, eventFromJson, episodeFromJson, isFromJson} from '@/types/event'
import styles from '@/styles/calendar.module.css'
import { Birthday, birthdayFromJson } from '@/types/birthday'
import eventsJson from '../data/events.json';
import episodesJson from '../data/episodes.json';
import integratedStrategiesJson from '../data/is.json';
import birthdaysJson from '../data/birthdays.json';
import { FilterRule, birthdayFilterFn, eventFilterFn } from '@/types/filter';
import { SortRule } from "@/types/sort";
// var srt = useSort([{key:"day", desc:true}])[1]

export function getEvents(s:string, filterRules?:FilterRule[], sortRules?:SortRule[]):Event[] {
	var events:Event[] = [];
	for (let e of eventsJson[s as keyof typeof eventsJson]) 
		events.push(eventFromJson(e))
	return events;
}
export function getEpisodes(s:string, filterRules?:FilterRule[], sortRules?:SortRule[]):Episode[] {
	var episodes:Episode[] = [];
	for (let e of episodesJson[s as keyof typeof episodesJson]) 
		episodes.push(episodeFromJson(e))
	return episodes;
}
export function getIntegratedStrategies(s:string, filterRules?:FilterRule[], sortRules?:SortRule[]):IS[] {
	var strats:IS[] = [];
	for (let e of integratedStrategiesJson[s as keyof typeof integratedStrategiesJson]) 
		strats.push(isFromJson(e))
	return strats;
}
export function getBirthdays(filterRules?:FilterRule[], sortRules?:SortRule[]):Birthday[] {
	var birthdays:Birthday[] = [];
	for (let bd of birthdaysJson) 
		birthdays.push(birthdayFromJson(bd))
	return birthdays;
}

export function isInWeek(reference:Date, check:Date):boolean {
	let wStart = reference.getDay() == 0 ? reference : new Date(reference.getFullYear(), reference.getMonth(), reference.getDate() - reference.getDay());
	let wEnd = new Date(wStart.getFullYear(), wStart.getMonth(), wStart.getDate() + 7);
	return wStart <= check && check < wEnd;

}
export function isRangeInWeek(reference:Date, from:Date, to:Date):boolean {
	return from <= reference && reference <= to || isInWeek(reference, from) || isInWeek(reference, to);
}

export function monthDiff(from:Date, to:Date):number {
	return to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()))
}
export function shiftWeekday(day:Date, shift:number=6):number {
	return (day.getDay() + shift) % 7;
}

export function eventColor(event:Event):string {
	/**
	 * Auto generating colors by start and end date
	 */
	// let c1 = `${Math.floor(Math.random()*255).toString(16).padStart(2, "0")}${Math.floor(Math.random()*255).toString(16).padStart(2, "0")}${Math.floor(Math.random()*255).toString(16).padStart(2, "0")}`
	// let c2 = `${Math.floor(Math.random()*255).toString(16).padStart(2, "0")}${Math.floor(Math.random()*255).toString(16).padStart(2, "0")}${Math.floor(Math.random()*255).toString(16).padStart(2, "0")}`
	// return `#${c1}, #${c2}`;
	return `#${event.start.getTime().toString(16).slice(-7,-1)}, #${event.end.getTime().toString(16).slice(-7,-1)}`;
}

export function createEvents(lastDayOfMonth:Date, s:string) {
	let eventsMonth = new Array<JSX.Element>();
	let w = 1;
	let events = getEvents(s);
	for (let d = 1; d <= lastDayOfMonth.getDate(); d+=7) {
		let day = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), d);
		for (let e of events) {
			let startCol = 1;
			let endCol = -1;
			let tags = e.name;
			if (!isRangeInWeek(day, e.start, e.end)) continue;
			if (isInWeek(e.start, day)) {
				startCol = (e.start.getDay())*2+2;
				tags += " " + styles.start;
			} else if (isInWeek(e.end, day)) {
				endCol = (e.end.getDay())*2+2;
				tags += " " + styles.end;
			};
			eventsMonth.push(<div className={`${tags} ${styles.event}` } style={{["--colors" as string]: eventColor(e), ["--row" as string]: w, ["--start-column" as string]: startCol, ["--end-column" as string]: endCol}}>{e.name}</div>)
		}
		w++;
	}
	return eventsMonth;
}
export function createIss(lastDayOfMonth:Date, s:string) {
	let isMonth = new Array<JSX.Element>();
	let w = 1;
	for (let d = 1; d <= lastDayOfMonth.getDate(); d+=7) {
		let wDay = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), d);
		for (let i of getIntegratedStrategies(s)) {
			let tags = i.name;
			if (!isInWeek(wDay, i.date)) continue;
			for (let ds = wDay.getDate()-wDay.getDay(); ds <= wDay.getDate()-wDay.getDay()+7; ds++) {
				let day = new Date(wDay.getFullYear(), wDay.getMonth(), ds);
				if (!(i.date.getDate() == day.getDate() && i.date.getMonth() == day.getMonth() && i.date.getFullYear() == day.getFullYear())) continue;
				tags += " ";
				let col = i.date.getDay()*2+1;
				isMonth.push(<div className={`${tags} ${styles.is}` } style={{["--row" as string]: w, ["--column" as string]: col}}>{i.name}</div>)
				break;
			}
		}
		w++;
	}
	return isMonth;
}
export function createEpisodes(lastDayOfMonth:Date, s:string) {
	let epMonth = new Array<JSX.Element>();
	let w = 1;
	for (let d = 1; d <= lastDayOfMonth.getDate(); d+=7) {
		let wDay = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), d);
		for (let e of getEpisodes(s)) {
			let tags = `${e.id}`;
			if (!isInWeek(wDay, e.date)) continue;
			for (let ds = wDay.getDate()-wDay.getDay(); ds <= wDay.getDate()-wDay.getDay()+7; ds++) {
				let day = new Date(wDay.getFullYear(), wDay.getMonth(), ds);
				if (!(e.date.getDate() == day.getDate() && e.date.getMonth() == day.getMonth() && e.date.getFullYear() == day.getFullYear())) continue;
				tags += " ";
				let col = e.date.getDay()*2+1;
				epMonth.push(<div className={`${tags} ${styles.is}` } style={{["--row" as string]: w, ["--column" as string]: col}}>{e.id}</div>)
				break;
			}
		}
		w++;
	}
	return epMonth;
}
export function createBirthdays(startDate:Date, lastDayOfMonth:Date) {
	let bdMonth = new Array<JSX.Element>();
	let w = 1;
	let today = new Date();
	let birthdays = getBirthdays();
	// birthdays.sort(srt)
	for (let d = 1; d <= lastDayOfMonth.getDate(); d+=7) {
		let wDay = new Date(startDate.getFullYear(), lastDayOfMonth.getMonth(), d);
		for (let e of birthdays) {
			e.day.setFullYear(today.getFullYear());
			let tags = `${e.operator_id}`;
			if (!isInWeek(wDay, e.day)) continue;
			for (let ds = wDay.getDate()-wDay.getDay(); ds <= wDay.getDate()-wDay.getDay()+7; ds++) {
				let day = new Date(wDay.getFullYear(), wDay.getMonth(), ds);
				if (!(e.day.getDate() == day.getDate() && e.day.getMonth() == day.getMonth() && e.day.getFullYear() == day.getFullYear())) continue;
				tags += " ";
				let col = e.day.getDay()*2+1;
				bdMonth.push(<div className={`${tags} ${styles.is}` } style={{["--row" as string]: w, ["--column" as string]: col}}>{e.operator_name}</div>);
				break;
			}
		}
		w++;
	}
	return bdMonth;
}