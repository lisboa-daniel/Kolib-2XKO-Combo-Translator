"use server";

import { neon } from "@neondatabase/serverless";
import Connect from '@/app/lib/conn';


export async function getData() {
    try {
         const sql = await Connect();

        const data = await sql`SELECT * FROM USERS`;
        return data;
    } catch (err:any) {
        throw err;
    }
  
}