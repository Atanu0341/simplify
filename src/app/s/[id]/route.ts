import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export default async function ShortLinkPage({ params }: { params: { id: string } }) {
    const shortId = params.id
    const link = await prisma.link.findFirst({
        where: {
            shortUrl: {
                endsWith: shortId,
            },
        },
    })

    if (!link) {
        throw new Error('Link not found')
    }

    await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
    })

    redirect(link.originalUrl)
}