import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const listBrandName = [
    "asus",
    "dell",
    "acer",
    "lenovo",
    "hp",
    "apple",
    "rog",
  ];
  const listCategoryName = [
    "gpu",
    "cpu",
    "ram",
    "motherBoard",
    "powerSupply",
    "storage",
    "case",
  ];
  for (let i = 0; i < listBrandName.length; i++) {
    let brand = await prisma.brand.create({
      data: {
        brandName: listBrandName[i],
        category: {
          create: {
            categoryName: listCategoryName[i],
            Image: {
              create: {
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/wad-final-image-storage.appspot.com/o/category%2F1-gaming-build-components%20(1).jpg?alt=media&token=40e8c7c9-0707-4b06-a04e-d295b12cbb75",
              },
            },
          },
        },
        Image: {
          create: {
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/wad-final-image-storage.appspot.com/o/brand%2Fdownload.png?alt=media&token=de7301e3-15a9-4fe6-a86e-5723a1715551",
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
