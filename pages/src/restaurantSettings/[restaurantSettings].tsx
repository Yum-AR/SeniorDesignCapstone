import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NavBar from '../../reusableItems/components/NavBar';
export default function RestaurantSettings() {
  const [ open, setOpen ] = useState(false);
  const router = useRouter();
  const restaurantID = router.query.restaurantSettings;
  console.log(`ROUTER QUERY`, router.query);
  const [ restaurant, setRestaurant ] = useState();

  // ! implement appropiate model from Prisma
  // const fetchData = async () => {
  //     let data;
  //     let restaurantQuery = query(restaurantCollectionReference, where("restaurantID", "==", restaurantID))
  //     await getDocs(restaurantQuery)
  //         .then((querySnapshot) => {
  //             const restaurantData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //             setRestaurant(restaurantData)
  //             data = restaurantData
  //             return data
  //         })
  //     return data
  // }
  useEffect(() => {
  // ! implement appropiate model from Prisma
    // fetchData().then((data) => {
    //     let diets = ['glutenFree', 'halal', 'kosher', 'vegan', 'vegetarian']
    //     let cuisines = ['american', 'bakery', 'chinese', 'fastFood', 'french',
    // 'indian', 'italian', 'japanese', 'mexican', 'pizza', 'seafood', 'steak', 'thai']
    //     const dietaryChecker = (dietArr, objectSpot) => {
    //         for (let diet of dietArr) {
    //             let dietInput = document.getElementById(diet)
    //             if (data[0].restaurantSettings[objectSpot][diet] === true) {
    //                 dietInput.checked = true
    //             } else {
    //                 dietInput.checked = false
    //             }
    //         }

    //     }
    //     console.log(data[0].restaurantSettings.dietary.glutenFree)
    //     dietaryChecker(diets, 'dietary')
    //     dietaryChecker(cuisines, 'restaurantGenre')
    // })
    const monday_start = document.getElementById(`monday_start`);
    const monday_end = document.getElementById(`monday_end`);

    const tuesday_start = document.getElementById(`tuesday_start`);
    const tuesday_end = document.getElementById(`tuesday_end`);

    const wednesday_start = document.getElementById(`wednesday_start`);
    const wednesday_end = document.getElementById(`wednesday_end`);

    const thursday_start = document.getElementById(`thursday_start`);
    const thursday_end = document.getElementById(`thursday_end`);

    const friday_start = document.getElementById(`friday_start`);
    const friday_end = document.getElementById(`friday_end`);

    const saturday_start = document.getElementById(`saturday_start`);
    const saturday_end = document.getElementById(`saturday_end`);

    const sunday_start = document.getElementById(`sunday_start`);
    const sunday_end = document.getElementById(`sunday_end`);

    monday_start.value = `12:00`;
    monday_end.value = `00:00`;

    tuesday_start.value = `12:00`;
    tuesday_end.value = `00:00`;

    wednesday_start.value = `12:00`;
    wednesday_end.value = `00:00`;

    thursday_start.value = `12:00`;
    thursday_end.value = `00:00`;

    friday_start.value = `12:00`;
    friday_end.value = `00:00`;

    saturday_start.value = `12:00`;
    saturday_end.value = `00:00`;

    sunday_start.value = `12:00`;
    sunday_end.value = `00:00`;
  }, []);
  $(`li`).hover(function() {
    $(this).addClass(`active`);
  }, function() {
    $(this).removeClass(`active`);
  });

  // ! implement appropiate model from Prisma
  // const restaurantRef = doc(db, "Restaurant", restaurantID)
  const submitConfirmed = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleHoursForm = async (e) => {
    e.preventDefault();
    const hoursForm = document.getElementById(`hours_form`);
    console.dir(hoursForm);
    const mondayHours = `${hoursForm[0].value} - ${hoursForm[1].value}`;
    const tuesdayHours = `${hoursForm[2].value} - ${hoursForm[3].value}`;
    const wednesdayHours = `${hoursForm[4].value} - ${hoursForm[5].value}`;
    const thursdayHours = `${hoursForm[6].value} - ${hoursForm[7].value}`;
    const fridayHours = `${hoursForm[8].value} - ${hoursForm[9].value}`;
    const saturdayHours = `${hoursForm[10].value} - ${hoursForm[11].value}`;
    const sundayHours = `${hoursForm[12].value} - ${hoursForm[13].value}`;
    const week = {
      Monday: mondayHours,
      tuesday: tuesdayHours,
      wednesday: wednesdayHours,
      thursday: thursdayHours,
      friday: fridayHours,
      saturday: saturdayHours,
      sunday: sundayHours,
    };

    // ! implement appropiate model from Prisma
    // await updateDoc(restaurantRef, {
    //     "restaurantInformation.hours": week
    // }).then(() => {
    //     submitConfirmed()
    // })

  };
  const handleAddressForm = async (e) => {
    e.preventDefault();
    const addressForm = document.getElementById(`addressForm`);
    console.dir(`form`, addressForm);
    const street = document.getElementById(`restaurantAddressStreet`).value;
    console.log(street);
    const city = document.getElementById(`restaurantAddressCity`).value;
    const state = document.getElementById(`restaurantAddressState`).value;
    const zip = document.getElementById(`restaurantAddressZip`).value;

    const address = {
      city,
      latitudeLongitude: ``,
      state,
      street,
      zip,
    };

    // ! implement appropiate model from Prisma
    // await updateDoc(restaurantRef, {
    //     "restaurantInformation.restaurantAddress": address
    // }).then(() => {
    //     submitConfirmed()
    // })
  };

  const handleDietaryForm = async (e) => {
    e.preventDefault();
    const dietaryForm = document.getElementById(`dietaryForm`);
    console.dir(dietaryForm);
    const cuisines = [];
    for (const index of dietaryForm) {
      cuisines.push(index.checked);
    }
    const dietaryValues = cuisines.slice(0, 5);
    const cuisineValues = cuisines.slice(5, -1);
    console.log(cuisineValues);
    const dietaryOptions = {
      glutenFree: dietaryValues[0],
      halal: dietaryValues[1],
      kosher: dietaryValues[2],
      vegan: dietaryValues[3],
      vegetarian: dietaryValues[4],
    };
    const cuisineOptions = {
      american: cuisineValues[0],
      bakery: cuisineValues[1],
      chinese: cuisineValues[2],
      fastFood: cuisineValues[3],
      french: cuisineValues[4],
      indian: cuisineValues[5],
      italian: cuisineValues[6],
      japanese: cuisineValues[7],
      mexican: cuisineValues[8],
      pizza: cuisineValues[9],
      seafood: cuisineValues[10],
      steak: cuisineValues[11],
      thai: cuisineValues[12],
    };
    // ! implement appropiate model from Prisma
    // await updateDoc(restaurantRef, {
    //     "restaurantSettings.dietary": dietaryOptions,
    //     "restaurantSettings.restaurantGenre": cuisineOptions
    // }).then(() => {
    //     submitConfirmed()
    // })
  };

  const handleGeneralForm = async (e) => {
    e.preventDefault();
    const businessName = document.getElementById(`businessName`).value;
    const restaurantDescription = document.getElementById(`restaurantDescription`).value;
    const websiteURL = document.getElementById(`websiteURL`).value;
    const phoneNumber = document.getElementById(`phoneNumber`).value;
    // ! implement appropiate model from Prisma
    // await updateDoc(restaurantRef, {
    //     "restaurantInformation.restaurantName": businessName,
    //     "restaurantInformation.restaurantDescription": restaurantDescription,
    //     "restaurantInformation.websiteURL": websiteURL,
    //     "restaurantInformation.phoneNumber": phoneNumber
    // }).then(() => {
    //     submitConfirmed()
    // })
  };

  const hoursNav = document.getElementById(`hoursNav`);
  const hoursDiv = document.getElementById(`hours-div`);

  const addressNav = document.getElementById(`addressNav`);
  const addressDiv = document.getElementById(`address-div`);

  const dietaryNav = document.getElementById(`dietaryNav`);
  const dietaryDiv = document.getElementById(`dietary-div`);

  const generalInfoNav = document.getElementById(`generalInfoNav`);
  const generalDiv = document.getElementById(`general-div`);
  const genreNav = document.getElementById(`genreNav`);
  const imagesNav = document.getElementById(`imagesNav`);

  const divArr = [ hoursDiv, addressDiv, dietaryDiv, generalDiv ];
  const divSelector = (active) => {
    const nonActive = divArr.filter((divs) => divs != active);
    active.classList.remove(`hidden`);
    for (const divs of nonActive) {
      divs.classList.add(`hidden`);
    }
  };

  return (
    <>

      <NavBar />
      {console.log(restaurant)}
      <div className="bg-[#FFFFFF] border-b-2">
        {
          restaurant
            ? <h1 className="text-lg m-4 mt-6">
                {`${restaurant[0].restaurantInformation.restaurantName} Settings`}
              </h1>
            : <h1>Restaurant Settings</h1>}

      </div>
      <div className='overflow-auto flex'>
        <nav className="w-[195px] h-[100vh] bg-gray-50 drop-shadow-md">
          <ul className="mt-10 ">
            <div className="flex flex-col">

              <li id="hoursNav" onClick={() => { divSelector(hoursDiv); }}
                className="mt-2 text-sm hover:cursor-pointer p-3 transition-all
              whitespace-nowrap float-left bg-gray-50 hover:bg-white active:bg-white">
                <Image className="w-[10%] inline mr-1 mb-[1px]"
                  src="https://firebasestorage.googleapis.com
              /v0/b/plopit-aceb3.appspot.com/o/
              icons%2Fclock.svg?alt=media&token=d959bf28-0d3b-4906-bbd2-a7c266fd4884"
                  alt="" />hours</li>

              <li id="addressNav" onClick={() => { divSelector(addressDiv); }}
                className="mt-2 text-sm hover:cursor-pointer p-3
              transition-all whitespace-nowrap float-left bg-gray-50 hover:bg-white active:bg-white">
                <Image className="w-[10%] inline mr-1 mb-[1px]"
                  src="https://firebasestorage.googleapis.com
                /v0/b/plopit-aceb3.appspot.com/o/
                icons%2Fmappin.and.ellipse.svg?alt=media&token=0e333f1c-b3a2-47b6-8989-10177163a752"
                  alt="" />address</li>

              <li id="dietaryNav" onClick={() => { divSelector(dietaryDiv); }}
                className="mt-2 text-sm hover:cursor-pointer
               p-3 transition-all whitespace-nowrap float-left
                bg-gray-50 hover:bg-white active:bg-white">
                <Image className="w-[10%] inline mr-1 mb-[1px]"
                  src="https://firebasestorage.googleapis.com
                  /v0/b/plopit-aceb3.appspot.com/o/
                  icons%2Ffork.knife.svg?alt=media&token=10014d72-d84c-4568-a338-cc639545fffa"
                  alt="" />dietary</li>

              <li id="generalInfoNav" onClick={() => { divSelector(generalDiv); }}
                className="mt-2 text-sm hover:cursor-pointer
              p-3 transition-all whitespace-nowrap float-left
               bg-gray-50 hover:bg-white active:bg-white">
                <Image className="w-[10%] inline mr-1 mb-[1px]"
                  src="https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/icons
                %2Fmenucard.svg?alt=media&token=5d8724ad-f26c-4812-99ed-cf6452323488"
                  alt="" />general information</li>

            </div>
          </ul>
        </nav>
        <div id="hours-div" className='flex flex-col w-full items-center'>
          <h1 className="m-[3.5rem] mb-5 ml-0 mr-[7rem] text-xl items-center">Hours</h1>
          <form action="" id="hours_form" onSubmit={async (e) => { await handleHoursForm(e); }}>
            <div className="ml-2rem md:ml-[5rem] flex flex-col items-center">
              <div>
                <h1>Monday</h1>
                <input className="mr-2 text-sm md:text-base" type="time" name="monday_start" id="monday_start" />
                <p className="inline">-</p>
                <input className="ml-2 text-sm md:text-base" type="time" name="monday_end" id="monday_end" />
              </div>
              <div className="mt-6">
                <h1>Tuesday</h1>
                <input className="mr-2 text-sm md:text-base" type="time" name="tuesday_start" id="tuesday_start" />
                <p className="inline">-</p>
                <input className="ml-2 text-sm md:text-base" type="time" name="tuesday_end" id="tuesday_end" />
              </div>
              <div className="mt-6">
                <h1>Wednesday</h1>
                <input className="mr-2 text-sm md:text-base" type="time" name="wednesday_start" id="wednesday_start" />
                <p className="inline">-</p>
                <input className="ml-2 text-sm md:text-base" type="time" name="wednesday_end" id="wednesday_end" />
              </div>
              <div className="mt-6">
                <h1>Thursday</h1>
                <input className="mr-2 text-sm md:text-base" type="time" name="thursday_start" id="thursday_start" />
                <p className="inline">-</p>
                <input className="ml-2 text-sm md:text-base" type="time" name="thursday_end" id="thursday_end" />
              </div>
              <div className="mt-6">
                <h1>Friday</h1>
                <input className="mr-2 text-sm md:text-base" type="time" name="friday_start" id="friday_start" />
                <p className="inline">-</p>
                <input className="ml-2 text-sm md:text-base" type="time" name="friday_end" id="friday_end" />
              </div>
              <div className="mt-6">
                <h1>Saturday</h1>
                <input className="mr-2 text-sm md:text-base" type="time" name="saturday_start" id="saturday_start" />
                <p className="inline">-</p>
                <input className="ml-2 text-sm md:text-base" type="time" name="saturday_end" id="saturday_end" />
              </div>
              <div className="mt-6">
                <h1>Sunday</h1>
                <input className="mr-2 text-sm md:text-base" type="time" name="sunday_start" id="sunday_start" />
                <p className="inline">-</p>
                <input className="ml-2 text-sm md:text-base" type="time" name="sunday_end" id="sunday_end" />
              </div>
              <button className="inline-flex items-center px-4 py-2 border
              self-end mt-5 border-gray-300 shadow-sm text-base font-medium
              rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Save</button>
            </div>

          </form>
        </div>

        <div id="address-div" className='flex hidden flex-col w-full mt-[7rem] items-center'>
          <h1 className=" mb-5  mr-[2rem] text-xl">Address</h1>
          <form id="addressForm" onSubmit={async (e) => { await handleAddressForm(e); }}>
            <div className="mt-1 ml-[5rem] flex flex-col items-center">

              <label htmlFor="restaurantAddressStreet"
                className="block self-start text-sm font-medium mt-4 text-gray-700">Street</label>
              <input
                type="address"
                name="restaurantAddressStreet"
                defaultValue={
                  restaurant
                    ? restaurant[0].restaurantInformation.restaurantAddress.street
                    : ``
                }
                id="restaurantAddressStreet"
                className="shadow-sm p-2
                focus:ring-indigo-500 focus:border-indigo-500 blo
                ck w-full sm:text-sm border-gray-300 rounded-md"
              />
              <label htmlFor="restaurantAddressCity"
                className="block self-start text-sm font-medium mt-4 text-gray-700">City</label>
              <input
                type="address"
                name="restaurantAddressCity"
                id="restaurantAddressCity"
                defaultValue={
                  restaurant
                    ? restaurant[0].restaurantInformation.restaurantAddress.city
                    : ``
                }
                className="shadow-sm p-2
                 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                  sm:text-sm border-gray-300 rounded-md"
              />
              <label htmlFor="restaurantAddressState"
                className="block text-sm self-start font-medium mt-4
               text-gray-700">State</label>
              <input
                type="address"
                name="restaurantAddressState"
                id="restaurantAddressState"
                defaultValue={
                  restaurant
                    ? restaurant[0].restaurantInformation.restaurantAddress.state
                    : ``
                }
                className="shadow-sm p-2
                 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                  sm:text-sm border-gray-300 rounded-md"
              />
              <label htmlFor="restaurantAddressZip"
                className="block text-sm self-start
              font-medium mt-4 text-gray-700">
                Zip
              </label>
              <input
                type="address"
                name="restaurantAddressZip"
                id="restaurantAddressZip"
                defaultValue={
                  restaurant
                    ? restaurant[0].restaurantInformation.restaurantAddress.zip
                    : ``
                }
                className="shadow-sm p-2
                 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                 sm:text-sm border-gray-300 rounded-md"
              />
              <button
                className="inline-flex items-center px-4 py-2 border self-end mt-5
               border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700
                bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Save</button>
            </div>
          </form>
        </div>
        <div id="dietary-div" className='flex hidden flex-col w-full mt-[7rem] items-center'>
          <h1>Dietary</h1>
          <form id="dietaryForm" onSubmit={async (e) => { await handleDietaryForm(e); }}>
            <div id="dietaryOptions" className="flex flex-col mt-1">
              <div>
                <input
                  type="checkbox"
                  name="glutenFree"
                  id="glutenFree"
                  className="mr-3"
                />
                {restaurant && restaurant[0].restaurantSettings.glutenFree === true ? checked : ``}
                <label htmlFor="glutenFree">Gluten Free</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="halal"
                  id="halal"
                  className="mr-3"
                />
                <label htmlFor="halal">Halal</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="kosher"
                  id="kosher"
                  className="mr-3"
                />
                <label htmlFor="kosher">Kosher</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vegan"
                  id="vegan"
                  className="mr-3"
                />
                <label htmlFor="vegan">Vegan</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="vegetarian"
                  id="vegetarian"
                  className="mr-3"
                />
                <label htmlFor="vegetarian">Vegetarian</label>
              </div>
            </div>
            <div>
              <h1>Cuisine</h1>
              <div id="cuisines" className="flex flex-col mt-1">
                <div>
                  <input
                    type="checkbox"
                    name="american"
                    id="american"
                    className="mr-3"
                  />
                  <label htmlFor="american">American</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="bakery"
                    id="bakery"
                    className="mr-3"
                  />
                  <label htmlFor="bakery">Bakery</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="chinese"
                    id="chinese"
                    className="mr-3"
                  />
                  <label htmlFor="chinese">Chinese</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="fastFood"
                    id="fastFood"
                    className="mr-3"
                  />
                  <label htmlFor="fastFood">Fast Food</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="french"
                    id="french"
                    className="mr-3"
                  />
                  <label htmlFor="french">French</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="indian"
                    id="indian"
                    className="mr-3"
                  />
                  <label htmlFor="indian">Indian</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="italian"
                    id="italian"
                    className="mr-3"
                  />
                  <label htmlFor="italian">Italian</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="japanese"
                    id="japanese"
                    className="mr-3"
                  />
                  <label htmlFor="japanese">Japanese</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="mexican"
                    id="mexican"
                    className="mr-3"
                  />
                  <label htmlFor="mexican">Mexican</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="pizza"
                    id="pizza"
                    className="mr-3"
                  />
                  <label htmlFor="pizza">Pizza</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="seafood"
                    id="seafood"
                    className="mr-3"
                  />
                  <label htmlFor="seafood">Seafood</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="steak"
                    id="steak"
                    className="mr-3"
                  />
                  <label htmlFor="steak">Steak</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    name="thai"
                    id="thai"
                    className="mr-3"
                  />
                  <label htmlFor="thai">Thai</label>
                </div>
              </div>
            </div>
            <button className="mr-4 inline-flex items-center px-4 py-2 border
            self-end mt-5 border-gray-300 shadow-sm text-base font-medium
            rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none
             focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Save</button>

          </form>
        </div>
        <div id="general-div" className='flex hidden flex-col w-full mt-[7rem] items-center'>
          <h1>General Information</h1>
          <form id="generalInfoForm" onSubmit={async (e) => { await handleGeneralForm(e); }}>
            <div className="mt-5 flex flex-col items-center">
              <div className='self-start'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Restaurant Name
                </label>

                <input
                  type="text"
                  name="businessName"
                  id="businessName"
                  defaultValue={restaurant ? restaurant[0].restaurantInformation.restaurantName : ``}
                  className="shadow-sm p-2 focus:ring-indigo-500
                  focus:border-indigo-500 w-[20rem] sm:text-sm bg-gray-50 border-gray-300 rounded-md"
                />

              </div>
              <label htmlFor="restaurantDescription"
                className="block text-sm self-start font-medium mt-4  text-gray-700">
                                Restaurant Description
              </label>
              <div className="mt-1">
                <textarea className="min-w-[20rem] max-h-[15rem] bg-gray-50"
                  defaultValue={
                    restaurant
                      ? restaurant[0].restaurantInformation.restaurantDescription
                      : ``} name="restaurantDescription" cols='0' rows='30' id="restaurantDescription">

                </textarea>

              </div>
              <div className='self-start'>
                <label htmlFor="phoneNumber" className="block text-sm font-medium mt-4  text-gray-700">
                                    Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    defaultValue={
                      restaurant
                        ? restaurant[0].restaurantInformation.phoneNumber
                        : ``
                    }
                    className="shadow-sm p-2 focus:ring-indigo-500
                     focus:border-indigo-500 block w-[20rem] sm:text-sm
                      border-gray-500 bg-gray-50 rounded-md"

                  />

                </div>
              </div>
              <div className="self-start">
                <label htmlFor="email" className="block text-sm font-medium mt-4 text-gray-700">
                                    Website Link
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="websiteURL"
                    id="websiteURL"
                    defaultValue={
                      restaurant
                        ? restaurant[0].restaurantInformation.websiteURL
                        : ``
                    }
                    className="shadow-sm p-2 focus:ring-indigo-500
                     focus:border-indigo-500 block w-[20rem] sm:text-sm
                      bg-gray-50 border-gray-300 rounded-md"
                  />

                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 border self-end mt-5
               border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700
                bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-indigo-500" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg
              px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl
               transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <CheckIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Changes have been saved
                    </Dialog.Title>
                    <div className="mt-2">
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
