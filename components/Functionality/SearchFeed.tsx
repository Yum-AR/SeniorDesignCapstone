import React from 'react';
import Image from 'next/image';
const items = [
  { id: 1 },
  { id: 2 },
  // More items...
];

const SearchFeed: React.FC = () =>
  <ul role="list" className="space-y-3">
    {items.map((item) =>
      <li key={item.id} className="bg-white shadow overflow-hidden
        sm:rounded-md flex flex-col md:flex-row md:max-w-xl">
        <Image className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg
          md:rounded-none md:rounded-l-lg"
        src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg" alt="" />
        <div className="p-6 flex flex-col justify-start">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
          <p className="text-gray-700 text-base mb-4">
            This is a wider card with supporting text below as
            a natural lead-in to additional content. This content is a little bit longer.
          </p>
          <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
        </div>
      </li>)}
  </ul>;
export default SearchFeed;
