'use client'

import { useState } from 'react'
import { Calendar, Filter, RotateCcw } from 'lucide-react'

export default function FinancialReportsView() {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [message, setMessage] = useState('')
  const [custodyData, setCustodyData] = useState({ amount: 300500, reports: 38 })
  const [expensesData, setExpensesData] = useState({ amount: 284500, count: 142 })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setMessage('')
    
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update with new simulated data
      setCustodyData({
        amount: 300500 + Math.floor(Math.random() * 10000),
        reports: 38 + Math.floor(Math.random() * 5)
      })
      setExpensesData({
        amount: 284500 + Math.floor(Math.random() * 8000),
        count: 142 + Math.floor(Math.random() * 3)
      })
      
      setMessage('تم تحديث البيانات بنجاح')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('حدث خطأ أثناء التحديث')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleResetFilters = () => {
    setFromDate('')
    setToDate('')
    setCategory('all')
    setStatus('all')
    setMessage('تم إعادة تعيين الفلاتر')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleExportReport = () => {
    // Simulate report generation
    const reportData = {
      custodyData,
      expensesData,
      filters: { fromDate, toDate, category, status },
      generatedAt: new Date().toLocaleString('ar-SA')
    }
    
    // Create JSON file
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `financial_report_${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setMessage('تم تصدير التقرير بنجاح')
    setTimeout(() => setMessage(''), 3000)
  }

  const handlePrintReport = () => {
    window.print()
    setMessage('جاري تجهيز التقرير للطباعة...')
    setTimeout(() => setMessage('تم تجهيز التقرير للطباعة'), 1000)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? 'جاري التحديث...' : 'تحديث البيانات'}
          </button>
          <button 
            onClick={handleExportReport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            تصدير التقرير
          </button>
          <button 
            onClick={handlePrintReport}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            طباعة
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">تحليل التقارير المالية</h1>
          <p className="text-gray-600 dark:text-gray-400">نظرة عامة على التقارير</p>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-3 rounded-lg text-sm ${
          message.includes('نجاح') ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 
          message.includes('خطأ') ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' : 
          'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
        }`}>
          {message}
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* From Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">من تاريخ</label>
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="اختر تاريخا"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            </div>
          </div>

          {/* To Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">إلى تاريخ</label>
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="اختر تاريخا"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">التصنيف</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">جميع التصنيفات</option>
              <option value="subscriptions">اشتراكات</option>
              <option value="expenses">مصروفات</option>
              <option value="revenue">إيرادات</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">جميع الحالات</option>
              <option value="approved">معتمد</option>
              <option value="pending">معلق</option>
              <option value="rejected">مرفوض</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button 
            onClick={handleResetFilters}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <RotateCcw size={16} />
            <span>إعادة ضبط الفلاتر</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Custody Data Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">بيانات العهدة</h3>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">£{custodyData.amount.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي المبلغ</div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">{custodyData.reports}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي تقارير العهدة</div>
          </div>
        </div>

        {/* Expenses Summary Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">لخص المصروفات</h3>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">£{expensesData.amount.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي المصروفات</div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">{expensesData.count}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">عدد المصروفات</div>
          </div>
        </div>
      </div>
    </div>
  )
}
