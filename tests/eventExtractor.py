import json
import datetime as dt

def events() -> None:
	data:dict[str, dict[str, list[dict[str, list[int]]]]] = json.load(open("./tests/events.json", "r"))
	events:dict[str, list[dict[str, str | bool]]] = {};
	for s in data:
		for y in data[s]:
			for e in data[s][y]:
				start: str = f"{y}-{str(e['start'][0]).rjust(2 ,'0')}-{str(e['start'][1]).rjust(2, '0')}"
				end: str = (dt.datetime.fromisoformat(start) + dt.timedelta(int(str(e["duration"])))).isoformat()[:10]
				if events.get(s) == None:
					events[s] = [] 
				events[s].append({
					"start": start,
					"end": end,
					"name": str(e["event"]),
				})
				events[s]
				if e.get("rerun"): 
					events[s][-1]["rerun"] = True

	json.dump(events, open(f"./tests/events.json", "w"), indent=4)

def eps() -> None:
	data:dict[str, list[dict[str, list[int]]]] = json.load(open("./tests/episodes.json", "r"))
	events:dict[str, list[dict[str, str | bool]]] = {};
	for s in data:
		for e in data[s]:
			releaseDate: str = f"{e['date'][0]}-{str(e['date'][1]).rjust(2 ,'0')}-{str(e['date'][2]).rjust(2, '0')}"
			if events.get(s) == None:
				events[s] = [] 
			events[s].append({
				"date": releaseDate,
				"id": str(e["id"]),
			})
	json.dump(events, open(f"./tests/episodes.json", "w"), indent=4)

def istrats() -> None:
	data:dict[str, list[dict[str, list[int | str]]]] = json.load(open("./tests/is.json", "r"))
	events:dict[str, list[dict[str, str | bool]]] = {};
	for s in data:
		for e in data[s]:
			releaseDate: str = f"{e['date'][0]}-{str(e['date'][1]).rjust(2 ,'0')}-{str(e['date'][2]).rjust(2, '0')}"
			if events.get(s) == None:
				events[s] = [] 
			events[s].append({
				"date": releaseDate,
				"name": str(e["id"]),
			})
	json.dump(events, open(f"./tests/is.json", "w"), indent=4)
  
eps()
events()
istrats()