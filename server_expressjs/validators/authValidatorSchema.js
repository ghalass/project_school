// validators/authValidaorSchema.js

import yup from "../config/yup.js";

export const signupValidatorSchema = yup.object().shape({
  name: yup.string().required().label("Nom d'utilisateur"),
  email: yup.string().email().required().label("Addresse E-Mail"),
  password: yup.string().min(6).required().label("Mot de passe"),
});

export const loginValidatorSchema = yup.object().shape({
  email: yup.string().email().required().label("Addresse E-Mail"),
  password: yup.string().min(6).required().label("Mot de passe"),
});
