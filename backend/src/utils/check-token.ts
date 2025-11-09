import jwt from "jsonwebtoken";
interface JwtPayload {
  role: string;
}

interface GraphQLContext {
    req: {
        headers: {
            get: (name: string) => string | null;
        };
    };
}


const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === "object" && "role" in decoded) {
      return decoded as JwtPayload;
    }
    return null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const checkToken = (roles: string[], context: GraphQLContext): boolean | undefined => {
  const token = context.req.headers.get("authorization");
  if (!token) return undefined;
  const decoded = verifyToken(token);
  if (!decoded) return undefined;
  return roles.includes(decoded?.role as string) || false;
};
