'use client'

import { BarChart3, Calendar } from 'lucide-react'

export default function ReportsView() {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">التقارير المالية</h1>
        <p className="text-muted-foreground">عرض وتحليل التقارير المالية الشاملة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-accent" />
            <h2 className="text-xl font-bold text-foreground">التقرير الشهري</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">إجمالي المبيعات</span>
              <span className="font-bold text-foreground">£45,250.00</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">المشتريات</span>
              <span className="font-bold text-foreground">£28,100.00</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">الأرباح الصافية</span>
              <span className="font-bold text-green-600">£17,150.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">نسبة الربح</span>
              <span className="font-bold text-green-600">37.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={24} className="text-accent" />
            <h2 className="text-xl font-bold text-foreground">الفترة الزمنية</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">من التاريخ</label>
              <input 
                type="date"
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">إلى التاريخ</label>
              <input 
                type="date"
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium mt-4">
              إنشاء التقرير
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
