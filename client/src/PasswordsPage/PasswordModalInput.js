import React, { useEffect } from "react";

function PasswordModalInput({ title, type, placeholder, changeInput }) {
  useEffect(() => {}, []);

  return (
    <div className="container-row">
      <div>
        <label for="site-name" class="form-label">
          <strong>{`${title}: `}</strong>
        </label>
      </div>
      <div>
        <input
          type={type}
          class="form-control1"
          placeholder={placeholder}
          onChange={(e) => changeInput(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default PasswordModalInput;
