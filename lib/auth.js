import { jwtVerify } from "jose";
import { cookies } from "next/headers";
export async function getUserId() {
    let myCookies = await cookies();
    let token = myCookies.get("token");
    if (!token) {
        return null;
    }
    let secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let { payload } = await jwtVerify(token.value, secret);
    return payload.userId;
}