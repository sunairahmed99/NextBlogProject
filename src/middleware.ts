import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export async  function middleware(request: NextRequest) {
const token = request.cookies.get('tokenn')?.value || ''
const path = request.nextUrl.pathname
const ispublicpath = path === '/login' || path === '/register'
const islogout = path === '/Logout' 
const isprotectedpath = path === '/profile' || path === '/Dasboard_Blog' || path === '/Dashboard_Blog_sel' || path === '/Dashboard_Blog_update/id'


if(ispublicpath && token){
    console.log('runnn')
    return NextResponse.redirect(new URL('/', request.url))
}

if(isprotectedpath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
}

}

export const config = {
  matcher:[
    '/',
    '/login',
    '/register',
    '/profile',
    '/profile/id',
    '/Dasboard_Blog',
    '/Dashboard_Blog_sel',
    '/Dashboard_Blog_update/:id*'

  ],
}