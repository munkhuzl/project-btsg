"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPTIONS = OPTIONS;
exports.GET = GET;
exports.POST = POST;
const server_1 = require("@apollo/server");
const next_1 = require("@as-integrations/next");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_2 = require("next/server");
const resolvers_1 = require("@/resolvers");
const schemas_1 = require("@/schemas");
const connect_db_1 = require("@/utils/connect-db");
console.log('GraphQL server starting...');
(0, connect_db_1.connectDb)();
const server = new server_1.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: schemas_1.typeDefs,
    introspection: true,
});
const handler = (0, next_1.startServerAndCreateNextHandler)(server, {
    context: async (req) => {
        const token = req.headers.get('authorization') || '';
        let userId = null;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        }
        catch {
            userId = null;
        }
        return {
            userId,
        };
    },
});
async function OPTIONS() {
    return server_2.NextResponse.json(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}
async function GET(request) {
    const response = await handler(request);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    return response;
}
async function POST(request) {
    const response = await handler(request);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    return response;
}
;
