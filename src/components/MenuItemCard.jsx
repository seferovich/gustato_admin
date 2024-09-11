import React from 'react';


const MenuItemCard = ({ item, onEdit }) => {
  return (
    <div className="border p-4 flex flex-col rounded-lg shadow-lg">
      <img src={item.image} alt={item.name} className="w-92 h-92 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
      <p className="text-gray-600 mt-1">{item.description}</p>
      <p className="text-gray-800 font-bold mt-2">${item.price}</p>
      <button 
        onClick={() => onEdit(item)} 
        className="mt-4 bg-[#ffc703] text-white py-2 px-4 rounded hover:bg-[#8e7930]"
      >
        Edit
      </button>
    </div>
  );
};

export default MenuItemCard;
