import Link from 'next/link';
import Image from 'next/image';
import {
  useActiveRestaurantContext,
  useUpdateActiveRestaurantContext,
} from '../../../../src/context/ActiveRestaurantContext';
import GenreBadge from '../../../reusableItems/components/GenreBadge';

export default function SearchCards({ restaurantArray }: {restaurantArray: any}) {
  const activeRestaurantContext = useActiveRestaurantContext();
  const updateActiveRestaurantContext = useUpdateActiveRestaurantContext();

  const handleSelectedRestaurant = (restaurant: { businessName: any }) => {
    console.log(`selected${restaurant.businessName}`);
    updateActiveRestaurantContext(restaurant);
  };

  return (
    <>
      <div className="w-full">
        <ul role="list" className="space-y-3 w-full">
          {restaurantArray.map((item: { id?: any, restaurantSettings?: any, restaurantInformation?: any, businessName?: any }) => (
            console.log(item),
            <div className=" m-5 mb-10">

              <li key={item.id} ref={`/restaurant/${item.id}`} className="bg-white shadow
              hover:shadow-md  transition-all overflow-hidden w-[100%] sm:rounded-md">
                <Link href={`/restaurant/${item.id}`}>
                  <div className="flex cursor-pointer" onClick={() => { handleSelectedRestaurant(item); }}>
                    <div className="max-w-[50%] p-3 cursor-pointer">
                      <Image width="100%" height="100%" className="   h-96 object-contain rounded"
                        src={item.restaurantSettings.restaurantHeaderImageURL
                          ? item.restaurantSettings.restaurantHeaderImageURL
                          // eslint-disable-next-line max-len
                          : `https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`} alt="" />
                    </div>

                    <div className=" pl-6 pt-6 text-left w-[50%]">
                      <h5 className="text-gray-900 text-[1.5rem] mb-1 font-medium">
                        {item.restaurantInformation.restaurantName !== undefined
                          ? item.restaurantInformation.restaurantName : `My Restaurant`}
                      </h5>
                      <div className="inline-flex space-x-2">
                        <GenreBadge
                          value={Object.entries(item.restaurantSettings.restaurantGenre)}
                          priceRange={item.restaurantSettings.priceRange} />
                      </div>
                      <h3 className="mt-5">{item.restaurantInformation.restaurantDescription}</h3>

                    </div>
                  </div>
                </Link>
              </li>

            </div>
          ))
          }
        </ul >
      </div >
    </>
  );
}
