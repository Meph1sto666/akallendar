export interface Birthday {
	operator_id: string;
	operator_name: string;
	day: Date;
}
export interface JsonBirthdayObj {
	operator_id: string;
	operator_name: string;
	day: string;
}



export function birthdayFromJson(json:JsonBirthdayObj):Birthday {
	return {
		operator_id: json.operator_id,
		operator_name: json.operator_name,
		day: new Date(`${new Date().getFullYear()}-${json.day}`)
	}
}