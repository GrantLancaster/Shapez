

export function validateData(userData) {
  const validatedUser = userData;
  //Start by checking the name
  if (typeof userData.name == "string" && userData.name.length <= 20) {
    validatedUser.name = validatedUser.name.toLowerCase();
  } else {
    return { isValid:false, user: validatedUser }
  }

  //Check the color value in the user
  if (typeof userData.color == "string" && userData.color.length <= 20) {
    validatedUser.color = validatedUser.color.toLowerCase();
  } else {
    return { isValid:false, user: validatedUser }
  }

  //Check the shape value in the user
  if (typeof userData.shape == "string" && 
    ["square", "circle", "triangle", "star"].includes(userData.shape.toLowerCase())) {
      validatedUser.shape = validatedUser.shape.toLowerCase();
  } else {
    return { isValid:false, user: validatedUser }
  }

  return { isValid:true, user: validatedUser }
}