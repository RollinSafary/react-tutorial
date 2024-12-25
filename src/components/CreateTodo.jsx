import React, { useCallback, useRef } from "react";

const CreateTodo = ({ onClick }) => {
  const ref = useRef(null);

  const handleClick = useCallback(() => {
    if (!ref.current) {
      return;
    }

    onClick(ref.current.value);
    ref.current.value = "";
  }, [ref, onClick]);
  return (
    <div>
      <input ref={ref} type="text" placeholder="Write todo here"></input>
      <button onClick={handleClick}>Create Item</button>
    </div>
  );
};

export default CreateTodo;
