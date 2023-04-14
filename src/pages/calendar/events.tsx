import Head from 'next/head'
import styles from '@/styles/calendar.module.css'
import { useRouter } from 'next/router'
import { createIss, createEpisodes, createEvents, monthDiff, getEvents } from '@/scripts/calendar.module.tsx'
import { FilterRule } from '@/types/filter'
import { SortRule } from '@/types/sort'

function createGrid(startDate:Date, endDate:Date, s:string, filterRules:FilterRule[]=[], sortRules:SortRule[]=[]):JSX.Element[] {
	var today:Date = new Date();
	var sections = new Array<JSX.Element>();
	for (let m = startDate.getMonth(); m <= startDate.getMonth() + monthDiff(startDate, endDate); m++) {
		var firstDayOfMonth = new Date(startDate.getFullYear(), m, 1);
		var lastDayOfMonth = new Date(startDate.getFullYear(), m+1, 0);
		let days = new Array<JSX.Element>();
		for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
			let day = new Date(startDate.getFullYear(), m, d+1);
			// let tags = today == day ? "day today" : "day";
			days.push(d == 1 ? <div className={`${styles.day}`} style={{["--start-column" as string]: firstDayOfMonth.getDay()+1}}>{d}</div> : <div className={styles.day}>{d}</div>)
		}
		let overlay = createEvents(lastDayOfMonth, s).concat(createIss(lastDayOfMonth, s)).concat(createEpisodes(lastDayOfMonth, s));
		sections.push(
			<section className={`${styles.section} ${(firstDayOfMonth.getDay()==0)?"":styles.sectionShift}`}>
				<div className={`${styles.month}`}>{days}</div>
				<div className={`${styles.overlay}`}>{overlay}</div>
			</section>
		)
	}
	return (sections)
}

export default function EventCalendar() {
	const rout = useRouter();
	let s = rout.query.s?.toString()??"future";
	let events = getEvents(s);
	
	const start = events[0].start;
	const end = events[events.length-1].end;
	return (
		<>
			<Head>
				<title>Calendar - {s.toUpperCase()}</title>
			</Head>
			<div>
				{createGrid(start, end, s)}
				{/* , rout.query.filter, rout.query.sort */}
			</div>
		</>
	)
}