import Head from "next/head";
import styles from '@/styles/calendar.module.css';
import {monthDiff, createBirthdays, getBirthdays} from '@/scripts/calendar.module.tsx';
import { useState, useCallback } from "react"
import { birthdayFilterFn } from "@/types/filter";

function createGrid(startDate:Date, endDate:Date):JSX.Element[] {
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
		// let overlay = createEvents(startDate, lastDayOfMonth).concat(createIss(startDate, lastDayOfMonth)).concat(createEpisodes(startDate, lastDayOfMonth));
		let overlay = createBirthdays(startDate, lastDayOfMonth);
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
	const start = new Date("2023-03-07T00:00:00.000Z");
	const end = new Date("2023-11-02T00:00:00.000Z");
	return (
		<>
			<Head>
				<title>Calendar</title>
			</Head>
			<div>
				{createGrid(start, end)}
			</div>
		</>
	)
}