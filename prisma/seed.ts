import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
async function main() {
  const listBrandName = ["asus", "dell", "acer", "lenovo", "hp"];
  for (let i = 0; i < listBrandName.length; i++) {
    var brand = await prisma.brand.create({
      data: {
        brandName: listBrandName[i],
        Image: {
          create: {
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/wad-final-image-storage.appspot.com/o/brand%2F02c819b9-a1eb-48ec-a22b-d8c58fbf651d.png?alt=media&token=7ccbadbe-7559-4b17-8297-836fe44f77a4",
          },
        },
      },
    });
  }
}

main()
  .then(async () => {})
  .catch(async (e) => {
    console.error(e);
  });
