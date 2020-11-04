export  const loginUser = (userObj) => ({type: "login user", payload: userObj})

export  const SaveFavorite = (itemObj) => ({type: "favorite item", payload: itemObj})

export  const deleteItem = (itemObj) => ({type: "delete item", payload: itemObj})
