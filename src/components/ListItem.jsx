import React, { useCallback, useEffect, useMemo, useRef } from "react";

const ListItem = ({ item, index, onUpdate, editableItem, setEditableItem }) => {
  const inputRef = useRef(null);
  const isEditable = useMemo(
    () => item.id === editableItem,
    [editableItem, item]
  );

  const onCheckboxChange = (isChecked) => {
    onUpdate({
      ...item,
      checked: isChecked,
    });
  };

  const onDoubleClick = useCallback(() => {
    setEditableItem(item.id);
  }, [setEditableItem]);

  const onUpdateClick = useCallback(() => {
    const text = inputRef.current.value;
    let checked = item.checked;
    if (item.text !== text) {
      checked = false;
    }
    onUpdate({
      ...item,
      checked,
      text,
    });
    setEditableItem(null);
  }, [inputRef, item, onUpdate]);

  const onUpdateCancel = () => {
    setEditableItem(null);
  };

  useEffect(() => {
    console.log(inputRef.current);
  }, [inputRef.current]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>{`${index + 1} :`}</div>
      {isEditable ? (
        <>
          <input
            id="test"
            type="text"
            defaultValue={item.text}
            ref={(element) => {
              inputRef.current = element;
            }}
          />
          <button onClick={onUpdateClick}>Update</button>
          <button onClick={onUpdateCancel}>Cancel</button>
        </>
      ) : (
        <>
          <div
            style={
              item.checked
                ? {
                    textDecorationLine: "line-through",
                  }
                : {}
            }
            onDoubleClick={onDoubleClick}
          >
            {item.text}
          </div>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) => {
              onCheckboxChange(e.target.checked);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ListItem;
