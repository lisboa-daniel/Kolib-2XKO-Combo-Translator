'use client';

import Title from "@/app/ui/title";
import { VERSION } from "@/app/scripts/changelog";
import Label from "@/app/ui/form/label";
import Button  from "@/app/ui/button";
import { useState } from "react";

export default function page(){


	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	

	return (
	    <main className="text-sm md:text-nm flex  w-full flex-col items-center justify-between pl-2 pr-2 md:pl-24 md:pr-24  pb-12">
  		<div className="left-0 flex flex-row w-full items-start justify-center h-[170px] z-50 fixed bg-[#0e0e0e] ">

        <img src="/logo.svg" alt="logo" className="bg-white p-[1px] w-[48px] md:w-[64px] mt-6  md:mt-3 mr-2 ml-2 rounded-xl "/>

        <Title text="2XKO Combo Translator" style="  text-center text-xl md:text-4xl mt-8" />
        <p className="text-left mt-8">&nbsp;{VERSION}</p>


      	</div>

   

     	<form id="form" className="bg-black p-3 flex flex-col mt-[180px] items-center justify-center">
	   	   	<div className="text-2xl font-extrabold flex flex-col w-[full] items-center justify-center">
      			< Title text="Create an account or sign in" style={'text-[#1c1c1c] mb-2 bg-blue-500 p-2'}/>
      	</div>
		   	<div className="w-[380px] mt-2">
			   <Label title="Username:"/>
			   <input value={username} onChange={(e) => setUsername(e.target.value)} id="combo_input" className={'outline-none w-full text-sm md:text-xl p-2 '} name="combo" type="text"/>
			</div>
			<div className="w-[380px] mt-2">   
	   		   <Label title="Email:"/>
			   <input value={email} onChange={(e) => setEmail(e.target.value)} id="combo_input" className={'outline-none w-full text-sm md:text-xl p-2 '} name="combo" type="email"/>
			</div>
			<div className="w-[380px] mt-2">   
			   <Label title="Password:"/>
			   <input value={password} onChange={(e) => setPassword(e.target.value)} id="combo_input" className={'outline-none w-full text-sm md:text-xl p-2 '} name="combo" type="password"/>
			</div>
			<div className="w-[380px] mt-2">
			   <Label title="Repeat Password:"/>
			   <input value={password2} onChange={(e) => setPassword2(e.target.value)} id="combo_input" className={'outline-none w-full text-sm md:text-xl p-2 '} name="combo" type="password"/>
			</div>   

          	<Button
                label="Sign up"
                onClickHandler={() => 2}
                className=" m-3 items-end bg-green-500 hover:bg-green-600"
          	/>  
     	</form>
       
        </main>

	);
}