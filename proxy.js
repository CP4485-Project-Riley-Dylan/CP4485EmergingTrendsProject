import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = request.cookies.get('token')?.value;
    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET)

    try {
        await jwtVerify(session, secret)
    }
    catch {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/transactions/:path*',
        '/analytics/:path*',
        '/api/user',
        '/api/transactions/:path*'
    ]
}