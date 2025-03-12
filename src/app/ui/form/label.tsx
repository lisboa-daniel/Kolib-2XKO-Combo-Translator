
interface LabelProps {
	title : string,
	bg? : string,
	style?: string
}

export default function Label({title, bg = 'bg-green-500', style} : LabelProps){
	return (
		<label className={`text-[#1c1c1c]  w-[120px] pl-1 pr-1 text-left text-sm mt-5 ${bg} ${style}`}>{title}</label> 
	);
}