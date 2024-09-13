

export const signIn = (id, name, isLoggedIn) => {
  return {
    type: "SIGN_IN",
    id: id,
    name: name,
    isLoggedIn: isLoggedIn,
  };
};
export const signOut = (id, name, isLoggedIn) => {
  return {
    type: "SIGN_OUT",
    id: id,
    name: name,
    isLoggedIn: isLoggedIn,
  };
};
export const setIndex = (index) => {
  return {
    type: "SET_INDEX",
    index: index,
  };
};
