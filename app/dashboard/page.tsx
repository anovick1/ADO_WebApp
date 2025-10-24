'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PDFUploader from '@/components/ui/PDFUploader'

interface InvoiceData {
  invoiceNumber: string
  vendorName: string
  vendorAddress: string
  customerName: string
  customerAddress: string
  invoiceDate: string
  dueDate: string
  items: {
    description: string
    quantity: number
    unitPrice: number
    amount: number
  }[]
  subtotal: number
  tax: number
  total: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processedInvoices, setProcessedInvoices] = useState<InvoiceData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/auth/login')
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const handleFilesSelected = async (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files])
    setIsProcessing(true)

    // Process each file
    for (const file of files) {
      try {
        const response = await fetch('/api/invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName: file.name }),
        })

        if (response.ok) {
          const data = await response.json()
          setProcessedInvoices(prev => [...prev, data])
        }
      } catch (error) {
        console.error('Error processing invoice:', error)
      }
    }

    setIsProcessing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    setProcessedInvoices(prev => prev.filter((_, i) => i !== index))
  }

  const exportData = () => {
    const dataStr = JSON.stringify(processedInvoices, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'invoices-export.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Invoice Processing Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Upload Invoice PDFs</h2>
          <PDFUploader onFilesSelected={handleFilesSelected} />
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Uploaded Files ({uploadedFiles.length})</h2>
              {processedInvoices.length > 0 && (
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Export All Data
                </button>
              )}
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="px-6 py-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-8">
            <p className="text-gray-600">Processing invoices...</p>
          </div>
        )}

        {processedInvoices.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-4">Processed Invoices</h2>
            <div className="grid gap-6">
              {processedInvoices.map((invoice, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Invoice #{invoice.invoiceNumber}</h3>
                      <p className="text-sm text-gray-600">Date: {invoice.invoiceDate}</p>
                      <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${invoice.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-1">Vendor</h4>
                      <p className="text-sm">{invoice.vendorName}</p>
                      <p className="text-sm text-gray-600">{invoice.vendorAddress}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Customer</h4>
                      <p className="text-sm">{invoice.customerName}</p>
                      <p className="text-sm text-gray-600">{invoice.customerAddress}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Line Items</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Description</th>
                          <th className="text-right py-2">Qty</th>
                          <th className="text-right py-2">Unit Price</th>
                          <th className="text-right py-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="border-b">
                            <td className="py-2">{item.description}</td>
                            <td className="text-right py-2">{item.quantity}</td>
                            <td className="text-right py-2">${item.unitPrice.toFixed(2)}</td>
                            <td className="text-right py-2">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="text-right py-2 font-medium">Subtotal:</td>
                          <td className="text-right py-2">${invoice.subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="text-right py-2 font-medium">Tax:</td>
                          <td className="text-right py-2">${invoice.tax.toFixed(2)}</td>
                        </tr>
                        <tr className="font-bold">
                          <td colSpan={3} className="text-right py-2">Total:</td>
                          <td className="text-right py-2">${invoice.total.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}