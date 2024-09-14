import React from 'react'


const MenuItemCard = ({ item, onEdit }) => {
  return (
    <div className="border p-4 flex flex-col rounded-lg shadow-lg justify-around">
      <img src={item.image} alt={item.name} className="h-96  object-contain" />
      <h2 className="text-xl font-semibold text-[#212121] mt-2">{item.name}</h2>
      <p className="text-[#212121] mt-1">{item.description}</p>
      <p className="text-[#212121] font-bold mt-2">${item.price}</p>
      <button 
        onClick={() => onEdit(item)} 
        className="mt-4 bg-[#ffc703] text-white py-2 px-4 rounded hover:bg-[#212121] hover:text-[#ffc703]"
      >
        Edit
      </button>
    </div>
  );
};

export default MenuItemCard;
