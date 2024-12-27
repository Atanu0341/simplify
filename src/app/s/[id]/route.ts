import { PrismaClient } from '@prisma/client'
import { type NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
    req: NextRequest,
) {
    // Get the id from the URL path segments
    const segments = req.nextUrl.pathname.split('/')
    const shortId = segments[segments.length - 1]

    const link = await prisma.link.findFirst({
        where: {
            shortUrl: {
                endsWith: shortId,
            },
        },
    })

    if (!link) {
        return new Response(JSON.stringify({ error: 'Not Found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
    })

    return Response.redirect(link.originalUrl)
}