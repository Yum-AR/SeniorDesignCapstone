import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';

import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import { navigationSidebar } from '../reused_variables/variables';
import Ownerdashboard from '../../pages/OwnerDashboard';
import { db } from '../../firebase/clientApp';
import { useAuth } from '../../firebase/AuthContext';
import MenuEdit from './MenuEdit';
import OwnerDashboardRestauruant from './OwnerDashboardRestaurant';

export default function Sidebar() {
  const { currentUser } = useAuth();
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ restaurantId, setRestaurantId ] = useState();

  const router = useRouter();
  function classNames(...classes) {
    return classes.filter(Boolean).join(` `);
  }

  const ownersCollectionReference = collection(db, `Owners`);

  const fetchOwnerData = async () => {
    const findOwnerQuery = query(ownersCollectionReference, where(`userID`, `==`, currentUser.uid));
    await getDocs(findOwnerQuery)
      .then((querySnapshot) => {
        const ownerData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(ownerData);

      });
  };

  useEffect(() => {
    fetchOwnerData();
  }, []);

  return (

    <>
      {/*
          This example requires updating your template:

          ```
          <html class="h-full bg-white">
          <body class="h-full overflow-hidden">
          ```
        */}

      <div className="h-full flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-full pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/appicon.svg?alt=media&token=e1e697e6-eb8f-4f01-97f3-201ebd43b904"
                      alt="Yummr"
                    />
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="px-2 space-y-1">
                      {navigationSidebar.map((item) =>
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            console.log(item),
                            item.current
                              ? `bg-gray-100 text-gray-900`
                              : `text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
                            `group flex items-center px-2 py-2 text-base font-medium rounded-md`,
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? `text-gray-500` : `text-gray-400 group-hover:text-gray-500`,
                              `mr-4 h-6 w-6`,
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>)}
                    </div>
                  </nav>
                </div>

              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">

                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="px-2 space-y-1">
                    {navigationSidebar.map((item) =>
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? `bg-gray-200 text-gray-900`
                            : `text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
                          `group flex items-center px-2 py-2 text-sm font-medium rounded-md`,
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? `text-gray-500` : `text-gray-400 group-hover:text-gray-500`,
                            `mr-3 h-6 w-6`,
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>)}

                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/appicon.svg?alt=media&token=e1e697e6-eb8f-4f01-97f3-201ebd43b904"
                  alt="Workflow"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          {<OwnerDashboardRestauruant />}

        </div>
      </div>
    </>
  );
}
