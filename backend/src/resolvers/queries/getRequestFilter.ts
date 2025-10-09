// import { QueryResolvers } from "@/generated/graphql";
// import { RequestModel } from "@/models";
//
//
// export const getRequests: QueryResolvers['getRequests'] = async (_, { email, startDate, endDate, status }) => {
//   const matchQuery = calculateFilter(email, startDate, endDate, status);
//   const groupedRequests = await RequestModel.aggregate([
//     { $match: matchQuery },
//     {
//       $group: {
//         _id: {
//           year: { $year: '$requestDate' },
//           month: { $month: '$requestDate' },
//         },
//         requests: { $push: '$$ROOT' },
//       },
//     },
//     { $sort: { '_id.year': -1, '_id.month': -1 } },
//   ]);
//
//   return groupedRequests.map((group) => ({
//     year: group._id.year,
//     month: group._id.month,
//     requests: group.requests,
//   }));
// };
//
// const calculateFilter = (email?: string | undefined, startTime?: Date, endTime?: Date, result?: string) => {
//   const matchQuery: any = {};
//   if (email) {
//     matchQuery.email = email;
//   }
//   if (startTime) {
//     matchQuery.requestDate = dateFilter(startTime, endTime);
//   }
//   if (result) {
//     matchQuery.result = result;
//   }
//   return matchQuery;
// };
// const dateFilter = (startTime: Date, endTime?: Date) => {
//   return { $gte: new Date(start), $lte: new Date(endDate!) };
// };
