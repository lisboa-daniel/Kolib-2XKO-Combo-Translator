import { NextResponse } from 'next/server'



export async function POST(req: Request){
  const data = await req.json();
  return NextResponse.json({
        response: 200,
        query: data.query,
        data: {
          svg: ''
        }
    
    });
  
}