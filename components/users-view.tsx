'use client'

import { Plus, Edit2, Trash2, Lock } from 'lucide-react'

export default function UsersView() {
  const users = [
    { id: 1, name: 'أحمد محمود', email: 'ahmad@example.com', role: 'مدير', status: 'نشط' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'محاسب', status: 'نشط' },
    { id: 3, name: 'محمود خالد', email: 'mahmoud@example.com', role: 'موظف', status: 'نشط' },
    { id: 4, name: 'سارة محمد', email: 'sarah@example.com', role: 'محاسب', status: 'غير نشط' },
    { id: 5, name: 'علي حسن', email: 'ali@example.com', role: 'موظف', status: 'نشط' },
  ]

  return (
    <main className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">إدارة المستخدمين</h1>
            <p className="text-muted-foreground">إضافة وتعديل وحذف المستخدمين</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity font-medium">
            <Plus size={16} />
            إضافة مستخدم
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 bg-secondary border-b border-border font-semibold text-sm text-foreground sticky top-0">
          <div>الاسم</div>
          <div>البريد الإلكتروني</div>
          <div>الدور</div>
          <div>الحالة</div>
          <div>الإجراءات</div>
        </div>

        <div className="divide-y divide-border">
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-5 gap-4 p-4 hover:bg-secondary/50 transition-colors items-center text-sm">
              <div className="font-medium text-foreground">{user.name}</div>
              <div className="text-muted-foreground">{user.email}</div>
              <div className="text-foreground">{user.role}</div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.status === 'نشط' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {user.status}
                </span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <button className="p-2 hover:bg-primary/10 rounded transition-colors">
                  <Edit2 size={16} className="text-primary" />
                </button>
                <button className="p-2 hover:bg-yellow-100 rounded transition-colors">
                  <Lock size={16} className="text-yellow-600" />
                </button>
                <button className="p-2 hover:bg-red-100 rounded transition-colors">
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
