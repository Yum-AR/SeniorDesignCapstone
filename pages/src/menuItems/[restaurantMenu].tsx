import React from 'react'
import { Fragment, useState, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SaveIcon from '../../reusableItems/icons/SaveIcon'
import Uppy from '@uppy/core'
import { Dashboard, useUppy } from '@uppy/react'
import ConfirmationModal from './DeleteConfirmation'
import '@uppy/core/dist/style.css'
import '@uppy/Dashboard/dist/style.css'
import { useRouter } from 'next/router'
import QRCode from 'react-qr-code'
import NavBar from '../../reusableItems/components/NavBar'
import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from '@heroicons/react/solid'
import AWS from 'aws-sdk'

//TODO instead of fetching data after creating an item or deleting item, we want to just visually update page from the component render cycle and only add one item.  another example is deleting item on page and deleting item but not fetching data after.

const initialValues = {
    menuItem: "",
    itemDescription: "",
    itemPrice: "",
};

AWS.config.update({
    accessKeyId: "AKIAWBQR7FPGNL2JI34E",
    secretAccessKey: "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",
    "region": "us-west-2"
})


export default function restaurantMenu() {
    const [showConfirmationModal, setConfirmationModal] = useState(false)

    //INITIALIZING UPPY FOR FILE UPLOADS USING S3 - S3 BUCKET STILL NEEDS TO BE CONFIGURED
    const uppy = useUppy(() => {
        return new Uppy({
            restrictions: {
                maxFileSize: 100000000, //ONE-HUNDRED MEGABYTE FILE LIMIT
                maxNumberOfFiles: 200,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/*', 'video/*']
            }
        })
    })
    const router = useRouter()
    let { restaurantMenu } = router.query
    let files = []

    uppy.on('file-added', (file) => {
        files.push(file)
    })
    uppy.on('cancel-all', () => {
        files = []
    })
    const client = new AWS.S3()
    uppy.on('upload', (data) => {
        console.log('datttaaa', data)
        for (let file of files) {
            console.log('file', file, files)
            const uploadParams = {
                Bucket: "plopit4b37e242ab254f2a99a54f6f29109889204346-dev",
                Key: `public/${restaurantMenu}/${file.name}.jpg`,
                Body: file.data
            }
            client.putObject(uploadParams, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Successfully uploaded', res)
                }
            })
        }

    })


    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [active, setActive] = useState([])
    const [restaurantId, setRestaurantId] = useState()
    const [isEditing, setEditing] = useState(false)
    // ! implement appropiate model from Prisma
    // const [menuItemsUnfiltered, setMenuItemsUnfiltered] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const toggleEditing = () => {
        setEditing(value => !value)
        let menuItemsListArr = document.getElementById('menuItemsList')
        if (isEditing === false) {
            menuItemsListArr.classList.add('[pointer-events:none]')
            menuItemsListArr.classList.add('[opacity:0.6]')
        } else {
            menuItemsListArr.classList.remove('[pointer-events:none]')
            menuItemsListArr.classList.remove('[opacity:0.6]')
        }

    };
    const [text, setText] = useState('')
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    let [menuHeaders, setMenuHeaders] = useState([])

    const [values, setValues] = useState(initialValues);


    // ! implement appropiate model from Prisma
    // const menuItemCollectionReference = collection(db, 'MenuItems')
    // const userCollectionReference = collection(db, 'users')

    // const [menuItemArray, setMenuItemArray] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    let isOwner;
    let userID;

    //FETCHES ALL APPROPIATE DATA IF USER EXISTS
    // ! implement appropiate model from Prisma
    // if (currentUser) {
    //     const currentUserID = currentUser.uid
    //     var fetchOwnerMenuData = async () => {
    //         const menuItemsQuery = query(menuItemCollectionReference, where("restaurantID", "==", restaurantMenu))
    //         await getDocs(menuItemsQuery)
    //             .then((querySnapshot) => {
    //                 const newMenuItemDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //                 setMenuItemsUnfiltered(newMenuItemDataArray)
    //                 setMenuItemArray(newMenuItemDataArray);
    //                 setActive(newMenuItemDataArray[0]);
    //             })
    //             .catch((err) => {
    //                 console.error("Failed to get data", err)
    //             })
    //     }
    //     var fetchUserData = async () => {
    //         const findUserQuery = query(userCollectionReference, where("userID", "==", currentUserID))
    //         await getDocs(findUserQuery)
    //             .then((querySnapshot) => {
    //                 const userData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //                 userID = userData[0].userID
    //                 isOwner = userData[0].isOwner
    //             })
    //             .catch((e) => {
    //                 console.log(e)
    //             })


    //     }

    //     var fetchData = async () => {
    //         await fetchUserData();
    //         try {
    //             if (isOwner === true) {
    //                 await fetchOwnerMenuData()
    //             } else {
    //                 Router.push('/')
    //                 console.log('No User Found')
    //             }
    //         } catch (e) {
    //             console.log(e)
    //         }

    //     }
    // } else {
    //     console.log('NO USER FOUND')
    // }

    //FUNCTION RUNS WHEN PRINT QR CODE BUTTON IS CLICKED - PRINTS QR CODE
    const printQR = () => {

        var tmp = document.createDocumentFragment();
        let prints = {}
        function createPrint(printNum) {
            for (let i = 0; i < printNum; i++) {
                prints['qrCode' + i] = document.getElementById('printCode').cloneNode(true);
            }
            return prints
        }

        createPrint(8)

        let { qrCode0, qrCode1, qrCode2, qrCode3, qrCode4, qrCode5 } = prints

        let qrCodeArr = [qrCode0, qrCode1, qrCode2, qrCode3, qrCode4, qrCode5]


        let printDiv = document.createElement('div')

        printDiv.classList.add('flex', 'flex-wrap', 'p-10')

        for (let qrCode of qrCodeArr) {
            qrCode.classList.add('m-5')
            printDiv.append(qrCode)
        }


        while (document.body.firstChild) {

            tmp.appendChild(document.body.firstChild);
        }

        document.body.append(printDiv);
        window.print();

        while (document.body.firstChild) {

            document.body.removeChild(document.body.firstChild);
        }

        document.body.appendChild(tmp);
    }

    //FUNCTION FOR ADDING NEW HEADERS TO DROPDOWN AND FIREBASE
    const createHeaderTextBox = () => {
        let headerInputField = document.createElement('input')
        let filterButton = document.getElementById('filterButton')
        headerInputField.style.display = '';
        filterButton!.style.display = 'none'
        let addNewHeaderDiv = document.getElementById('addNewHeaderDiv')
        let newHeaderButton = document.getElementById('newHeaderButton')
        let submitNewHeader = document.createElement('button')
        submitNewHeader.style.display = '';
        headerInputField.classList.add('p-2')
        submitNewHeader.classList.add('inline', 'mt-2', 'bg-blue-500', 'hover:bg-blue700', 'text-white', 'text-sm', 'py-2', 'px-4', 'rounded')
        submitNewHeader.innerHTML = 'add'
        headerInputField.setAttribute('placeholder', 'your new header name...')
        submitNewHeader.setAttribute('type', 'button')
        newHeaderButton?.insertAdjacentElement('beforebegin', headerInputField)
        newHeaderButton?.style.display = 'none'
        addNewHeaderDiv?.append(submitNewHeader)

        submitNewHeader.addEventListener('click', async () => {
            if (headerInputField.value !== '') {
                if (menuHeaders === undefined) {
                    menuHeaders = []
                    menuHeaders.push(headerInputField.value)
                } else {
                    menuHeaders.push(headerInputField.value)
                }

                console.log(menuHeaders)
            // ! implement appropiate model from Prisma
            //     const restaurantRef = doc(db, 'Restaurant', restaurantMenu)
            //     await updateDoc(restaurantRef, {
            //         menuHeaderArray: menuHeaders
            //     }).then(() => {
            //         submitNewHeader.style.display = 'none'
            //         headerInputField.style.display = 'none'
            //         newHeaderButton.style.display = null
            //     })
            // } else {
            //     submitNewHeader.style.display = 'none'
            //     headerInputField.style.display = 'none'
            //     filterButton.style.display = null
            //     newHeaderButton.style.display = null
            // }


        })

    }

    //CREATES THE DROPDOWN MENU WITH ALL CURRENT HEADERS
    const createMenuHeaders = async (headers, appendingDiv, dropdownID) => {
        let menuHeadersDiv = document.getElementById(appendingDiv)
        let menuHeadersDropdown = document.createElement('select')
        menuHeadersDropdown.setAttribute('id', dropdownID)
        menuHeadersDropdown.classList.add('px-6', 'py-2.5', 'bg-gray-600', 'text-white', 'font-medium', 'text-sm', 'leading-tight', 'rounded', 'shadow-md', 'hover:bg-gray-700', 'hover:shadow-lg', 'text-center', 'pr-3', 'w-full')
        for (let header of headers) {
            let menuHeadersOptions = document.createElement('option')
            menuHeadersOptions.setAttribute('value', header)
            menuHeadersOptions.classList.add('dropdown-item', 'text-sm', 'py-2', 'px-4', 'font-normal', 'block', 'w-full', 'bg-transparent', 'text-white')
            menuHeadersOptions.append(header)
            menuHeadersDropdown.append(menuHeadersOptions)
        }
        if (menuHeadersDiv!.childNodes.length > 1) {
            return
        } else {
            menuHeadersDiv?.append(menuHeadersDropdown)
        }

        console.dir(menuHeadersDropdown)

        return menuHeadersDiv

    }

    // ! implement appropiate model from Prisma
    // const fetchRestaurantData = async () => {
    //     let data;
    //     const restaurantCollection = collection(db, 'Restaurant')
    //     const restaurantQuery = query(restaurantCollection, where('restaurantID', '==', restaurantMenu))
    //     await getDocs(restaurantQuery)
    //         .then((querySnapshot) => {
    //             const restaurantData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //             data = restaurantData[0].menuHeaderArray
    //             return data
    //         })
    //     return data
    // }

    //FILTERS ITEMS BASED ON SELECTED HEADER
    const filterItems = () => {
        let menuHeadersDropdown = document.getElementById('menuHeadersSelect')
        let menuHeaderIndex = menuHeadersDropdown?.options.selectedIndex
        let filteredItems = []
        for (let items of menuItemsUnfiltered) {
            if (items.menuHeaderID === menuHeaderIndex) {
                filteredItems.push(items)
            }
        }
        // setMenuItemArray(filteredItems)

        setActive(filteredItems[0])
    }
    if (isEditing) {
        let setHeadersDiv = document.getElementById('setHeadersDiv')
        let menuHeadersDropdown = document.getElementById('menuSelect')
        console.dir(setHeadersDiv)
        setHeadersDiv!.style.display = ''
        if (!menuHeadersDropdown) {
            console.log(menuHeaders)
            if (menuHeaders !== undefined) {
                createMenuHeaders(menuHeaders, 'setHeadersDiv', 'menuSelect')
            }

        }

    }
    //FETCH DATA AFTER RENDER OF PAGE AND CREATE DROPDOWN MENU
    // ! implement appropiate model from Prisma
    // useEffect(() => {
    //     fetchData()

    //     fetchRestaurantData()
    //         .then((data) => {
    //             setMenuHeaders(data)
    //             menuHeaders.push(data)
    //             console.log(menuHeaders)
    //             if (menuHeaders[0] !== undefined) {
    //                 createMenuHeaders(menuHeaders[0], 'menuHeadersDropdown', 'menuHeadersSelect')
    //             }

    //         })



    // }, [])


    //ON FORM SUBMIT COMMUNICATING WITH FIREBASE TO SEND ENTERED VALUES
    const formSubmit = () => {
        let setHeadersDiv = document.getElementById('setHeadersDiv')
        setHeadersDiv!.style.display = 'none'

        let menuHeaderID = setHeadersDiv?.childNodes[0].options.selectedIndex
        let menuItem = document.getElementById('menuItem')
        let itemDescription = document.getElementById('itemDescription')
        let itemPrice = document.getElementById('itemPrice')
        setName(menuItem?.value)
        setText(itemDescription?.value)
        setPrice(itemPrice?.value)

       // ! implement appropiate model from Prisma
        // const menuItemsCollection = doc(db, 'MenuItems', active.id)
        // updateDoc(menuItemsCollection, {
        //     menuHeaderID,
        //     menuItem: menuItem.value,
        //     itemDescription: itemDescription.value,
        //     lastUpdatedDate: new Date(),
        //     itemPrice: itemPrice.value
        // })
        //setTimeout(() => { window.location.reload() }, 1000)
        active.menuItem = menuItem?.value
        active.itemDescription = itemDescription?.value
        active.itemPrice = itemPrice?.value

    }

    const hideDirectory = () => {
        let directory = document.getElementById('directoryListing')
        let hideButton = document.getElementById('hide-directory')
        let showButton = document.getElementById('show-directory')
        hideButton?.classList.add('hidden')
        directory?.classList.add('hidden')
        showButton?.classList.remove('hidden')
    }
    const showDirectory = () => {
        let directory = document.getElementById('directoryListing')
        let hideButton = document.getElementById('hide-directory')
        let showButton = document.getElementById('show-directory')
        hideButton?.classList.remove('hidden')
        showButton?.classList.add('hidden')
        directory?.classList.remove('hidden')

    }

    const addItem = () => {
        let newItemTitle = document.getElementById('newItemTitle')
        let newItemDescription = document.getElementById('newItemDescription')
        let newItemPrice = document.getElementById('newItemPrice')

        // ! implement appropiate model from Prisma
        // const addNewItemMenu = addDoc(collection(db, 'MenuItems'), {
        //     isPublished: false,
        //     itemDescription: newItemDescription.value,
        //     createdDate: new Date(),
        //     lastUpdatedDate: new Date(),
        //     itemPhotos: [],
        //     menuHeaderID: 0,
        //     modelApproval: null,
        //     modelURL: '',
        //     thumbnailURL: null,
        //     modelUpdate: '',
        //     restaurantID: restaurantMenu,
        //     scaleCompensation: '',
        //     userID: currentUser.uid,
        //     itemPrice: newItemPrice.value,
        //     menuItem: newItemTitle.value
        // })
        //     .then(() => { fetchData() })
        //     .catch(e => console.log(e))
        // addNewItemMenu.id
    }
    // ! implement appropiate model from Prisma
    // const deleteFoodItem = async () => {
    //     await deleteDoc(doc(db, 'MenuItems', active.id))
    //         .then(() => {
    //             console.log(menuItemArray[0])
    //             fetchData()
    //             setEditing(false)
    //             setActive(menuItemArray[0])
    //         })
    //         .catch(e => console.log(e))
    // }

    const handleActiveClick = useCallback((item) => {
        setActive(item);
    }, [])


    return (
        <>
            <div className="z-7">
                <NavBar />
            </div>


            <div className="flex-1 flex overflow-hidden">
                {active !== undefined ? (
                    <main className="flex-1 overflow-y-auto focus:outline-none ">
                        {/* Breadcrumb */}
                        <nav onClick={() => { hideDirectory() }} id="hide-directory" className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
                            <a href="#" className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                                <ChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Hide Menu Items</span>
                            </a>
                        </nav>
                        <nav onClick={() => { showDirectory() }} id="show-directory" className="hidden items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
                            <a href="#" className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                                <ChevronRightIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Show Menu Items</span>
                            </a>
                        </nav>


                        <article>
                            {/* Profile header */}
                            <div>
                                <div className="max-w-5xl mx-auto px-4 mt-[8rem] sm:px-6 lg:px-8">
                                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                        <div className="flex">
                                            <img
                                                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                                src={active.thumbnailURL !== undefined ? active.thumbnailURL : 'https://firebasestorage.googleapis.com/v0/b/plopit-aceb3.appspot.com/o/menuDefault.png?alt=media&token=e3fc6f48-4489-4243-b457-680edfdcbd6c'}
                                                alt=""
                                            />
                                        </div>
                                        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">

                                            <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                                                <h1 className="text-2xl font-bold text-gray-900 truncate">{active !== undefined ? active.menuItem : 'Item Name'}</h1>
                                            </div>
                                            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                                {isEditing ? <>
                                                    <span>
                                                        <button className='inline ml-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => { setConfirmationModal(true) }}>Delete Item</button>

                                                    </span>

                                                    <button
                                                        form='menuedit'
                                                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                        onClick={(e) => { e.preventDefault(); toggleEditing(); formSubmit(e) }}
                                                    >
                                                        <SaveIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <span >Save</span>
                                                    </button>
                                                </> :
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                                        onClick={(e) => { e.preventDefault(); toggleEditing() }}
                                                    >
                                                        <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <span >Edit Item</span>
                                                    </button>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                                        <h1 className="text-2xl font-bold text-gray-900 truncate">{active !== undefined ? active.menuItem : 'Item Name'}</h1>
                                    </div>
                                </div>
                            </div>

                            <ConfirmationModal showConfirmationModal={showConfirmationModal} setConfirmationModal={setConfirmationModal} deleteFoodItem={deleteFoodItem} />

                            {/* Description list */}
                            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                <form id="menuedit" >
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Menu Header Name</dt>
                                            <div id="setHeadersDiv">
                                            </div>
                                            {isEditing ?
                                                <></>
                                                :
                                                <dd className="mt-1 text-sm text-gray-900">{menuHeaders !== undefined ? menuHeaders[active.menuHeaderID] : 'Item Name'}</dd>
                                            }
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            {isEditing ?
                                                <input name="menuItem" id="menuItem" defaultValue={active !== undefined ? active.menuItem : 'Item Name'} className="w-[100%] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={active.menuItem} /> :
                                                <dd className="mt-1 text-sm text-gray-900">{active !== undefined ? active.menuItem : 'Item Name'}</dd>
                                            }
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                                            {isEditing ?
                                                <input name="itemDescription" id="itemDescription" defaultValue={active !== undefined ? active.itemDescription : 'Item Description'} className="w-[100%] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={active.itemDescription} /> :
                                                <dd className="mt-1 text-sm text-gray-900">{active !== undefined ? active.itemDescription : 'Item Description'}</dd>
                                            }
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                                            {isEditing ?
                                                <input name="itemPrice" id="itemPrice" defaultValue={active !== undefined ? active.itemPrice : 'Item Price'} className="w-[100%] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={active.itemPrice} /> :
                                                <dd className="mt-1 text-sm text-gray-900">{active !== undefined ? active.itemPrice : 'Item Price'}</dd>
                                            }
                                        </div>
                                    </dl>
                                </form>
                            </div>
                        </article>
                    </main>) : <div></div>}


                <aside id="directoryListing" className="order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
                    <div className="px-6 pt-6 pb-4">
                        <h2 className="text-lg font-medium text-gray-900">Menu Items</h2>
                        <p className="mt-1 text-sm text-gray-600">Add a New Menu Item</p>
                        <button id='addNewItem' onClick={openModal} className='inline mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>New Item</button>
                        <form className="mt-6 flex space-x-4" action="#">
                            <div id="menuHeadersDropdown" className="flex-1 flex-col min-w-0">


                            </div>

                            <div id="addNewHeaderDiv" className='flex flex-col'>
                                <button onClick={filterItems} type="button" id="filterButton" className='inline h-full bg-blue-500 mb-3 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded'>Filter</button>
                                <button type="button" id="newHeaderButton" onClick={createHeaderTextBox} className='inline h-full bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded'>New Header</button>

                            </div>
                        </form>
                    </div>
                    {/* Directory list */}
                    <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
                        {/* {menuItemArray.map((item)) => (
                <div key={} className="relative">
                    <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                        <h3>A</h3>
                    </div> */}
                        <ul role="list" id="menuItemsList" className="relative z-0 divide-y divide-gray-200">
                            {menuItemArray.map((item) => (
                                <li key={item.id} >
                                    <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                                        <div className="flex-shrink-0">
                                            {/* <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" /> */}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {/* Extend touch target to entire panel */}

                                            <span onClick={() => handleActiveClick(item)} className="absolute inset-0" aria-hidden="true" />
                                            <p className="text-sm font-medium text-gray-900">{item.menuItem}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* </div>))} */}
                        <div className="m-1 mt-5 flex flex-col">
                            <button className="bg-blue-500 self-center hover:bg-blue-700 text-white font-bold py-2 w-[50%] px-4 rounded mb-2" onClick={printQR}>Print QR Code</button>
                            <QRCode id="printCode" className="max-h-full self-center max-w-full mb-8" value={`yummr.io/restaurant/${restaurantMenu}`} />
                        </div>
                    </nav>
                </aside>
                {/*POPUP ELEMENT*/}
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium text-center leading-6 text-gray-900"
                                    >
                                        Enter New Item
                                    </Dialog.Title>
                                    <div className="mt-5 flex">
                                        <form id="newItemForm" className='w-[100%]'>
                                            <input placeholder="item title" className="block w-[100%] mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="newItemTitle" id="newItemTitle"></input>
                                            <input placeholder="item description" className="block w-[100%] mb-3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="newItemDescription" id="newItemDescription"></input>
                                            <input placeholder="item price" className="block mb-3 w-[100%] shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="newItemPrice" id="newItemPrice" />
                                        </form>


                                    </div>
                                    <Dashboard uppy={uppy} className="block" />
                                    <div className="mt-4 flex justify-center align-center">
                                        <button
                                            form="newItemForm"
                                            className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={(e) => { e.preventDefault(); addItem(); closeModal() }}
                                        >
                                            Add Food Item
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div >

        </>
    )
}