import connectDB from '@/lib/mongodb'

// Visit http://localhost:3000/api/test-db to test if you can get your db connect URI.
export async function GET() {
    const uri = connectDB()

    if (!uri) {
        return Response.json({ error: 'Failed to get a MongoDB URI.' }, { status: 500 })
    }

    return Response.json({ success: true, uri })
}