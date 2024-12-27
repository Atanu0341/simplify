import Link from 'next/link'

export default function HistoryButton() {
  return (
    <Link href="/history" className="bg-gray-500 text-white px-4 py-2 rounded inline-block">
      View History
    </Link>
  )
}

