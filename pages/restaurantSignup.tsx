import React, { SyntheticEvent } from 'react';
import Uppy from '@uppy/core';
import { Dashboard, useUppy } from '@uppy/react';
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.css';
import '@uppy/Dashboard/dist/style.css';
import Router from 'next/router';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { db } from '../firebase/clientApp';
import { useAuth } from '../firebase/AuthContext';

const restaurantSignup: React.FC = () => {
  const { registerUser } = useAuth();
  const { register, getValues } = useForm();

  const formSubmit = async (event: SyntheticEvent, values: any): Promise<void> => {
    try {
      console.log(values, `values`);
      event.preventDefault();
      const fullName = document.getElementById(`fullName`);
      const userEmail = document.getElementById(`email`);
      const userPassword = document.getElementById(`password`);
      const user = await registerUser(userEmail?.value, userPassword?.value);

      // Restaurant Details
      const businessName = document.getElementById(`businessName`);
      const restaurantStreet = document.getElementById(`restaurantAddressStreet`);
      const restaurantCity = document.getElementById(`restaurantAddressCity`);
      const restaurantState = document.getElementById(`restaurantAddressState`);
      const restaurantZip = document.getElementById(`restaurantAddressZip`);
      const restaurantAddress = {
        street?: restaurantStreet.value,
        city: restaurantCity.value,
        state: restaurantState.value,
        zip: restaurantZip.value,
      };
      const restaurantDescription = document.getElementById(`restaurantDescription`);
      const websiteURL = document.getElementById(`websiteURL`);
      const phoneNumber = document.getElementById(`phoneNumber`);
      const pricing = document.querySelector(`input[name="notification-method"]:checked`);

      // Cuisine Fields
      const cuisines = document.getElementById(`cuisines`);
      const foodValue = [];
      for (let i = 0; i < cuisines.children.length - 2; i++) {
        foodValue.push(cuisines.children[i].firstChild.checked);
      }

      const cuisineOptions = {
        american: foodValue[0],
        bakery: foodValue[1],
        chinese: foodValue[2],
        fastFood: foodValue[3],
        french: foodValue[4],
        indian: foodValue[5],
        italian: foodValue[6],
        japanese: foodValue[7],
        mexican: foodValue[8],
        pizza: foodValue[9],
        seafood: foodValue[10],
        steak: foodValue[11],
        thai: foodValue[12],
      };

      // dietary fields
      const dietary = document.getElementById(`dietaryOptions`);
      const dietaryValues = [];
      for (let i = 0; i < dietary.children.length; i++) {
        dietaryValues.push(dietary.children[i].firstChild.checked);
      }

      const dietaryOptions = {
        glutenFree: dietaryValues[0],
        halal: dietaryValues[1],
        kosher: dietaryValues[2],
        vegan: dietaryValues[3],
        vegetarian: dietaryValues[4],
      };

      const newUser = await addDoc(collection(db, `users`), {
        email: userEmail.value,
        favoriteID: ``,
        fullName: fullName.value,
        password: userPassword.value,
        isOwner: true,

      });
      newUser.id;

      await updateDoc(newUser, {
        userID: user.user.uid,
      });

      const newRestaurant = await addDoc(collection(db, `Restaurant`), {
        isApproved: null,
        menuHeaderArray: [],
        restaurantInformation: {
          hours: {
            Monday: ``,
            Tuesday: ``,
            Wednesday: ``,
            Thursday: ``,
            Friday: ``,
            Saturday: ``,
            Sunday: ``,
          },
          phoneNumber: phoneNumber.value,
          restaurantAddress,
          restaurantName: businessName.value,
          restaurantDescription: restaurantDescription.value,
          websiteURL: websiteURL.value,
        },
        restaurantSettings: {
          dietary: dietaryOptions,
          restaurantGenre: cuisineOptions,
          priceRange: pricing.value,
          restaurantHeaderImageURL: null,
          restaurantThumbnailImageURL: null,
        },
        users: [],
      });
      newRestaurant.id;

      const newOwner = await addDoc(collection(db, `Owners`), {
        email: userEmail.value,
        fullName: fullName.value,
        restaurantID: newRestaurant.id,
        userID: user.user.uid,
      });
      newOwner.id;

      await updateDoc(newRestaurant, {
        restaurantID: newRestaurant.id,
        ownerID: newOwner.id,
      });
      await updateDoc(newOwner, {
        ownerID: newOwner.id,
      });
    } catch (e) {
      console.log(e);
    }
    alert(`Restaurant application has been sent for review`);
    setTimeout(() => {
      await Router.push(`/`);
    }, 400);
  };

  const uppy = useUppy(() => new Uppy({
    restrictions: {
      maxFileSize: 100000000, // ONE MEGABYTE FILE LIMIT
      maxNumberOfFiles: 200,
      minNumberOfFiles: 2,
      allowedFileTypes: [ `image/*` ],
    },
  }).use(Tus, { endpoint: `https://tusd.tusdemo.net/files` }));

  return (
    <form className="space-y-8 divide-y divide-gray-200 m-10">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Restaurant Signup</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please fill out the form below with all of your restaurant details.
             We will get back to you within 3 business days.
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Personal Info
              </label>
              <div className="mt-1 max-w-lg sm:mt-0 sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Full Name
                </label>
                <div className="mt-1">
                  <input
                    {...register(`fullName`)}
                    type="text"
                    name="username"
                    id="fullName"
                    className="shadow-sm p-2 focus:ring-indigo-500 bg-gray-50 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"

                  />

                </div>

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                </label>
                <div className="mt-1">
                  <input
                    {...register(`email`)}
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"

                  />

                </div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Password
                </label>
                <div className="mt-1">
                  <input
                    {...register(`password`)}
                    type="password"
                    name="password"
                    id="password"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"

                  />

                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Restaurant Information
              </label>
              <div className="mt-1 max-w-lg sm:mt-0 sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Restaurant Name
                </label>
                <div className="mt-1">
                  <input
                    {...register(`businessName`)}
                    type="text"
                    name="businessName"
                    id="businessName"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"

                  />

                </div>

                <label htmlFor="restaurantAddress" className="block text-sm font-medium mt-4 text-gray-700">
                    Restaurant Address
                </label>
                <div className="mt-1">
                  <label htmlFor="restaurantAddressStreet"
                    className="block text-sm font-medium mt-4 text-gray-700">Street</label>
                  <input
                    {...register(`restuarantAddressStreet`)}
                    type="address"
                    name="restaurantAddressStreet"
                    id="restaurantAddressStreet"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <label htmlFor="restaurantAddressCity"
                    className="block text-sm font-medium mt-4 text-gray-700">City</label>
                  <input
                    {...register(`restaurantAddressCity`)}
                    type="address"
                    name="restaurantAddressCity"
                    id="restaurantAddressCity"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <label htmlFor="restaurantAddressState"
                    className="block text-sm font-medium mt-4 text-gray-700">State</label>
                  <input
                    {...register(`restaurantAddressState`)}
                    type="address"
                    name="restaurantAddressState"
                    id="restaurantAddressState"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <label htmlFor="restaurantAddressZip"
                    className="block text-sm font-medium mt-4 text-gray-700">Zip</label>
                  <input
                    {...register(`restaurantAdressZip`)}
                    type="address"
                    name="restaurantAddressZip"
                    id="restaurantAddressZip"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"
                  />

                </div>

                <label htmlFor="restaurantDescription" className="block text-sm font-medium mt-4 text-gray-700">
                                    A brief description of your restaurant
                </label>
                <div className="mt-1">
                  <textarea
                    {...register(`restaurantDescription`)}
                    className="min-w-full bg-gray-50" name="restaurantDescription" cols={15} rows={15} i
                    d="restaurantDescription"/>

                </div>

                <label htmlFor="phoneNumber" className="block text-sm font-medium mt-4 text-gray-700">
                                    Phone Number
                </label>
                <div className="mt-1">
                  <input
                    {...register(`phoneNumber`)}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className="shadow-sm bg-gray-50 p-2 focus:ring-indigo-500 focus:border-indigo-500
                    block w-full sm:text-sm border-gray-300 rounded-md"

                  />

                </div>

                <label htmlFor="pricing" className="block text-sm font-medium mt-4 text-gray-700">
                                    Pricing
                </label>
                <div className="mt-1 flex flex-col">
                  <fieldset className="mt-4">
                    <legend className="sr-only">Notification method</legend>
                    <div className="space-y-4">
                      <div className="flex flex-col" >

                        <div>
                          <input
                            {...register(`$`)}
                            id="$"
                            name="notification-method"
                            type="radio"
                            value="$"
                            className="focus:ring-indigo-500 bg-gray-50 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="$" className="ml-3 block text-sm font-medium text-gray-700">
                                                        $
                          </label>
                        </div>

                        <div>
                          <input
                            {...register(`$$`)}
                            id="$$"
                            name="notification-method"
                            type="radio"
                            value="$$"
                            className="focus:ring-indigo-500 bg-gray-50 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="$$" className="ml-3 block text-sm font-medium text-gray-700">
                                                        $$
                          </label>
                        </div>

                        <div>
                          <input
                            {...register(`$$$`)}
                            id="$$$"
                            name="notification-method"
                            type="radio"
                            value="$$$"
                            className="focus:ring-indigo-500 bg-gray-50 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="$$$" className="ml-3 block text-sm font-medium text-gray-700">
                                                        $$$
                          </label>
                        </div>

                      </div>
                    </div>
                  </fieldset>
                </div>

                <label htmlFor="email" className="block text-sm font-medium mt-4 text-gray-700">
                                    Cuisine
                </label>
                <div id="cuisines" className="flex flex-col mt-1">
                  <div>
                    <input
                      {...register(`american`)}
                      type="checkbox"
                      name="american"
                      id="american"
                      className="mr-3 bg-gray-50"
                    />
                    <label htmlFor="american">American</label>
                  </div>

                  <div>
                    <input
                      {...register(`bakery`)}
                      type="checkbox"
                      name="bakery"
                      id="bakery"
                      className="mr-3"
                    />
                    <label htmlFor="bakery">Bakery</label>
                  </div>

                  <div>
                    <input
                      {...register(`chinese`)}
                      type="checkbox"
                      name="chinese"
                      id="chinese"
                      className="mr-3"
                    />
                    <label htmlFor="chinese">Chinese</label>
                  </div>

                  <div>
                    <input
                      {...register(`fastFood`)}
                      type="checkbox"
                      name="fastFood"
                      id="fastFood"
                      className="mr-3"
                    />
                    <label htmlFor="fastFood">Fast Food</label>
                  </div>

                  <div>
                    <input
                      {...register(`french`)}
                      type="checkbox"
                      name="french"
                      id="french"
                      className="mr-3"
                    />
                    <label htmlFor="french">French</label>
                  </div>

                  <div>
                    <input
                      {...register(`indian`)}
                      type="checkbox"
                      name="indian"
                      id="indian"
                      className="mr-3"
                    />
                    <label htmlFor="indian">Indian</label>
                  </div>

                  <div>
                    <input
                      {...register(`italian`)}
                      type="checkbox"
                      name="italian"
                      id="italian"
                      className="mr-3"
                    />
                    <label htmlFor="italian">Italian</label>
                  </div>

                  <div>
                    <input
                      {...register(`japanese`)}
                      type="checkbox"
                      name="japanese"
                      id="japanese"
                      className="mr-3"
                    />
                    <label htmlFor="japanese">Japanese</label>
                  </div>

                  <div>
                    <input
                      {...register(`mexican`)}
                      type="checkbox"
                      name="mexican"
                      id="mexican"
                      className="mr-3"
                    />
                    <label htmlFor="mexican">Mexican</label>
                  </div>

                  <div>
                    <input
                      {...register(`pizza`)}
                      type="checkbox"
                      name="pizza"
                      id="pizza"
                      className="mr-3"
                    />
                    <label htmlFor="pizza">Pizza</label>
                  </div>

                  <div>
                    <input
                      {...register(`seafood`)}
                      type="checkbox"
                      name="seafood"
                      id="seafood"
                      className="mr-3"
                    />
                    <label htmlFor="seafood">Seafood</label>
                  </div>

                  <div>
                    <input
                      {...register(`steak`)}
                      type="checkbox"
                      name="steak"
                      id="steak"
                      className="mr-3"
                    />
                    <label htmlFor="steak">Steak</label>
                  </div>

                  <div>
                    <input
                      {...register(`thai`)}
                      type="checkbox"
                      name="thai"
                      id="thai"
                      className="mr-3"
                    />
                    <label htmlFor="thai">Thai</label>
                  </div>

                  <label htmlFor="dietary" className="block text-sm font-medium mt-4 text-gray-700">
                                        Dietary
                  </label>
                  <div id="dietaryOptions" className="flex flex-col mt-1">
                    <div>
                      <input
                        {...register(`glutenFree`)}
                        type="checkbox"
                        name="glutenFree"
                        id="glutenFree"
                        className="mr-3"
                      />
                      <label htmlFor="glutenFree">Gluten Free</label>
                    </div>

                    <div>
                      <input
                        {...register(`halal`)}
                        type="checkbox"
                        name="halal"
                        id="halal"
                        className="mr-3"
                      />
                      <label htmlFor="halal">Halal</label>
                    </div>

                    <div>
                      <input
                        {...register(`kosher`)}
                        type="checkbox"
                        name="kosher"
                        id="kosher"
                        className="mr-3"
                      />
                      <label htmlFor="kosher">Kosher</label>
                    </div>

                    <div>
                      <input
                        {...register(`vegan`)}
                        type="checkbox"
                        name="vegan"
                        id="vegan"
                        className="mr-3"
                      />
                      <label htmlFor="vegan">Vegan</label>
                    </div>

                    <div>
                      <input
                        {...register(`vegetarian`)}
                        type="checkbox"
                        name="vegetarian"
                        id="vegetarian"
                        className="mr-3"
                      />
                      <label htmlFor="vegetarian">Vegetarian</label>
                    </div>

                  </div>

                </div>

                <label htmlFor="email" className="block text-sm font-medium mt-4 text-gray-700">
                                    Website Link
                </label>
                <div className="mt-1">
                  <input
                    {...register(`websiteURL`)}
                    type="text"
                    name="websiteURL"
                    id="websiteURL"
                    className="shadow-sm p-2 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full
                    sm:text-sm border-gray-300 rounded-md"
                  />

                </div>
                <label className="font-medium mt-4 mb-4">Restaurant Image</label>
                <Dashboard uppy={uppy} className="block" />
              </div>
            </div>

          </div>

        </div>

        <div className="pt-5">
          <div className="flex justify-end">

            <Link
              href="/"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium
               text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                            Cancel
            </Link>

            <button
              type="submit"
              onClick={(e) => { const values = getValues(); await formSubmit(e, values); }}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent
              shadow-sm text-sm font-medium
              rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default restaurantSignup;
