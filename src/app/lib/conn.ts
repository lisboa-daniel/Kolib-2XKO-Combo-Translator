"use server";

import { neon } from "@neondatabase/serverless";

export default async function Connect() {
    try {
    	const db_url : string = (process.env.DATABASE_URL != undefined) ? process.env.DATABASE_URL : '';
 		const sql = neon(db_url);
	    return sql;

    } catch (err:any) {
    	throw `${err}: an error was found while connecting to the database`;
    }

    
}