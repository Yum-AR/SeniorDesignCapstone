import React, { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import { query, where, getDocs, collection, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { useAuth } from "../../firebase/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function OwnerDashboardRestaurant() {
    const { currentUser } = useAuth()
    let restaurantCollection = collection(db, 'Restaurant')
    let ownerCollection = collection(db, 'Owners')
    const router = useRouter()
    const [ownerID, setOwnerID] = useState()
    const [restaurantArray, setRestaurantArray] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const fetchOwnerData = async () => {
        try {
            let data;
            const ownerQuery = query(ownerCollection, where('userID', '==', currentUser.uid))
            await getDocs(ownerQuery)
                .then((querySnapshot) => {
                    const ownerData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    console.log(ownerData)
                    data = ownerData
                    setOwnerID(data[0].ownerID)
                    return data
                })
            return data
        } catch (e) {
            console.log(e)
        }

    }
    const fetchRestaurantData = async (id) => {
        try {
            const restaurantQuery = query(restaurantCollection, where('ownerID', '==', id))
            await getDocs(restaurantQuery)
                .then((querySnapshot) => {
                    const restaurantData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    setRestaurantArray(restaurantData)
                })
        } catch (e) {
            console.log(e)
        }

    }
    useEffect(() => {
        fetchOwnerData()
            .then((data) => {
                let ownerID = data[0].ownerID
                fetchRestaurantData(ownerID)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    console.log(restaurantArray)


    return (
        <>
            <div className="w-full h-full">
                <h1 className="font-bold m-4 ml-6 mt-9 text-xl">Your Restaurants</h1>
                <div className="flex md:flex-row flex-col">
                    {restaurantArray.map((restaurant) => (
                        <div className="flex flex-col md:self-start self-center bg-[#f5f5f5] m-3 ml-6 mt-9 align-center lg:w-[35%] w-[50%] rounded hover:drop-shadow-xl hover:translate-y-[-1px] transition ease-in-out drop-shadow-lg" key={restaurant.restaurantID}>
                            <div className="flex justify-between">
                                <h1 className="p-2 text-center font-bold text-black">{restaurant.restaurantInformation.restaurantName}{restaurant.isApproved === true ? <span className="bg-green-500 w-[5px] h-[5px] ml-2 mb-[1px] rounded-full inline-block"></span> : <span className="bg-red-500 w-[5px] h-[5px] ml-2 mb-[1px] rounded-full inline-block"></span>}</h1>
                                <Link href={`restaurantSettings/${restaurant.restaurantID}`}>
                                    <img className=" w-[7%] hover:cursor-pointer self-end mb-1 mr-2" src="https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/gears.png?alt=media&token=84e7fa28-9c77-4579-b043-ef598000572b" />
                                </Link>
                            </div>
                            <div>
                                <Link href={`menuItems/${restaurant.restaurantID}`} >
                                    <img src={restaurant.restaurantSettings.restaurantThumbnailImageURL !== undefined ? restaurant.restaurantSettings.restaurantThumbnailImageURL : "https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/menuDefault.png?alt=media&token=e3fc6f48-4489-4243-b457-680edfdcbd6c"} className="w-full h-full hover:cursor-pointer rounded"></img>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}