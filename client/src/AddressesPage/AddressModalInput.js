import React from "react";

function AddressModalInput({title,type,placeholder,changeInput}) {

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

export default AddressModalInput;
