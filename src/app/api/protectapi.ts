import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "@/Models/UserSchema";

export interface Authrequest extends NextRequest {
    user?: any;
    GET?: (req: Authrequest) => Promise<any>;
    POST?: (req: Authrequest) => Promise<any>;
    PATCH?: (req: Authrequest) => Promise<any>;
    DELETE?: (req: Authrequest) => Promise<any>;
}

export async function protect(req: Authrequest): Promise<any> {
    if (req.headers && req.headers.get('authorization')) {
        const authHeader = req.headers.get('authorization') as string;

        if (authHeader.startsWith('Bearer')) {
            const token = authHeader.split(' ')[1];
            if (!token) {
                return false;
            }
            try {
                const decoded = jwt.verify(token, process.env.SECRETKEY) as JwtPayload;
                const getUser = await User.findById(decoded.id);

                if (!getUser) {
                    return false;
                }

                req.user = getUser; // Attach user information to the request object
                return true; // Authentication successful
            } catch (err) {
                console.error("Error verifying JWT:", err);
                return false; // Error occurred during JWT verification or user retrieval
            }
        } else {
            return false; // Invalid authorization header format
        }
    } else {
        return false; // Authorization header missing
    }
}
