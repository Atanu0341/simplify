import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, context: { params: { id: string } }) {
    const shortId = context.params.id; // Access params through the context object
    const link = await prisma.link.findFirst({
        where: {
            shortUrl: {
                endsWith: shortId
            }
        }
    })

    if (!link) {
        return new NextResponse('Not Found', { status: 404 })
    }

    await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } }
    })

    return NextResponse.redirect(link.originalUrl)
}
