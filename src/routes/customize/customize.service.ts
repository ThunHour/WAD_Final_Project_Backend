// import { PrismaClient, Image } from "@prisma/client";
// const prisma = new PrismaClient();

// async function createCustomizeService(CustomizeName: string, img: any) {}
// async function getAllCustomizeServie() {
//   const customs = await prisma.customize.findMany({
//     include: {
//       case: {
//         include: {
//           category: {
//             select: {
//               categoryName: true,
//               id: true,
//               Image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       cpu: {
//         include: {
//           category: {
//             select: {
//               categoryName: true,
//               id: true,
//               Image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       gpu: {
//         include: {
//           category: {
//             select: {
//               categoryName: true,
//               id: true,
//               Image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       powerSupply: {
//         include: {
//           category: {
//             select: {
//               categoryName: true,
//               id: true,
//               Image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       motherBoard: {
//         include: {
//           category: {
//             select: {
//               categoryName: true,
//               id: true,
//               Image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       ram: {
//         include: {
//           category: {
//             select: {
//               categoryName: true,
//               id: true,
//               Image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       storage: {
//         include: {
//           category: {
//             select: {
//               categoryName: true,
//               id: true,
//               Image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//       user: {
//         select: {
//           id: true,
//           email: true,
//           name: true,
//           password: true,
//           phoneNumber: true,
//           role: true,
//         },
//       },
//     },
//   });
//   var addImg = customs.map((c, index) => {
//     var cus = c;
//   });
//   return addImg;
// }
// async function getCustomizeByIdService(id: string) {}
// async function deleteCustomizeService(id: string) {}
// async function getCustomizeByName(name: string) {}
// async function updateCustomizeService(
//   id: string,
//   name: string,
//   imgUrl: string
// ) {}
// export default {
//   createCustomizeService,
//   getAllCustomizeServie,
//   getCustomizeByIdService,
//   deleteCustomizeService,
//   updateCustomizeService,
//   getCustomizeByName,
// };
