import connectDB from '@/lib/mongodb'

export async function GET() {
    const uri = connectDB()

    if (!uri) {
        return Response.json({ error: 'Failed to get a MongoDB URI.' }, { status: 500 })
    }

    return Response.json({ success: true, uri })
}