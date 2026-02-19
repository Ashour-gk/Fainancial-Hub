'use client'

import { Filter, Plus } from 'lucide-react'
import StatsCards from './stats-cards'
import DataGrid from './data-grid'

interface DashboardViewProps {
  onAddClick: () => void
}

export default function DashboardView({ onAddClick }: DashboardViewProps) {
  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">حسابات المخزن المالية</h1>
        <p className="text-muted-foreground">إدارة ومراقبة جميع معاملات المخزن</p>
      </div>

      <StatsCards />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">سجل المعاملات</h2>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-medium">
              <Filter size={16} />
              تصفية
            </button>
            <button 
              onClick={onAddClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <Plus size={16} />
              إضافة معاملة
            </button>
          </div>
        </div>

        <DataGrid />
      </div>
    </main>
  )
}
