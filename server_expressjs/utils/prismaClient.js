// prismaClient.js

import { PrismaClient } from "@prisma/client";
import { config } from "../config/environment.js";

let prisma;

if (config.NODE_ENV === "production") {
  // En production, nous évitons de recréer l'instance pour chaque requête
  prisma = new PrismaClient();
} else {
  // En mode développement, on utilise une instance globale pour éviter de multiples connexions
  // lorsqu'on recharge l'application (par exemple avec nodemon)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
