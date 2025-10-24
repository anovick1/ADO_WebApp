import { NextResponse } from 'next/server'

// Hardcoded sample invoice data
const sampleInvoices = [
  {
    invoiceNumber: 'INV-2025-001',
    vendorName: 'Acme Corporation',
    vendorAddress: '123 Business St, Suite 100, San Francisco, CA 94105',
    customerName: 'Tech Startup Inc.',
    customerAddress: '456 Innovation Ave, Palo Alto, CA 94301',
    invoiceDate: '2025-01-15',
    dueDate: '2025-02-15',
    items: [
      {
        description: 'Cloud Computing Services - Monthly',
        quantity: 1,
        unitPrice: 2500.00,
        amount: 2500.00
      },
      {
        description: 'Data Storage (500GB)',
        quantity: 5,
        unitPrice: 50.00,
        amount: 250.00
      },
      {
        description: 'API Calls (per 1M)',
        quantity: 10,
        unitPrice: 100.00,
        amount: 1000.00
      }
    ],
    subtotal: 3750.00,
    tax: 337.50,
    total: 4087.50
  },
  {
    invoiceNumber: 'INV-2025-002',
    vendorName: 'Digital Solutions Ltd.',
    vendorAddress: '789 Tech Park, Building A, Austin, TX 78701',
    customerName: 'Enterprise Client Corp.',
    customerAddress: '321 Corporate Blvd, New York, NY 10001',
    invoiceDate: '2025-01-20',
    dueDate: '2025-02-20',
    items: [
      {
        description: 'Software License - Enterprise',
        quantity: 50,
        unitPrice: 199.99,
        amount: 9999.50
      },
      {
        description: 'Implementation Services',
        quantity: 40,
        unitPrice: 150.00,
        amount: 6000.00
      },
      {
        description: 'Training (per user)',
        quantity: 25,
        unitPrice: 75.00,
        amount: 1875.00
      },
      {
        description: 'Support Package - Premium',
        quantity: 1,
        unitPrice: 5000.00,
        amount: 5000.00
      }
    ],
    subtotal: 22874.50,
    tax: 2058.71,
    total: 24933.21
  },
  {
    invoiceNumber: 'INV-2025-003',
    vendorName: 'Marketing Agency Pro',
    vendorAddress: '555 Creative Way, Los Angeles, CA 90028',
    customerName: 'E-commerce Store LLC',
    customerAddress: '999 Shopping Plaza, Chicago, IL 60601',
    invoiceDate: '2025-01-25',
    dueDate: '2025-02-25',
    items: [
      {
        description: 'Social Media Campaign',
        quantity: 1,
        unitPrice: 8500.00,
        amount: 8500.00
      },
      {
        description: 'Content Creation (Blog Posts)',
        quantity: 20,
        unitPrice: 250.00,
        amount: 5000.00
      },
      {
        description: 'Email Marketing Setup',
        quantity: 1,
        unitPrice: 3000.00,
        amount: 3000.00
      }
    ],
    subtotal: 16500.00,
    tax: 1485.00,
    total: 17985.00
  }
]

export async function POST(request: Request) {
  try {
    const { fileName } = await request.json()

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return a random invoice from the sample data
    const randomIndex = Math.floor(Math.random() * sampleInvoices.length)
    const invoice = sampleInvoices[randomIndex]

    // Modify the invoice number to include part of the filename
    const modifiedInvoice = {
      ...invoice,
      invoiceNumber: `${invoice.invoiceNumber}-${fileName.replace('.pdf', '').slice(-4)}`
    }

    return NextResponse.json(modifiedInvoice)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process invoice' },
      { status: 500 }
    )
  }
}