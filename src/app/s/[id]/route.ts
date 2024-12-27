// src/app/s/[id]/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

interface ExtendedContext {
    params: { id: string }
}

export async function GET(
    request: NextRequest,
    { params }: ExtendedContext
): Promise<Response> {
    const shortId = params.id
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
            headers: { 'Content-Type': 'application/json' },
        })
    }

    await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
    })

    return Response.redirect(link.originalUrl)
}