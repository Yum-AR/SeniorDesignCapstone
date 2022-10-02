/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, DownloadIcon, XIcon } from '@heroicons/react/outline';
import DataTable from 'react-data-table-component';
// import Pagination from "../Functionality/Pagination";
import { collection, doc, DocumentData, getDocs, query, QueryDocumentSnapshot, updateDoc, where } from '@firebase/firestore';
import { db } from '../../firebase/clientApp';

const DashboardTable: React.FC = () => {
  const [ open, setOpen ] = useState(false);
  const [ approvalType, setApprovalType ] = useState();
  const approvalModel = async row => {
    const updateRow = doc(db, `MenuItems`, row.id);
    await updateDoc(updateRow, {
      modelApproval: true,
    }).then(() => {
      setApprovalType(`approve`);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 500);
      fetchData();
    });
  };
  const denyModel = async (row) => {
    const updateRow = doc(db, `MenuItems`, row.id);
    await updateDoc(updateRow, {
      modelApproval: false,
    }).then(() => {
      setApprovalType(`deny`);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 500);
      fetchData();
    });
  };

  const columns = [
    {
      name: `image`,
      cell: (row) =>
        <>
          {row.thumbnailURL ? <img className="w-[50%] h-[50%]" src={row.thumbnailURL} /> : ` no image`}

        </>,

    },
    {
      name: `created date`,
      selector: (row) => {
        if (row.createdDate) {
          return row.createdDate.toDate().toGMTString();
        }
        return `no date`;

      },
      sortable: true,
    },
    {
      name: `Name`,
      selector: row => row.menuItem,
      sortable: true,
    },
    {
      name: `Restaurant ID`,
      selector: row => row.id,
      sortable: true,
    },
    {
      name: `download`,
      cell: (row) =>
        <button
          onClick={(e) => { e.preventDefault(); location.href = row.modelURL; }}
          data-tag="allowRowEvents"
          className='text-white font-bold py-2 px-4 rounded'
          id={row.id}><span><DownloadIcon
            className="h-6 w-6 text-blue-600 hover:text-blue-800"
            aria-hidden="true" /></span>
        </button>,

    },
    {
      name: `Approval`,
      cell: (row) => <div className="flex">

        <button onClick={(e) => { e.preventDefault(); approvalModel(row); }}
          data-tag="allowRowEvents"
          className='  mr-3 text-white font-bold py-2 px-4 rounded'
          id={row.id}><span>
            <div className=" flex items-center justify-center h-12 w-12 rounded-full bg-green-100 hover:bg-green-200">
              <CheckIcon className="h-6 w-6 text-green-600 " aria-hidden="true" />
            </div></span></button>
        <button onClick={(e) => { e.preventDefault(); denyModel(row); }}
          data-tag="allowRowEvents"
          className=' mr-3 text-white font-bold py-2 px-4 rounded'
          id={row.id}><span><div
            className=" flex items-center justify-center h-12 w-12 rounded-full bg-red-100 hover:bg-red-200">
            <XIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div></span></button>

      </div>,
    },

  ];

  const menuItemsCollectionReference = collection(db, `MenuItems`);
  const [ menuItems, setMenuItems ] = useState<Array<QueryDocumentSnapshot<DocumentData>>>([]);

  const fetchData = async () => {
    const menuItemsQuery = query(menuItemsCollectionReference, where(`modelApproval`, `==`, null));

    getDocs(menuItemsQuery)
      .then((querySnapshot) => {
        const newMenuDataArray = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        setMenuItems(newMenuDataArray);

      })
      .catch((err) => {
        console.error(`Failed to get data`, err);
      });
  };
  const MINUTE_MS = 30000;
  useEffect(() => {

    fetchData().catch(e => console.error(e));
    const body = document.querySelector(`body`);
    body.classList.add(`overflow-hidden`);
    const pos = document.getElementsByClassName(`.gJVjWL`);
    const interval = setInterval(() => {
      fetchData().catch(e => console.error(e));
    }, MINUTE_MS);
    return () => clearInterval(interval);
    // console.log(menuItems)
  }, []);

  return (
    <>

      <div className=" h-[90vh] overflow-x-hidden">
        <DataTable title='Menu Items Approval' columns={columns} data={menuItems} pagination></DataTable>
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
              {approvalType === `approve` ? <div className="relative inline-block align-bottom
               bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl
               transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Model Approved
                    </Dialog.Title>
                    <div className="mt-2">
                    </div>
                  </div>
                </div>
              </div> : <div className="relative inline-block align-bottom
               bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
               shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <XIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Model Denied
                    </Dialog.Title>
                    <div className="mt-2">
                    </div>
                  </div>
                </div>
              </div>}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default DashboardTable;
