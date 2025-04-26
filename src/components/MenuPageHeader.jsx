import React from 'react'

function MenuPageHeader() {

    const imageUrl = 'https://res.cloudinary.com/dfm6raue1/image/upload/v1742993296/menu_header_tvrv1v.jpg';


    return (
        <header className="relative h-[311px]">
            <div
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{ backgroundImage: `url('${imageUrl}')` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent"></div>
            </div>
            <div className="relative flex justify-center items-center h-full">
                <div className="flex flex-col items-center gap-8 max-w-4xl px-4">
                    <h1 className="text-4xl sm:text-8xl font-extrabold text-white">MENU</h1>
                    <p className="text-white max-w-md">
                        Please take a look at our menu featuring food, drinks, and brunch.
                        If you'd like to place an order, use the "Order Online" button located below the menu.
                    </p>
                </div>
            </div>
        </header>
    )
}

export default MenuPageHeader