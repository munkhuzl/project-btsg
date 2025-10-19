'use server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const getEmail = async()=>{
    const cookieStore = cookies();
    const token = (await cookieStore).get('authtoken')?.value || '';
    const decoded = jwt.decode(token);

    if(decoded && typeof decoded ==='object'){
        const {email}= decoded;
        return email;
    }


}