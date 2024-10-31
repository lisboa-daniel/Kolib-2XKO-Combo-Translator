export type User = {
	id:string,
	username:string,
	password:string,
	email:string,
	createdAt: Date,
}


export type ApiKey = {
	id:string,
	createdAt:string,
	expiresAt: Date,
	userId: string,
}
