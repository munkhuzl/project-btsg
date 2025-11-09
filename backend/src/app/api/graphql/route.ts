import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Context } from '@/types';
import { resolvers } from '@/resolvers';
import { typeDefs } from '@/schemas';
import { connectDb } from '@/utils/connect-db';

console.log('GraphQL server starting...');
connectDb();

const server = new ApolloServer<Context>({
    resolvers,
    typeDefs,
    introspection: true,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
    context: async (req) => {
        const token = req.headers.get('authorization') || '';
        let userId = null;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            userId = decoded.id;
        } catch {
            userId = null;
        }

        return { userId };
    },
});

const allowedOrigin = 'https://project-btsg-client.vercel.app';

export async function OPTIONS() {
    return NextResponse.json(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}

export async function GET(request: NextRequest) {
    const response = await handler(request);
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
}

export async function POST(request: NextRequest) {
    const response = await handler(request);
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
}
