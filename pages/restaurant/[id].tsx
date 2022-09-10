/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState, useEffect } from 'react'
import NavBar from '../../components/Nav/NavBar'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import GenreBadge from '../../components/Functionality/GenreBadge'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import $ from 'jquery'
//import { XIcon } from '@heroicons/react/outline'
import XIcon from '../../components/Icons/XIcon'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import SearchCards from '../../components/Functionality/SearchCards'
import { sortOptions, subCategories, filters } from '../../components/reused_variables/searchFilterConstants'
import { useActiveRestaurantContext, useUpdateActiveRestaurantContext } from '../../src/context/ActiveRestaurantContext'
import MenuCards from '../../components/Functionality/MenuCards'
import { useRouter } from 'next/router'
//firebase imports
import { db } from '../../firebase/clientApp';
import { doc, getDoc } from "firebase/firestore"
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useAuth } from '../../firebase/AuthContext'
import { async } from '@firebase/util'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

//TODO: if no active restaurant then need to fetch.  for example if someone directly types the restaurant URL and it isnt passed from restaurant list
export default function restaurantPage() {

  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { currentUser } = useAuth()
  console.log(currentUser)
  const [loadedRestaurant, setLoadedRestaurant] = useState()
  let activeRestaurant = useActiveRestaurantContext()
  const updateActiveRestaurant = useUpdateActiveRestaurantContext()

  const [filteredItems, setFilteredItems] = useState([])
  //firebase reference
  const menuItemCollectionReference = collection(db, 'MenuItems')
  const router = useRouter()
  const restaurantURL = router.query.id





  const [menuItemArray, setMenuItemArray] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(() => {
    //if activeRestaurant, run effect
    //if no activeRestaurant, return and wait for active restaurant
    const fetchData = async () => {
      const menuItemQuery = query(menuItemCollectionReference, where("restaurantID", "==", restaurantURL), where("isPublished", "==", true));
      getDocs(menuItemQuery)
        .then((querySnapshot) => {
          const newMenuItemDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          setMenuItemArray(newMenuItemDataArray);
        })
        .catch((err) => {
          console.error("Failed to get data", err)
        })

    }
    fetchData()

  }, []);
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date()
  let day = weekday[date.getDay()]
  console.log('DAY', day)
  const filterItems = (index) => {
    console.log(index)
    console.log(menuItemArray)
    let filteredFoodMenu = []
    for (let item of menuItemArray) {
      if (item.menuHeaderID === index) {
        filteredFoodMenu.push(item)
      }
    }
    setFilteredItems(filteredFoodMenu)
  }
  $(window).scroll(function () {
    $("#fixedHeaderNav").css("top", Math.max(-40, 670 - $(this).scrollTop()));
  });
  useEffect(() => {
    //get restaurant
    if (activeRestaurant) return;

    if (typeof window === 'object') {
      var pathname = window.location.pathname
      pathname = pathname.replace('/restaurant/', '')
      var restaurantDocumentReference = doc(db, "Restaurant", pathname);

      async function getSingleRestaurant() {
        const docSnap = await getDoc(restaurantDocumentReference).then((data) => {
          updateActiveRestaurant(data.data())

        }, () => { console.log("No such document!"); })
        return docSnap
      };
      getSingleRestaurant()
    }

  }, []);
  return (
    /* This example requires Tailwind CSS v2.0+ */
    <>
      <html className="scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        <NavBar />
        <div className="bg-white w-[100vw]">
          <div aria-hidden="true" className="relative">
            <img
              src={activeRestaurant ? activeRestaurant.restaurantSettings.restaurantHeaderImageURL : "https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/defaultBackgroundHeader.png?alt=media&token=5e5b463a-6feb-4207-b4a8-ce9912d6198f"}
              alt=""
              className="w-full h-96 object-center object-cover opacity-90 bg-black"
            />
            <div className="absolute opacity-80 inset-0 bg-gradient-to-t from-slate-900" />
          </div>
          <div className="flex flex-col">
            <div>
              <div className=" max-w-7xl pb-4 px-4 pt-10 sm:pb-5 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 text-center">

                  {activeRestaurant ? <>

                    <h2 className="text-3xl text-left font-extrabold tracking-tight text-gray-900 sm:text-4xl">{activeRestaurant.restaurantInformation.restaurantName}</h2>

                    <div className="flex">
                      <a className=" mt-2 text-[#868686] text-sm" target="_blank" href={`https://www.google.com/maps/place/${activeRestaurant.restaurantInformation.restaurantAddress.street.replaceAll(' ', '+')}+${activeRestaurant.restaurantInformation.restaurantAddress.city.replaceAll(' ', '+')},+${activeRestaurant.restaurantInformation.restaurantAddress.state}+${activeRestaurant.restaurantInformation.restaurantAddress.zip}`}>{`${activeRestaurant.restaurantInformation.restaurantAddress.street} ${activeRestaurant.restaurantInformation.restaurantAddress.city}, ${activeRestaurant.restaurantInformation.restaurantAddress.state} ${activeRestaurant.restaurantInformation.restaurantAddress.zip}`}</a>
                    </div>

                    <div className='flex'>
                      <p className=" mt-2 text-[#868686] text-sm text-left" >{activeRestaurant.restaurantInformation.hours[day]}</p>
                    </div>
                    <div className="flex">
                      <a className="mt-2 text-[#868686] text-sm" href={`https://${activeRestaurant.restaurantInformation.websiteURL.replace(/^https?:\/\//, '')}`} target="_blank">{activeRestaurant.restaurantInformation.websiteURL}</a>
                    </div>
                    {console.log(activeRestaurant.restaurantInformation.restaurantAddress.street.replaceAll(' ', '+'), 'LKDFLKSDJFSLDKFJJDKLF')}
                    <div className=" flex mt-5 justify-start">
                      <GenreBadge value={Object.entries(activeRestaurant.restaurantSettings.restaurantGenre)} priceRange={activeRestaurant.restaurantSettings.priceRange} />
                    </div>



                  </> :
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"></h2>}
                  <p className="mt-4 text-gray-500">
                  </p>
                </div>
              </div>

            </div>
            <div className="w-full">
              <div className="min-w-[100%]">
                <div id="fixedHeaderNav" className="flex bg-[#FFFFFF] min-w-full overflow-auto fixed  max-w-[100vw] whitespace-nowrap border-b-2 border-black-100 p-3 flex-col mt-10 justify-center">
                  <ul className="w-[full] inline-flex md:justify-center">
                    {
                      activeRestaurant ? (activeRestaurant.menuHeaderArray.map((item) => (
                        <li className="mr-6 m-2 h-full font-semibold rounded text-center hover:drop-shadow-xl active:underline transition-all hover:underline hover:cursor-pointer">
                          <Link smooth={true} to={`${item}`} spy={true} className={item} activeClass="active">{item}</Link>
                        </li>
                      ))
                      ) : <h1>"Loading"</h1>
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-blue w-3 h-10"></div>
            <MenuCards menuItems={menuItemArray} />
          </div>
        </div>
      </html>
    </>
  )
}

