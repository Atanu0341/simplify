'use client'

import { generateQRCode, shortenUrl } from '@/actions';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const LinkForm = () => {
    const [url, setUrl] = useState('')
    const [result, setResult] = useState<{ shortUrl?: string; qrCode?: string } | null>(null)

    const handleSubmit = async (action: 'shorten' | 'qr') => {

        if (!url) return

        try {
            if (action === 'shorten') {
                const shortUrl = await shortenUrl(url)
                setResult({ shortUrl })
            } else {
                const qrCode = await generateQRCode(url)
                setResult({ qrCode })
            }
        } catch (error) {
            console.log('Error:', error)
        }
    }
    return (
        <div className='space-y-4'>
            <input
                type="url"
                placeholder='Enter a URL'
                className="w-full p-2 border rounded placeholder:text-black text-gray-900"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <div className="flex space-x-2">
                <button
                    onClick={() => handleSubmit('shorten')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Shorten URL
                </button>
                <button
                    onClick={() => handleSubmit('qr')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Generate QR Code
                </button>
            </div>
            {result && (
                <div className="mt-4">
                    {result.shortUrl && (
                        <p>
                            Shortened URL:{' '}
                            <Link href={result.shortUrl} className="text-blue-500">
                                {result.shortUrl}
                            </Link>
                        </p>
                    )}
                    {result.qrCode && <Image src={result.qrCode} alt="QR Code" width={300} height={300} className="mt-2" />}
                </div>
            )}
        </div>
    )
}

export default LinkForm 