// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function createMotherBoardService(MotherBoardName: string, img: any) {}
// async function getAllMotherBoardServie() {
//   return await prisma.motherBoard.findMany({
//     include: {
//       category: {
//         select: {
//           id: true,
//           categoryName: true,
//         },
//       },
//       color: {
//         select: {
//           id: true,
//           color: true,
//           image: {
//             select: {
//               id: true,
//               imageUrl: true,
//             },
//           },
//         },
//       },
//       case: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//       cpu: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//       Ram: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//       storage: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//     },
//   });
// }
// async function getMotherBoardByIdService(id: string) {
//   return await prisma.motherBoard.findUnique({
//     where: { id },
//     include: {
//       category: {
//         select: {
//           id: true,
//           categoryName: true,
//         },
//       },
//       color: {
//         select: {
//           id: true,
//           color: true,
//           image: {
//             select: {
//               id: true,
//               imageUrl: true,
//             },
//           },
//         },
//       },
//       case: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//       cpu: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//       Ram: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//       storage: {
//         include: {
//           color: {
//             select: {
//               id: true,
//               color: true,
//               image: {
//                 select: {
//                   id: true,
//                   imageUrl: true,
//                 },
//               },
//             },
//           },
//           category: {
//             select: {
//               id: true,
//               categoryName: true,
//             },
//           },
//         },
//       },
//     },
//   });
// }
// async function deleteMotherBoardService(id: string) {
//   return await prisma.motherBoard.delete({
//     where: { id },
//   });
// }
// async function getMotherBoardByName(name: string) {}
// async function updateMotherBoardService(
//   id: string,
//   name: string,
//   imgUrl: string
// ) {}
// export default {
//   createMotherBoardService,
//   getAllMotherBoardServie,
//   getMotherBoardByIdService,
//   deleteMotherBoardService,
//   updateMotherBoardService,
//   getMotherBoardByName,
// };
