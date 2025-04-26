import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMenu } from "../redux/menuSlice";

const AddMenuForm = () => {
  const [menuName, setMenuName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMenu({ id: Date.now(), name: menuName, description }));
    setMenuName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={menuName} onChange={(e) => setMenuName(e.target.value)} placeholder="Menu Name" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Add Menu</button>
    </form>
  );
};

export default AddMenuForm;
