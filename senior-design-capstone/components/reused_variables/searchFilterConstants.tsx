import React from "react"

export const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Recommended', href: '#', current: false },
  { name: 'Closest', href: '#', current: false },

]

export const filters = [
  {
    id: 'cuisine_type',
    name: 'Cuisine',
    options: [
      { value: 'sandwiches', label: 'Sandwiches', checked: false },
      { value: 'mexican', label: 'Mexican', checked: false },
      { value: 'italian', label: 'Italian', checked: false },
      { value: 'fastFood', label: 'Fast Food', checked: false },
      { value: 'bakeries', label: 'Bakeries', checked: false },
    ]
  },
  {

    id: 'features',
    name: 'Features',
    options: [
      { value: 'wifi', label: 'Free Wifi', checked: false },
      { value: 'outdoor', label: 'Outdoor Seating', checked: false },
      { value: 'reservations', label: 'Reservations', checked: false },
      { value: 'wheelchair', label: 'Wheelchair Accessible', checked: false }
    ],
  },
  {
    id: 'Price',
    name: 'Price Range',
    options: [
      { value: 'low', label: 'Low ($10-15)', checked: false },
      { value: 'medium', label: 'Medium ($20-30)', checked: false },
      { value: 'high', label: 'High ($40+)', checked: false }
    ],
  },
  {
    id: 'dietary',
    name: 'Dietary',
    options: [
      { value: 'vegetarian', label: 'Vegetarian', checked: false },
      { value: 'vegan', label: 'Vegan', checked: false },
      { value: 'gluten-free', label: 'Gluten-free', checked: false },
      { value: 'vegan', label: 'Vegan', checked: false },
      { value: 'halal', label: 'Halal', checked: false },
      { value: 'kosher', label: 'Kosher', checked: false }
    ],
  },
]