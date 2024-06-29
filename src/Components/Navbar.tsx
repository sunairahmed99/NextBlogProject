"use client"
import React, {useEffect } from 'react'
import Image from 'next/image';
import {Disclosure,DisclosureButton,DisclosurePanel,Menu,MenuButton,MenuItem,MenuItems,Transition,} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import Link from 'next/link'

  
function classNames(...classes:(string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}


export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>()
  const [stoken,gtoken] = React.useState(false)
  const {user} = useSelector(userdata)
  let users:any;
  let navigation:any;
  let userNavigation:any;

  if(user && stoken ==true && user.length !== 0 && user.role !== 'admin'){

     users = {
      name: user.name,
      email:user.email,
      imageUrl:user && user.image ? `/user/${user.image}` :  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' ,
    }
   

    navigation = [
      { name: 'Home', href: '/', current: true },
      { name: 'Blog', href: '/Blog', current: true },
      { name: 'Dashboard', href: '/Dashboard_Blog_sel', current: true },
      { name: 'BlogPost', href: '/Dasboard_Blog', current: true },
      { name: 'Logout', href: '/Logout', current: true },
    ]

    userNavigation = [
      { name: 'My Profile', href: '/profile'},
      { name: 'Update Password', href: '#' },
      { name: 'Sign out', href: '/Logout'},
    ]
  }
  else if(user && stoken && user.length !== 0 && user.role === 'admin'){

    users = {
      name: user.name,
      email:user.email,
      imageUrl:user && user.image ? `/user/${user.image}` :  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' ,
    }

    navigation = [
      { name: 'Home', href: '/', current: true },
      { name: 'Blog', href: '/Blog', current: true },
      { name: 'HomeBlog', href: '/Admin/Dashboard_Homeblog', current: true },
      { name: 'HomeBlogSel', href: '/Admin/Dashboard_Homeblogsel', current: true },
      { name: 'AdminBlog', href: '/Admin/Dashboard_Blog', current: true },
      { name: 'Blogsel', href: '/Admin/Dashboard_Blog_sel', current: true },
      { name: 'Users', href: '/Admin/Dashboard_Users', current: true },
      { name: 'All Comment', href: '/Admin/Dashboard_Comment', current: true },
    ]

    userNavigation = [
      { name: 'Sign out', href: '/Logout' },
    ]

  }
  else{

     users = {
      name: 'guest',
      email: 'guest@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }

    navigation = [
      { name: 'Home', href: '/', current: true },
      { name: 'Blog', href: '/Blog', current: true },
      { name: 'Dashboard', href: '/Dashboard_Blog_sel', current: true },
      { name: 'BlogPost', href: '/Dasboard_Blog', current: true },
      { name: 'Register', href: '/register', current: true },
      { name: 'Login', href: '/login', current: true },
    ]

    userNavigation = [
      { name: 'Sign in', href: '/login' },
    ]
  }

  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(token){
      gtoken(true)
      dispatch(getUser(token))
    }else{
      gtoken(false)

    }
  },[dispatch])
  return (
    <>
     <div className="min-h-full">
        <Disclosure as="nav" className="bg-blue-900">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <Image
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                      width={8} // Adjust width as per your design needs
                      height={8}
                      priority// Adjust height as per your design needs
                    />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation?.map((item:any) => (
                          <Link
                            key={item?.name}
                            href={item?.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <Image className="h-8 w-8 rounded-full" src={users?.imageUrl} alt={users?.imageUrl} height={8} width={8}  priority/>
                          </MenuButton>
                        </div>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation?.map((item:any) => (
                              <MenuItem key={item.name}>
                                {({ focus }) => (
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      focus ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation?.map((item:any) => (
                    <Link
                      key={item?.name}
                      href={item?.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image className="h-10 w-10 rounded-full" src={users?.imageUrl} alt={users?.imageUrl} height={10} width={10}  priority/>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{users?.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{users?.email}</div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation?.map((item:any) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
