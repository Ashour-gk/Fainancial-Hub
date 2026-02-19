'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import DashboardView from '@/components/dashboard-view'
import FinancialReportsView from '@/components/financial-reports-view'
import SettlementView from '@/components/settlement-view'
import ReportLogView from '@/components/report-log-view'
import UsersView from '@/components/users-view'
import DocumentsView from '@/components/documents-view'
import SettingsView from '@/components/settings-view'
import Modal from '@/components/modal'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardView onAddClick={() => setIsModalOpen(true)} />
      case 'reports':
        return <FinancialReportsView />
      case 'settlement':
        return <SettlementView />
      case 'report-log':
        return <ReportLogView />
      case 'profile':
        return <UsersView />
      case 'users':
        return <UsersView />
      case 'documents':
        return <DocumentsView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView onAddClick={() => setIsModalOpen(true)} />
    }
  }

  return (
    <div className="flex h-screen bg-background dark:bg-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-auto flex flex-col">
        <Header />
        {renderContent()}
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
