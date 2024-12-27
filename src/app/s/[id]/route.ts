import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const shortId = context.params.id
    const link = await prisma.link.findFirst({
        where: {
            shortUrl: {
                endsWith: shortId,
            },
        },
    })

    if (!link) {
        return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
    })

    return NextResponse.redirect(link.originalUrl)
}