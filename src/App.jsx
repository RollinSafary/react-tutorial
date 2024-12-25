import { useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import ListItem from "./components/ListItem";

function App() {
  const [list, setList] = useState([]);
  const [editableItem, setEditableItem] = useState(null);

  const onCreateClick = (text) => {
    const newItem = {
      id: Date.now(),
      text,
      checked: false,
    };
    setList((prevList) => [...prevList, newItem]);
  };

  const updateListItem = (item) => {
    setList((prevList) => {
      const targetIndex = prevList.findIndex(
        (prevItem) => prevItem.id === item.id
      );
      const listCopy = [...prevList];
      listCopy[targetIndex] = item;
      return listCopy;
    });
  };

  return (
    <div className="App">
      <CreateTodo onClick={onCreateClick} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {list.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            index={index}
            onUpdate={updateListItem}
            editableItem={editableItem}
            setEditableItem={setEditableItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
