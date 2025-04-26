import { useState } from "react";
import MenuItemList from "../../components/MenuItemList";
import MenuPageHeader from "../../components/MenuPageHeader";
import MenuPageNav from "../../components/MenuPageNav";
import { deleteMenuItem } from "../../services/menuItemService";

const MenuPage = () => {

    const [items, setItems] = useState([])

    const handleDelete = async (id) => {

        await deleteMenuItem(id)
        setItems(items.filter((item) => item._id !== id));
        alert("Item deleted successfully")
    }

    return (
        <div>
            <MenuPageHeader />
            <div>
                <MenuPageNav />
            </div>
            <div>
                <MenuItemList handleDelete={handleDelete} items={items} setItems={setItems} />
            </div>
        </div>
    );
};

export default MenuPage;
