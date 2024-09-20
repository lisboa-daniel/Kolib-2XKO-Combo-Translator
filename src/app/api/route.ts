import { NextResponse } from 'next/server'

import { getData } from '@/app/lib/data'

export async function GET(){

  try {
    const data  = await getData();
    return NextResponse.json({
        response: 200,
        message: "hello",
        data: data
    });
  } catch (err : any) {
    throw err;
  }

  
  
}