import React from 'react'
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAuth } from '../../firebase/AuthContext'
import { useRouter } from 'next/router'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileDropdown() {
    const router = useRouter()
    const [Error, setError] = useState({})
    const { currentUser, logout } = useAuth()

    async function signOutHandler() {
        setError('')

        try {
            await logout()
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <Menu as="div" className="ml-3 relative self-end">
            <div>
                <Menu.Button className="max-w-xs  rounded-full flex transition-all items-center text-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-200 lg:p-2 lg:rounded-md lg:hover:bg-gray-100">
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/icons%2Fperson.fill.svg?alt=media&token=d15cd625-303a-4a30-b9d0-b92849b925cd"
                        alt=""
                    />
                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>{currentUser ? currentUser.email : "No user"}
                    </span>
                    <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/*<Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Your Profile
                            </a>
                        )}
                        </Menu.Item>*/}
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="/ownerdashboard.html"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Dashboard
                            </a>
                        )}
                    </Menu.Item>
                    {/*<Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                                Settings
                            </a>
                        )}
                        </Menu.Item>*/}
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="index.html"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={signOutHandler}
                            >
                                Logout
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
