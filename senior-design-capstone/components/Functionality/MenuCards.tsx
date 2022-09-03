import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import XIcon from '../Icons/XIcon'
import { ExclamationIcon } from '@heroicons/react/solid'
import 'babylonjs-loaders';
import SceneComponent from '../Sections/SceneComponent'
import NavBar from '../Nav/NavBar';
import { db } from '../../firebase/clientApp';
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from 'next/router';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useActiveRestaurantContext, useUpdateActiveRestaurantContext } from '../../src/context/ActiveRestaurantContext'

export default function MenuCards({ menuItems }) {
    let activeRestaurant = useActiveRestaurantContext()
    console.log('ACTIVE')
    let [restaurantData, setRestaurantData] = useState()
    let [isOpen, setIsOpen] = useState(false)
    let [webURL, setWebURL] = useState()
    let [usdzURL, setUsdzURL] = useState()
    let [foodName, setFoodName] = useState()
    let menuHeadersArr = ["salad", "burger", "salad", "burger", "dessert"]
    let foodArr = [[]]
    //for (let header of menuHeadersArr) {
    //    foodArr.push([])
    //}
    //console.log(foodArr)
    let router = useRouter()
    let restaurantURL = router.query.id
    const getRandData = async () => {
        let data;
        const restaurantCollection = collection(db, 'Restaurant')
        const q = query(restaurantCollection, where('restaurantID', '==', restaurantURL))
        await getDocs(q)
            .then((querySnapshot) => {
                const restaurantData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                console.log(restaurantData, 'res data')
                data = restaurantData
                return data
            })
            .catch((err) => {
                console.log(err)
            })
        return data
    }
    if (activeRestaurant === undefined) {
        const localData = localStorage.getItem('restaurantMenu')
        getRandData().then((data) => {
            activeRestaurant = data[0]
        })
        activeRestaurant = JSON.parse(localData)
    } else {
        localStorage.setItem('restaurantMenu', JSON.stringify(activeRestaurant))
    }

    if (!activeRestaurant) {

    }

    for (let i = 0; i < menuHeadersArr.length; i++) {
        foodArr.push([])

    }
    for (let i = 0; i < menuItems.length; i++) {
        foodArr[menuItems[i].menuHeaderID].push(menuItems[i])
    }
    const onSceneReady = (scene) => {

        let model;
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 2.7, new BABYLON.Vector3(0, 0, 0), scene);


        camera.lowerRadiusLimit = 2.7
        camera.upperRadiusLimit = 2.7
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        const canvas = scene.getEngine().getRenderingCanvas();
        BABYLON.SceneLoader.ShowLoadingScreen = false;
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        //var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
        //var light2 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(-1, 1, 1), scene);
        //var light3 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(1, 1, -1), scene);
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
        // Our built-in 'box' shape.
        let url = webURL.split('appspot')
        console.log(url)
        model = BABYLON.SceneLoader.Append((url[0] + "appspot"), url[1], scene)
        //box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene)  

        // Move the box upward 1/2 its height

        // Our built-in 'ground' shape
    };
    return (
        <>
            {foodArr.map((section, index) => (
                <>
                    {activeRestaurant ? <h1 id={activeRestaurant.menuHeaderArray[index]} className="text-[2rem] font-bold m-8 ml-8">{activeRestaurant.menuHeaderArray[index]}</h1> : <h1>Loading...</h1>}
                    <div className="max-w-lg ml-4 mr-8 mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                        {section.map((item) => (
                            <>
                                <div key={item.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">

                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={item.thumbnailURL ? item.thumbnailURL : "https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/menuDefault.png?alt=media&token=e3fc6f48-4489-4243-b457-680edfdcbd6c"} alt="" />
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <button onClick={() => { setIsOpen(true); if (item.webURL) { setWebURL(item.webURL) } else { setWebURL('https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/restaurants%2FYummrBakery%2FBread.glb?alt=media&token=3233accf-ed5b-4575-83b4-4a9a2ed2be25') }; setUsdzURL(item.modelURL); setFoodName(item.menuItem) }} className="float-right bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">View In AR</button>
                                            <p className="text-xl font-semibold text-gray-900">{item.menuItem}</p>
                                            <p className="text-xl font-semibold text-green-700">${item.itemPrice}</p>
                                            <p className="mt-3 text-base text-gray-500">{item.itemDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                        }
                    </div>
                </>
            ))}
            <div>
                <Transition.Root show={isOpen} as={Fragment}>
                    <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" open={isOpen} onClose={setIsOpen}>
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
                                <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                    <div id="modelview-div" className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                {foodName}
                                            </Dialog.Title>
                                            <div className="mt-2 max-h-[70%]">
                                                <SceneComponent className='outline-none max-w-[100%] max-h-[100%]' antialias onSceneReady={onSceneReady} id="my-canvas" />
                                                <menu className="absolute max-w-[25%] max-h-[25%] right-0 top-0">
                                                    <a
                                                        rel="ar"
                                                        href={usdzURL}
                                                    >
                                                        <img className="max-w-[100%] max-h-[100%]" src="https://img.wallpapersafari.com/desktop/1024/576/69/20/FgHujO.jpg" />

                                                    </a>
                                                </menu>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>

        </>
    )
}
