import { TrendingUp, DollarSign, Users, FileText } from 'lucide-react'

export default function StatsCards() {
  const stats = [
    {
      label: 'إجمالي الإيرادات',
      value: '£800,500.00',
      change: '+14%',
      icon: DollarSign,
      color: 'bg-accent'
    },
    {
      label: 'المعاملات المتوقعة',
      value: '£284,500.00',
      change: '+8%',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      label: 'عدد المستخدمين',
      value: '2,345',
      change: '+12%',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      label: 'معدل النمو',
      value: '28%',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
            <p className="text-xs font-medium text-green-600">{stat.change} من الفترة السابقة</p>
          </div>
        )
      })}
    </div>
  )
}
