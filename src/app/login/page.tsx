'use client';

import Title from "@/app/ui/title";
import { VERSION } from "@/app/scripts/changelog";
import Label from "@/app/ui/form/label";
import Button  from "@/app/ui/button";
import { useState } from "react";
import { Header } from "../ui/header";
import { Typography } from "@mui/material";
import { boldFont } from "../ui/fonts";

export default function page(){


	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	

	return (

		
	    <main className="text-sm md:text-nm bg-fixed flex-col bg-cover bg-[url(/bg.jpg)] pr-6 pl-6 pt-4 pb-[240px]">

		<div className="flex flex-row w-[full] items-center justify-start p-4">
			<img src="/logo.svg" className="w-24 h-24"/>
			<Typography className={`p-1 bg-black ${boldFont.className}`}>
                KOLIB
            </Typography>
		
		</div>


		<div className="flex flex-col w-[full] items-center justify-center p-4">
			< Title text="Login" style={' text-2xl font-extrabold text-[#1c1c1c] mb-2 bg-blue-500 p-2 '}/>
		
		</div>




		<div className=" flex flex-col items-center justify-center w-full">
			
			<form id="form" className="bg-black bg-opacity-65 p-3 flex flex-col items-center justify-center shadow-xl ">
			
				<div className="w-[380px] mt-2 hidden">
				<Label title="Username:" style="text-xl"/>
				<input value={username} onChange={(e) => setUsername(e.target.value)} id="combo_input" className={' border-1 border-green-400 outline-none w-full text-sm md:text-xl p-2 bg-black bg-opacity-65'} name="combo" type="text"/>
				</div>

				<div className="w-[380px] mt-2">   
				<Label title="Email:" style="text-xl"/>
				<input value={email} onChange={(e) => setEmail(e.target.value)} id="combo_input" className={' border-1 border-green-400 outline-none w-full text-sm md:text-xl p-2 bg-black bg-opacity-65'} name="combo" type="email"/>
				</div>
				<div className="w-[380px] mt-2">   
				<Label title="Password:" style="text-xl"/>
				<input value={password} onChange={(e) => setPassword(e.target.value)} id="combo_input" className={'border-1 border-green-400 outline-none w-full text-sm md:text-xl p-2 bg-black bg-opacity-65'} name="combo" type="password"/>
				</div>
				<div className="w-[380px] mt-2 hidden">
				<Label title="Repeat Password:" style="text-xl"/>
				<input value={password2} onChange={(e) => setPassword2(e.target.value)} id="combo_input" className={'border-1 border-green-400 outline-none w-full text-sm md:text-xl p-2 bg-black bg-opacity-65'} name="combo" type="password"/>
				</div>   

				<Button
					label="Sign up"
					onClickHandler={() => 2}
					className=" m-3 text-xl items-end bg-pink-400 hover:bg-pink-500"
				/> 

				<label>
					Doesn't have an account? <a href="#" className="underline text-bold">Create here</a>
				</label>
			</form>
       

			<footer className="text-sm text-center justify-center w-full md:w-[50%] items-center mt-16 bg-black bg-opacity-65"> 
				<p >
				KOLIB is a free tool made by a fan for the FGC / 2XKO community and not affiliated with Riot Games. 2XKO have all rights reserved for Riot Games, Inc © 2025 </p>
				
				<p>
				This page is protected with hcaptcha. Read more about in <a href="#" className="underline font-bold">privacy policy</a>
				</p>
		

				</footer>
		</div>
     	


        </main>

	);
}