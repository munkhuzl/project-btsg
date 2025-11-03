"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequests = void 0;
const models_1 = require("@/models");
const getRequests = async (_, { email, result }) => {
    const matchQuery = {};
    if (email)
        matchQuery.email = email;
    if (result)
        matchQuery.result = result;
    const results = await models_1.RequestModel.aggregate([
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
exports.getRequests = getRequests;
