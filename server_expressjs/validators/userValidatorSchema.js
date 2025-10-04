// validators/userValidaorSchema.js

import yup from "../config/yup.js";

export const getByEmailValidatorSchema = yup.object().shape({
  email: yup.string().email().required().label("Addresse E-Mail"),
});

export const changePasswordValidatorSchema = yup.object().shape({
  newPassword: yup.string().min(6).required().label("Nouveau Mot de passe"),
  oldPassword: yup.string().min(6).required().label("L'ancien Mot de passe"),
  email: yup.string().email().required().label("Addresse E-Mail"),
});

export const updateUserValidatorSchema = yup.object().shape({
  id: yup.number().required().label("ID"),
  name: yup.string().optional().label("Mot de passe"),
  lastName: yup.string().nullable().notRequired().label("Prénom d'utilisateur"),
  email: yup.string().email().optional().label("Mot de passe"),
  role: yup.string().optional().label("Rôle"),
  active: yup.bool().optional().label("IsActive"),
});
