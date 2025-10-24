import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4">
          Invoice Intelligence
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          AI-powered invoice processing with Azure Document Intelligence
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="rounded-lg bg-gray-200 px-8 py-3 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      <section id="features" className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Upload Multiple PDFs</h3>
            <p className="text-gray-600">Drag and drop or select multiple invoice PDFs for batch processing</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">AI Data Extraction</h3>
            <p className="text-gray-600">Powered by Azure Document Intelligence for accurate data extraction</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">System Integration</h3>
            <p className="text-gray-600">Export extracted data to your existing business systems</p>
          </div>
        </div>
      </section>
    </main>
  )
}