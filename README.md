# Invoice Intelligence Demo - Azure Document Intelligence

A modern web application demonstrating AI-powered invoice processing using Azure Document Intelligence. Built for showcasing document extraction capabilities to potential clients.

![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## 📋 Features

- **🔐 Secure Authentication** - Demo login system to showcase security
- **📄 Multi-PDF Upload** - Drag-and-drop or click to upload multiple invoices
- **🤖 AI Processing** - Simulated Azure Document Intelligence extraction
- **📊 Rich Data Display** - Beautiful visualization of extracted invoice data
- **🔄 Export Functionality** - Export processed data to JSON for system integration
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🏗️ Architecture

```
ADO_WebApp/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── invoice/       # Invoice processing endpoint
│   ├── auth/              # Authentication pages
│   │   └── login/         
│   ├── dashboard/         # Main application dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   └── ui/               
│       └── PDFUploader.tsx # Drag-and-drop PDF uploader
├── lib/                   # Utility functions (future use)
└── public/                # Static assets
```

## 🔧 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Document Processing**: Azure Document Intelligence (integration ready)

## 📝 Usage Flow

1. **Landing Page** - Users see the value proposition and features
2. **Authentication** - Simple login (accepts any credentials for demo)
3. **Dashboard** - Upload PDFs and view processed results
4. **Data Export** - Export extracted data for integration

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔌 Azure Document Intelligence Integration

The API endpoint at `/app/api/invoice/route.ts` currently returns hardcoded sample data. To integrate with Azure Document Intelligence:

1. Install Azure SDK:
```bash
npm install @azure/ai-form-recognizer
```

2. Update the API endpoint to use Azure Document Intelligence:
```typescript
// app/api/invoice/route.ts
import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

const client = new DocumentAnalysisClient(
  process.env.AZURE_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_KEY)
);
```

3. Add environment variables:
```env
AZURE_ENDPOINT=your-endpoint
AZURE_KEY=your-key
```

## 🎨 Customization

- **Branding**: Update colors in `tailwind.config.js`
- **Invoice Fields**: Modify the `InvoiceData` interface in `/app/dashboard/page.tsx`
- **Sample Data**: Edit hardcoded responses in `/app/api/invoice/route.ts`

## 📊 Sample Invoice Data Structure

```typescript
{
  invoiceNumber: string
  vendorName: string
  vendorAddress: string
  customerName: string
  customerAddress: string
  invoiceDate: string
  dueDate: string
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    amount: number
  }>
  subtotal: number
  tax: number
  total: number
}
```

## 🚦 Environment Variables

Create a `.env.local` file for configuration:

```env
# Azure Document Intelligence (when integrated)
AZURE_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_KEY=your-api-key

# Authentication (future enhancement)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 📄 License

This is a demo application for showcasing capabilities to potential clients.

## 🤝 Contributing

This is a demonstration project. For production implementations, please contact our AI consulting team.

---

Built with ❤️ by [Your AI Consulting Firm]