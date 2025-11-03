"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const server_1 = require("@apollo/server");
const next_1 = require("@as-integrations/next");
const schemas_1 = require("./schemas");
const resolvers_1 = require("./resolvers");
const connect_db_1 = require("./utils/connect-db");
(0, connect_db_1.connectDb)();
const server = new server_1.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: schemas_1.typeDefs,
    introspection: true,
});
exports.handler = (0, next_1.startServerAndCreateNextHandler)(server, {
    context: async (req) => {
        return { req };
    },
});
