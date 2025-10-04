import HttpStatus from "../utils/httpStatus.js";
import prisma from "../utils/prismaClient.js";

export const dashboard = async (req, res) => {
  const usersCount = await prisma.user.count();
  res.status(HttpStatus.OK).json({ usersCount });
};
