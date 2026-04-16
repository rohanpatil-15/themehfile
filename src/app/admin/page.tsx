"use client";

import useSWR from "swr";
import { useEffect, useState, useRef } from "react";
import { Copy, MapPin, Phone, BellRing, RefreshCw } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: "New" | "Preparing" | "Completed";
  paymentStatus: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminDashboard() {
  const { data, error, mutate } = useSWR("/api/orders", fetcher, { refreshInterval: 4000 });
  const [orders, setOrders] = useState<Order[]>([]);
  const previousOrderCount = useRef(0);

  useEffect(() => {
    if (data?.success) {
      const newOrdersList = data.orders;
      
      // Ping sound logic
      if (previousOrderCount.current > 0 && newOrdersList.length > previousOrderCount.current) {
        // Try to play a simple audio ping
        try {
          const audio = new Audio("https://cdn.freesound.org/previews/415/415510_7918519-lq.mp3");
          audio.play();
        } catch (e) {
          console.error("Audio playback failed", e);
        }
      }

      previousOrderCount.current = newOrdersList.length;
      setOrders(newOrdersList);
    }
  }, [data]);

  const changeStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      if (res.ok) {
        mutate(); // trigger immediate refresh
      }
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    }
  };

  if (error) return <div className="text-white p-10">Failed to load orders.</div>;
  if (!data) return <div className="text-white p-10 flex items-center gap-2"><RefreshCw className="animate-spin" /> Loading Live Dashboard...</div>;

  const todayStr = new Date().toDateString();
  const todaysOrders = orders.filter(o => new Date(o.createdAt).toDateString() === todayStr);
  const totalRevenue = todaysOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const getStatusColor = (status: string) => {
    if (status === "New") return "bg-red-500/20 text-red-500 border-red-500/30";
    if (status === "Preparing") return "bg-brand-gold/20 text-brand-gold border-brand-gold/30";
    return "bg-green-500/20 text-green-500 border-green-500/30";
  };

  const getWhatsAppLink = (order: Order) => {
    const text = encodeURIComponent(`Hello ${order.customerName},\nYour order is currently: *${order.orderStatus}*.\nThank you for ordering with Mehfil The Cafe!`);
    return `https://wa.me/${order.customerPhone.replace(/[^4-9]/g, '')}?text=${text}`; // simple strip logic
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-serif text-brand-gold flex items-center gap-3">
             Mehfil Admin
             {/* Live Pulser */}
             <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
             </span>
          </h1>
          <p className="text-gray-400 mt-1">Live Order Managing System</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
           <h3 className="text-gray-400 text-sm">Today's Orders</h3>
           <p className="text-4xl font-bold font-serif text-white mt-1">{todaysOrders.length}</p>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
           <h3 className="text-gray-400 text-sm">Today's Revenue</h3>
           <p className="text-4xl font-bold font-serif text-brand-gold mt-1">₹{totalRevenue}</p>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
           <h3 className="text-gray-400 text-sm">Active Pending</h3>
           <p className="text-4xl font-bold font-serif text-white mt-1">{orders.filter(o => o.orderStatus !== "Completed").length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BellRing size={20} /> Recent Orders</h2>
      <div className="bg-[#111] rounded-xl overflow-x-auto border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
              <th className="p-4">Customer</th>
              <th className="p-4">Contact & Delivery</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => (
              <tr key={o._id} className="hover:bg-white/[0.02] transition-colors">
                 <td className="p-4 align-top">
                    <div className="font-bold">{o.customerName}</div>
                    <div className="text-xs text-brand-gold">ID: {o._id.slice(-6).toUpperCase()}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(o.createdAt).toLocaleTimeString()}</div>
                 </td>
                 <td className="p-4 align-top max-w-[200px]">
                    <div className="flex items-center gap-1 text-sm"><Phone size={12} className="text-gray-400" /> {o.customerPhone}</div>
                    <div className="flex items-start gap-1 text-sm mt-1 text-gray-400"><MapPin size={12} className="mt-1 shrink-0" /> {o.address}</div>
                 </td>
                 <td className="p-4 align-top">
                    <ul className="text-sm list-disc pl-4 text-gray-300">
                      {o.items.map((item, idx) => (
                         <li key={idx}><span className="text-brand-gold font-bold">{item.quantity}x</span> {item.name}</li>
                      ))}
                    </ul>
                 </td>
                 <td className="p-4 align-top font-bold text-white">
                    ₹{o.totalAmount}
                 </td>
                 <td className="p-4 align-top">
                    <select 
                      value={o.orderStatus} 
                      onChange={(e) => changeStatus(o._id, e.target.value)}
                      className={`px-3 py-1 text-xs font-bold rounded-full border bg-transparent focus:outline-none cursor-pointer ${getStatusColor(o.orderStatus)}`}
                    >
                       <option value="New" className="bg-[#111] text-red-500">New</option>
                       <option value="Preparing" className="bg-[#111] text-brand-gold">Preparing</option>
                       <option value="Completed" className="bg-[#111] text-green-500">Completed</option>
                    </select>
                 </td>
                 <td className="p-4 align-top">
                    <a 
                      href={getWhatsAppLink(o)}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366]/20 text-[#25D366] text-xs font-bold rounded-lg border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-colors block text-center"
                    >
                      WhatsApp
                    </a>
                 </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500 italic">No orders found. Sit tight!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
