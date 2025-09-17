import React from "react";

function SidebarLink({icon, text , active ,onClick,  activeIcon}) {
    // const activeClass = active ? 'text-blue-600': 'text-gray-700';
    const activeClass = active 
    ? 'bg-blue-600 text-white'
    : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:text-blue-600 ';
    
    // return (
    //     <a href="#" onClick={onClick} className={`flex items-center space-x-3 hover:text-blue-600 font-semibold ${activeClass}`}>
    //         {icon}
    //         <span>{text}</span>
    //     </a>
    // )
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center space-x-3 w-full px-4 py-2 rounded-md font-semibold transition-colors 
                ${active ? "bg-blue-100 text-blue-600" : "text-gray-700 "} ${activeClass}`}
        >
            {/* {icon} */}
            <span>{active ? activeIcon : icon}</span>
            <span>{text}</span>

        </button>
    )
}
export default SidebarLink;