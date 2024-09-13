import React, { useEffect } from "react";

function CardModalInput({ title, type, placeholder, changeInput }) {
  useEffect(() => {}, []);

  return (
    <div>
      <label for="site-name" class="form-label">
        {title}
      </label>
      <input
        type={type}
        class="form-control1"
        placeholder={placeholder}
        onChange={(e) => changeInput(e.target.value)}
      ></input>
    </div>
  );
}

export default CardModalInput;
