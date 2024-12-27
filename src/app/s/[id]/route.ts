import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const shortId = params.id; // Directly access params from the second argument
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
