'use client'

import { useState, useRef } from 'react'
import { FileSpreadsheet, Plus, Search, Filter } from 'lucide-react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import '@/lib/ag-grid-setup' // Register AG Grid modules

interface ReportRecord {
  id: number
  lastOperationDate: string
  category: string
  totalAmount: string
  status: 'approved' | 'rejected' | 'completed' | 'draft' | 'deleted'
}

export default function ReportLogView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isExporting, setIsExporting] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [message, setMessage] = useState('')
  const [reports, setReports] = useState<ReportRecord[]>([
    { id: 1, lastOperationDate: '2024/01/15', category: 'اشتراكات', totalAmount: '£1,200.00', status: 'approved' },
    { id: 2, lastOperationDate: '2024/01/14', category: 'مصروفات تشغيل', totalAmount: '£850.50', status: 'rejected' },
    { id: 3, lastOperationDate: '2024/01/13', category: 'رواتب', totalAmount: '£5,000.00', status: 'completed' },
    { id: 4, lastOperationDate: '2024/01/12', category: 'صيانة', totalAmount: '£320.00', status: 'draft' },
    { id: 5, lastOperationDate: '2024/01/11', category: 'اشتراكات', totalAmount: '£450.00', status: 'deleted' },
    { id: 6, lastOperationDate: '2024/01/10', category: 'مصروفات تشغيل', totalAmount: '£1,100.00', status: 'approved' },
    { id: 7, lastOperationDate: '2024/01/09', category: 'رواتب', totalAmount: '£3,200.00', status: 'completed' },
    { id: 8, lastOperationDate: '2024/01/08', category: 'صيانة', totalAmount: '£680.00', status: 'approved' },
  ])
  const gridRef = useRef<AgGridReact>(null)

  const handleExport = async () => {
    setIsExporting(true)
    setMessage('')
    
    try {
      // Create CSV content
      const headers = ['تاريخ آخر عملية', 'الفئة', 'إجمالي المبلغ', 'الحالة']
      const csvContent = [
        headers.join(','),
        ...filteredReports.map(report => 
          [report.lastOperationDate, report.category, report.totalAmount, getStatusText(report.status)].join(',')
        )
      ].join('\n')
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `reports_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setMessage('تم تصدير التقارير بنجاح')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('حدث خطأ أثناء التصدير')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCreateReport = async () => {
    setIsCreating(true)
    setMessage('')
    
    try {
      // Simulate report creation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Add new report to the list
      const newReport: ReportRecord = {
        id: Math.max(...reports.map(r => r.id), 0) + 1,
        lastOperationDate: new Date().toISOString().split('T')[0],
        category: 'جديد',
        totalAmount: '£0.00',
        status: 'draft'
      }
      
      setReports([newReport, ...reports])
      setMessage('تم إنشاء تقرير جديد بنجاح')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('حدث خطأ أثناء إنشاء التقرير')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setIsCreating(false)
    }
  }

  const getStatusColor = (status: ReportRecord['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'deleted':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: ReportRecord['status']) => {
    switch (status) {
      case 'approved':
        return 'معتمد'
      case 'rejected':
        return 'مرفوض'
      case 'completed':
        return 'مكتمل'
      case 'draft':
        return 'مسودة'
      case 'deleted':
        return 'محذوف'
      default:
        return status
    }
  }

  const handleViewReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId)
    setMessage(`عرض التقرير رقم ${reportId}: ${report?.category} - ${report?.totalAmount}`)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleEditReport = (reportId: number) => {
    setMessage(`تعديل التقرير رقم ${reportId}`)
    setTimeout(() => setMessage(''), 3000)
    // In real app, would open edit modal or navigate to edit page
  }

  const handleDeleteReport = (reportId: number) => {
    if (confirm(`هل أنت متأكد من حذف التقرير رقم ${reportId}؟`)) {
      setReports(reports.filter(report => report.id !== reportId))
      setMessage(`تم حذف التقرير رقم ${reportId} بنجاح`)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleRefreshReports = async () => {
    setMessage('جاري تحديث التقارير...')
    setTimeout(() => {
      setMessage('تم تحديث التقارير بنجاح')
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.totalAmount.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // AgGrid Column Definitions
  const [colDefs] = useState([
    {
      headerName: 'تاريخ آخر عملية',
      field: 'lastOperationDate',
      sortable: true,
      filter: true,
      width: 150
    },
    {
      headerName: 'الفئة',
      field: 'category',
      sortable: true,
      filter: true,
      width: 150
    },
    {
      headerName: 'إجمالي المبلغ',
      field: 'totalAmount',
      sortable: true,
      filter: true,
      width: 120
    },
    {
      headerName: 'الحالة',
      field: 'status',
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const statusColors: Record<string, string> = {
          approved: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
          completed: 'bg-blue-100 text-blue-800',
          draft: 'bg-gray-100 text-gray-800',
          deleted: 'bg-orange-100 text-orange-800'
        }
        
        const statusTexts: Record<string, string> = {
          approved: 'معتمد',
          rejected: 'مرفوض',
          completed: 'مكتمل',
          draft: 'مسودة',
          deleted: 'محذوف'
        }
        
        const status = params.value as keyof typeof statusColors
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusTexts[status]}
          </span>
        )
      },
      width: 120
    },
    {
      headerName: 'الإجراءات',
      field: 'actions',
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => handleViewReport(params.data.id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            عرض
          </button>
          <button 
            onClick={() => handleEditReport(params.data.id)}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            تعديل
          </button>
          <button 
            onClick={() => handleDeleteReport(params.data.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            حذف
          </button>
        </div>
      ),
      width: 200
    }
  ])

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    headerClass: 'ag-header-cell-label'
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet size={18} />
            <span>{isExporting ? 'جاري التصدير...' : 'تصدير بصيغة إكسل'}</span>
          </button>
          <button 
            onClick={handleCreateReport}
            disabled={isCreating}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            <span>{isCreating ? 'جاري الإنشاء...' : 'إنشاء تقرير'}</span>
          </button>
          <button 
            onClick={handleRefreshReports}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Filter size={18} />
            <span>تحديث</span>
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">سجل التقارير المالية</h1>
          <p className="text-gray-600">عرض وإدارة جميع التقارير المالية</p>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-3 rounded-lg text-sm ${
          message.includes('نجاح') ? 'bg-green-100 text-green-800' : 
          message.includes('خطأ') ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {message}
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث في التقارير..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right appearance-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="approved">معتمد</option>
              <option value="rejected">مرفوض</option>
              <option value="completed">مكتمل</option>
              <option value="draft">مسودة</option>
              <option value="deleted">محذوف</option>
            </select>
          </div>
        </div>
      </div>

      {/* AgGrid Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%', direction: 'rtl' }}>
          <AgGridReact
            ref={gridRef}
            rowData={filteredReports}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            domLayout='autoHeight'
            enableRtl={true}
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={10}
            theme="legacy"
          />
        </div>
        
        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <FileSpreadsheet size={48} className="mx-auto" />
            </div>
            <p className="text-gray-600">لا توجد تقارير مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  )
}
