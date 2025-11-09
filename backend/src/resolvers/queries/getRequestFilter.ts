import { QueryResolvers } from "@/generated/graphql";
import { RequestModel } from "@/models";

export const getRequests: QueryResolvers['getRequests'] = async (
    _,
    { email, result }
) => {
    const matchQuery: Record<string, string> = {};

    if (email) matchQuery.email = email;
    if (result) matchQuery.result = result;

    const results = await RequestModel.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                requests: { $push: "$$ROOT" },
            },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    return results.map((group) => ({
        year: group._id.year,
        month: group._id.month,
        requests: group.requests,
    }));
};
