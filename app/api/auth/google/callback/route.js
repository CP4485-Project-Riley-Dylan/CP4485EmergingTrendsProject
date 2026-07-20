import { NextResponse } from "next/server";
import { getGoogleUserInfo, updateUserInfoInDatabase } from "@/lib/googleOauthUtils";
import { cookies } from "next/headers";
import {SignJWT} from "jose";

export async function GET(request) {
    try {
        let url = new URL(request.url);
        let code = url.searchParams.get("code");
        if (!code) {
            return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
        }

        let userInfo = await getGoogleUserInfo(code);
        let updatedUser = await updateUserInfoInDatabase(userInfo);

        let token = await new SignJWT({ 
            userId: updatedUser._id.toString(),
            email: updatedUser.email,
            name: updatedUser.name,
            picture: updatedUser.picture
        })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
        let myCookie = await cookies();
        myCookie.set("token", token, { httpOnly: true, path: "/" });

        return NextResponse.redirect(new URL("/transactions", request.url));
    } catch (e) {
        console.error("Error in Google OAuth callback:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}   

