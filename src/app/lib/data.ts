"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {

    process.env.DATABASE_URL

    var url : string = '';

    if (process.env.DATABASE_URL) url = process.env.DATABASE_URL;

    const sql = neon(url);
    const data = await sql`SELECT * FROM USERS`;
    return data;
}