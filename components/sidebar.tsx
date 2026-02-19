import { Home, BarChart3, Settings, Users, FileText, LogOut, User } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'لوحة المعلومات' },
    { id: 'reports', icon: <FileText size={20} />, label: 'التقارير المالية' },
    { id: 'settlement', icon: <FileText size={20} />, label: 'بيانات تسوية' },
    { id: 'report-log', icon: <BarChart3 size={20} />, label: 'سجل التقارير' },
    { id: 'profile', icon: <User size={20} />, label: 'الملف الشخصي' },
  ]

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      // In real app, would handle logout logic
      alert('تم تسجيل الخروج بنجاح')
      onTabChange('dashboard')
    }
  }

  const handleProfileClick = () => {
    // In real app, would navigate to profile page
    alert('جاري فتح الملف الشخصي...')
  }

  return (
    <aside className="w-64 bg-[#0F1729] dark:bg-black text-white sticky top-0 h-screen overflow-y-auto">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-end mb-8">
          <div className="w-8 h-8 border border-white rounded flex items-center justify-center">
            <div className="w-4 h-4 border border-white rounded"></div>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right ${
                activeTab === tab.id
                  ? 'bg-white text-black dark:bg-gray-800 dark:text-white'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-white/20 pt-4">
          <button
            onClick={() => onTabChange('profile')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right text-white hover:bg-white/10 mb-2"
          >
            <User size={20} />
            <span className="text-sm font-medium">الملف الشخصي</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-right text-white hover:bg-white/10"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
          
          <div className="flex items-center gap-3 px-4 py-3 mt-4 border-t border-white/20 pt-4">
            <User size={20} />
            <span className="text-sm font-medium">أحمد يحيى</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
