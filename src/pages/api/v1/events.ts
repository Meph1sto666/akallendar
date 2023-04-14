import type { NextApiRequest, NextApiResponse } from 'next'
import { getEvents } from "@/scripts/calendar.module";
import { Event } from '@/types/event';

type ReqError = {
	status:string;
	msg:string;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Event[]|ReqError>
  ) {
	if (req.query.s == null || req.query.s == undefined) {
		res.status(500).json({status:"error", msg:"missing parameter"})
		return;
	};
	res.status(200).json(getEvents(req.query.s?.toString()??"future"))
  }
  