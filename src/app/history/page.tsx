import { getHistory } from '@/src/actions'
import Image from 'next/image'
import Link from 'next/link'

export default async function HistoryPage() {
  const links = await getHistory()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Link History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border p-2 text-left">Original URL</th>
              <th className="border p-2 text-left">Short URL</th>
              <th className="border p-2 text-left">Clicks</th>
              <th className="border p-2 text-left">QR Code</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <td className="border p-2 text-sm sm:text-base">{link.originalUrl}</td>
                <td className="border p-2 text-sm sm:text-base">
                  <Link href={link.shortUrl} className="text-blue-500 break-words">
                    {link.shortUrl}
                  </Link>
                </td>
                <td className="border p-2 text-sm sm:text-base">{link.clicks}</td>
                <td className="border p-2">
                  {link.qrCode && (
                    <Image
                      src={link.qrCode}
                      alt="QR Code"
                      width={300}
                      height={300}
                      className="w-24 h-24 sm:w-32 sm:h-32 mx-auto"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
