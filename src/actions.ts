'use server'

import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import QRCode from 'qrcode'

const prisma = new PrismaClient()

export async function shortenUrl(originalUrl: string) {
    const shortId = nanoid(8)
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/s/${shortId}`

    await prisma.link.create({
        data: {
            originalUrl,
            shortUrl
        }
    })

    return shortUrl;
}

export async function generateQRCode(url: string) {
    const qrCode = await QRCode.toDataURL(url)

    await prisma.link.create({
        data: {
            originalUrl: url,
            shortUrl: url,
            qrCode
        }
    })

    return qrCode
}

export async function getHistory() {
    return prisma.link.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
}