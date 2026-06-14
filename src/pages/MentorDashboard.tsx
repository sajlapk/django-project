import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  Calendar, 
  Tag, 
  FileText, 
  Download, 
  Dumbbell, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  PieChart, 
  Percent, 
  Trash2,
  Users,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  source: string;
  description: string;
  date: string;
}

interface Gym {
  id: string;
  name: string;
  location: string;
  budget: number;
}

const MentorDashboard = () => {
  // Gym Selector (3 gyms initially as requested)
  const gyms: Gym[] = [
    { id: '1', name: 'Discipl Premium Calicut', location: 'Calicut, Kerala', budget: 500000 },
    { id: '2', name: 'Discipl Fitness Club Cochin', location: 'Kochi, Kerala', budget: 850000 },
    { id: '3', name: 'Discipl Iron Gym Trivandrum', location: 'Trivandrum, Kerala', budget: 420000 },
  ];

  const [selectedGym, setSelectedGym] = useState<Gym>(gyms[0]);

  // Initial rich mock data
  const initialTransactions: Transaction[] = [
    { id: 't1', type: 'income', amount: 45000, category: 'Membership Fee', source: 'Razorpay / Web', description: 'Monthly subscription renewals (30 members)', date: '2026-06-14' },
    { id: 't2', type: 'income', amount: 12000, category: 'Personal Training', source: 'Direct Deposit', description: 'Coach John - 10 session pack for Rahul', date: '2026-06-13' },
    { id: 't3', type: 'expense', amount: 25000, category: 'Rent', source: 'Bank Transfer', description: 'June facility rent payment', date: '2026-06-05' },
    { id: 't4', type: 'expense', amount: 15000, category: 'Salaries', source: 'UPI', description: 'Trainer John - part time salary', date: '2026-06-10' },
    { id: 't5', type: 'expense', amount: 4500, category: 'Utilities', source: 'Auto-debit KSEB', description: 'Electricity bill for May', date: '2026-06-08' },
    { id: 't6', type: 'income', amount: 8500, category: 'Merchandise', source: 'Store Cash', description: 'Sold 5 whey protein tubs & shakers', date: '2026-06-12' },
    { id: 't7', type: 'expense', amount: 9800, category: 'Equipment Maintenance', source: 'Bank Transfer', description: 'Treadmill belt replacement & cable lubrication', date: '2026-06-11' },
  ];

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // Form State
  const [txType, setTxType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Notification state
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-calculate summary statistics
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpense;
  const budgetUtilization = ((totalExpense / selectedGym.budget) * 100).toFixed(1);

  // Show a banner notification helper
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Add transaction
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || !category) {
      alert("Please fill in a valid amount and category");
      return;
    }

    const newTx: Transaction = {
      id: `t_${Date.now()}`,
      type: txType,
      amount: parseFloat(amount),
      category: category,
      source: source || 'General',
      description: description || 'No description',
      date: date
    };

    setTransactions([newTx, ...transactions]);
    triggerNotification(`Successfully added ${txType} of ₹${parseFloat(amount).toLocaleString()}`);
    
    // Reset inputs
    setAmount('');
    setCategory('');
    setSource('');
    setDescription('');
  };

  // Delete transaction
  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction record?")) {
      const deleted = transactions.find(t => t.id === id);
      setTransactions(transactions.filter(t => t.id !== id));
      if (deleted) {
        triggerNotification(`Deleted transaction: ${deleted.category}`);
      }
    }
  };

  // Export CSV Report
  const handleExportCSV = () => {
    const headers = ['ID', 'Type', 'Amount (INR)', 'Category', 'Source', 'Description', 'Date'];
    const rows = transactions.map(t => [
      t.id,
      t.type.toUpperCase(),
      t.amount,
      t.category,
      t.source,
      t.description,
      t.date
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Discipl_ERP_Report_${selectedGym.name.replace(/\s+/g, '_')}_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("Report exported successfully!");
  };

  // Dynamic colors for category tags
  const getCategoryColor = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('membership')) return 'bg-blue-50 text-blue-600 border-blue-100';
    if (c.includes('rent')) return 'bg-purple-50 text-purple-600 border-purple-100';
    if (c.includes('salary') || c.includes('salaries')) return 'bg-amber-50 text-amber-600 border-amber-100';
    if (c.includes('electric') || c.includes('utilit')) return 'bg-cyan-50 text-cyan-600 border-cyan-100';
    if (c.includes('maintenance')) return 'bg-rose-50 text-rose-600 border-rose-100';
    return 'bg-gray-50 text-gray-600 border-gray-100';
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 pt-20">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-gray-800 animate-slide-in">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Premium Header */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white py-12 px-6 shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-500 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded text-white">ERP PORTAL</span>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-gray-400 text-sm font-medium">Mentor Control Suite</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Financial & Gym Analytics</h1>
            <p className="text-gray-400 text-sm mt-1">Manage multiple branches, log revenue channels, track expense logs, and review budgets.</p>
          </div>

          {/* Gym Selector Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1.5 w-full sm:w-80">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Active Branch Switcher</label>
            <select 
              value={selectedGym.id} 
              onChange={(e) => {
                const gym = gyms.find(g => g.id === e.target.value);
                if (gym) setSelectedGym(gym);
              }}
              className="bg-gray-900 text-white rounded-lg px-3 py-2 text-sm font-semibold border border-gray-700 focus:outline-none focus:border-red-500"
            >
              {gyms.map(gym => (
                <option key={gym.id} value={gym.id}>{gym.name}</option>
              ))}
            </select>
            <span className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400" /> {selectedGym.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Income */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-2xl font-bold text-black mt-2">₹{totalIncome.toLocaleString()}</h3>
              <span className="text-xs text-green-600 flex items-center gap-1 mt-1 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% from last month
              </span>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Expenses</p>
              <h3 className="text-2xl font-bold text-black mt-2">₹{totalExpense.toLocaleString()}</h3>
              <span className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                <ArrowDownRight className="w-3.5 h-3.5" /> +4.8% maintenance audit
              </span>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl text-rose-600">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>

          {/* Net Profit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Savings</p>
              <h3 className="text-2xl font-bold text-black mt-2">₹{netSavings.toLocaleString()}</h3>
              <span className="text-xs text-blue-600 flex items-center gap-1 mt-1 font-medium">
                <Percent className="w-3.5 h-3.5" /> Profit margin is steady
              </span>
            </div>
            <div className={`p-4 rounded-xl ${netSavings >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
              <Wallet className="w-6 h-6" />
            </div>
          </div>

          {/* Budget Limit progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Budget Pool Limit</p>
                <h3 className="text-lg font-bold text-black mt-1">₹{selectedGym.budget.toLocaleString()}</h3>
              </div>
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {budgetUtilization}% used
              </span>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    parseFloat(budgetUtilization) > 85 ? 'bg-red-500' : parseFloat(budgetUtilization) > 50 ? 'bg-amber-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(parseFloat(budgetUtilization), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Transaction Section (Left Panel) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold text-black">Log Transaction</h2>
              </div>

              {/* Income vs Expense selector tabs */}
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1.5 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setTxType('income')}
                  className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                    txType === 'income' 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Add Income
                </button>
                <button
                  type="button"
                  onClick={() => setTxType('expense')}
                  className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                    txType === 'expense' 
                      ? 'bg-white text-rose-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Add Expense
                </button>
              </div>

              <form onSubmit={handleAddTransaction} className="space-y-4">
                
                {/* Amount input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm font-bold text-gray-800"
                      required
                    />
                  </div>
                </div>

                {/* Category (Source/Destination) dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm"
                    required
                  >
                    <option value="">Select Category...</option>
                    {txType === 'income' ? (
                      <>
                        <option value="Membership Fee">Membership Fee</option>
                        <option value="Personal Training">Personal Training</option>
                        <option value="Merchandise">Merchandise & Supplements</option>
                        <option value="Guest Pass">Guest Pass / Walk-in</option>
                        <option value="Other Revenue">Other Revenue</option>
                      </>
                    ) : (
                      <>
                        <option value="Rent">Gym Rent</option>
                        <option value="Salaries">Trainer & Staff Salary</option>
                        <option value="Utilities">Electricity & Utilities</option>
                        <option value="Equipment Maintenance">Equipment Maintenance</option>
                        <option value="Marketing">Marketing / Advertising</option>
                        <option value="Other Expense">Other Expense</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Source/Method input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Payment Source / Method</label>
                  <input
                    type="text"
                    placeholder="e.g. Razorpay, Cash, Bank Transfer"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm"
                  />
                </div>

                {/* Date input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Transaction Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Remarks / Description</label>
                  <textarea
                    placeholder="Write details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-white font-semibold transition-colors shadow-sm flex items-center justify-center gap-1.5 ${
                    txType === 'income' 
                      ? 'bg-emerald-500 hover:bg-emerald-600' 
                      : 'bg-rose-500 hover:bg-rose-600'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Save {txType === 'income' ? 'Income' : 'Expense'}
                </button>

              </form>
            </div>
          </div>

          {/* Ledger History & Live Ledger (Right Panel) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              
              {/* Header and download report action */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100 pb-5 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-black">Transaction Ledger</h2>
                  <p className="text-xs text-gray-500">Live ledger of payments and costs for {selectedGym.name}.</p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center justify-center gap-1.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors px-4 py-2 rounded-xl text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Expense Report (CSV)
                </button>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {transactions.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-sm">No transaction records logged.</p>
                  </div>
                ) : (
                  transactions.map((t) => (
                    <div 
                      key={t.id} 
                      className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Left Block: Icon + Details */}
                      <div className="flex items-start gap-3.5">
                        <div className={`p-2.5 rounded-lg flex-shrink-0 mt-0.5 ${
                          t.type === 'income' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-rose-50 text-rose-600'
                        }`}>
                          {t.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-gray-900 text-sm">{t.description}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(t.category)}`}>
                              {t.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-300" />
                              {t.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Tag className="w-3.5 h-3.5 text-gray-300" />
                              via {t.source}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Amount + Delete Action */}
                      <div className="flex items-center gap-4">
                        <span className={`font-extrabold text-sm ${
                          t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {t.type === 'income' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteTransaction(t.id)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-gray-100 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default MentorDashboard;
