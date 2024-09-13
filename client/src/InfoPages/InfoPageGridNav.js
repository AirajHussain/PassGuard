import React from "react";


function InfoPageGridNav({firstIndex,lastIndex,setFirstIndex,setLastIndex,arrayLength}) {

  const handleNextClick = () => {
    console.log(arrayLength);
    if(arrayLength===0){
      return;
    }
    if (lastIndex>=arrayLength) {
      return;
    }
    else{
        if (lastIndex + 10 < arrayLength) {
            setFirstIndex(lastIndex);
            setLastIndex(lastIndex + 10);
          } else {
            setFirstIndex(lastIndex);
            setLastIndex(arrayLength);
          }
    }
    
  };
  const handlePreviousClick = () => {
    if(arrayLength===0){
      return;
    }
    if (firstIndex === 0 && lastIndex === 10) {
      return;
    }
    if (firstIndex - 10 > 0) {
      setLastIndex(firstIndex);
      setFirstIndex(firstIndex - 10);
    } else {
      setLastIndex(firstIndex);
      setFirstIndex(0);
    }
  };
  return (
    <div className="table-nav">
      <div>
        <i
          class="bi bi-plus-circle add-password"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        ></i>
      </div>

      <div className="flex-row">
        <i class="bi bi-arrow-left-circle arrows" onClick={handlePreviousClick}></i>
        <i class="bi bi-arrow-right-circle arrows" onClick={handleNextClick}></i>
      </div>
    </div>
  );
}

export default InfoPageGridNav;
