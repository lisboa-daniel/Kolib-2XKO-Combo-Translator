import { NextResponse } from 'next/server';

import { getData } from '@/app/lib/data';
import { createUser } from '@/app/lib/actions';

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


export async function POST(request: Request) {
  try {

    const body = await request.json();

    const user = await createUser(body);


    return NextResponse.json({
      response: 201,
      message: "User created successfully",
      data: { body } // Return any relevant data
    });
  } catch (err: any) {
    return NextResponse.json({
      response: 500,
      message: "An error occurred",
      error: err.message,
    });
  }
}