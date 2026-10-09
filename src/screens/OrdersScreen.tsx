import React, { useState, useMemo } from 'react';
import { Order, ScreenType } from '../types';
import { ASSET_URLS } from '../data/mockData';

interface OrdersScreenProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectException: () => void;
  onTriggerRefresh: () => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  onSelectOrder,
  onNavigate,
  onSelectException,
  onTriggerRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPill, setFilterPill] = useState<'all' | 'needs-attention' | 'in-production' | 'completed'>('all');
  const [syncTime, setSyncTime] = useState('2m ago');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        order.poNumber.toLowerCase().includes(q) ||
        order.title.toLowerCase().includes(q) ||
        order.stageDescription.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (filterPill === 'all') return true;
      if (filterPill === 'needs-attention') return order.status === 'overdue' || order.hasException;
      if (filterPill === 'in-production') return order.status === 'active';
      if (filterPill === 'completed') return order.status === 'completed';
      return true;
    });
  }, [orders, searchQuery, filterPill]);

  const handleRefresh = () => {
    setSyncTime('Just now');
    onTriggerRefresh();
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-4">
      {/* 1. Page Header with Live Feed Indicator */}
      <div className="flex flex-col space-y-1 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#b70100] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a5f68]">
              Live Supplier Feed
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#5a5f68] bg-[#e5e8f2] px-2 py-0.5 rounded-full font-semibold">
            Sync: {syncTime}
          </span>
        </div>
        <h1 className="text-[24px] font-bold text-[#181c23] tracking-tight">
          Purchase Orders
        </h1>
        <p className="text-[14px] text-[#5a5f68]">
          3 Active Orders • <span className="font-semibold text-[#181c23]">Precision Metals Ltd</span>
        </p>
      </div>

      {/* 2. Search Input Bar */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5a5f68]">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by PO#, Part Description, or Drawing..."
          className="w-full pl-10 pr-4 py-3 bg-white text-[#181c23] text-[14px] font-medium rounded-xl shadow-xs border border-[#dde1e6] placeholder:text-[#5a5f68] focus:outline-none focus:border-[#b70100] transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* 3. Streamlined Filter Pills Group */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setFilterPill('all')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold shrink-0 transition-all cursor-pointer ${
            filterPill === 'all'
              ? 'bg-[#181c23] text-white shadow-xs'
              : 'bg-white text-[#5a5f68] border border-[#dde1e6] hover:text-[#181c23]'
          }`}
        >
          <span>All</span>
          <span className="px-1.5 py-0.2 rounded font-mono text-[11px] bg-white/20">3</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterPill('needs-attention')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold shrink-0 transition-all cursor-pointer ${
            filterPill === 'needs-attention'
              ? 'bg-[#b70100] text-white shadow-xs'
              : 'bg-[#fee2e2]/70 text-[#ba1a1a] hover:bg-[#fee2e2] border border-[#fecaca]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">warning</span>
          <span>Needs Attention</span>
          <span className="px-1.5 py-0.2 rounded font-mono text-[11px] font-bold bg-white/30">1</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterPill('in-production')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold shrink-0 transition-all cursor-pointer ${
            filterPill === 'in-production'
              ? 'bg-[#195b9e] text-white shadow-xs'
              : 'bg-white text-[#5a5f68] border border-[#dde1e6] hover:text-[#181c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px] text-[#195b9e]">schedule</span>
          <span>In Production</span>
          <span className="px-1.5 py-0.2 rounded font-mono text-[11px] bg-slate-100">1</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterPill('completed')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-bold shrink-0 transition-all cursor-pointer ${
            filterPill === 'completed'
              ? 'bg-[#5a5f68] text-white shadow-xs'
              : 'bg-white text-[#5a5f68] border border-[#dde1e6] hover:text-[#181c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px] text-[#107c41]">check_circle</span>
          <span>Completed</span>
          <span className="px-1.5 py-0.2 rounded font-mono text-[11px] bg-slate-100">1</span>
        </button>
      </div>

      {/* 4. Orders List Cards with Accent Edges */}
      <div className="flex flex-col space-y-3.5">
        {filteredOrders.map((order) => {
          const isOverdue = order.status === 'overdue';
          const isCompleted = order.status === 'completed';

          return (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 shadow-xs flex flex-col space-y-3 relative overflow-hidden transition-all hover:shadow-md border border-[#dde1e6]"
            >
              {/* Vertical Color Indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  isOverdue
                    ? 'bg-[#ba1a1a]'
                    : isCompleted
                    ? 'bg-[#c2c6d1]'
                    : 'bg-[#195b9e]'
                }`}
              />

              {/* Top Row with Thumbnail, Code and Status */}
              <div className="flex items-start justify-between gap-2 pl-1">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <img
                    alt={order.title}
                    src={
                      order.id === 'po-5290'
                        ? ASSET_URLS.epoxyOrders
                        : order.id === 'po-9115'
                        ? ASSET_URLS.busbarOrders
                        : ASSET_URLS.enclosureOrders
                    }
                    className="w-14 h-14 rounded-lg object-cover border border-[#dde1e6] shrink-0 bg-slate-100"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[12px] font-bold text-[#181c23] tracking-wide bg-[#ebeef7] px-2 py-0.5 rounded">
                        {order.poNumber}
                      </span>
                      {isOverdue ? (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#fee2e2] text-[#93000a] font-bold flex items-center gap-1 uppercase tracking-wide">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          OVERDUE (17 DAYS)
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#e5e8f2] text-[#181c23] font-bold flex items-center gap-1 uppercase tracking-wide">
                          <span className="material-symbols-outlined text-[14px] text-[#195b9e]">check_circle</span>
                          COMPLETED
                        </span>
                      ) : (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#d4e3ff] text-[#001c39] font-bold flex items-center gap-1 uppercase tracking-wide">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          IN PRODUCTION
                        </span>
                      )}
                    </div>
                    <h2 className="text-[16px] text-[#181c23] mt-1.5 font-bold tracking-tight truncate">
                      {order.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Critical Alert Box (for PO-5290) */}
              {order.hasException && (
                <div className="bg-[#fff7f5] rounded-lg p-2.5 flex items-start gap-2 border border-[#fecaca]">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">
                    report_problem
                  </span>
                  <p className="text-[12px] text-[#5f3f3a] leading-snug">
                    <strong className="text-[#ba1a1a]">Exception #{order.exceptionRef}:</strong>{' '}
                    {order.exceptionDescription}
                  </p>
                </div>
              )}

              {/* Essential Operational Details Grid */}
              <div className="grid grid-cols-2 gap-2 bg-[#f1f3fd] rounded-lg p-2.5 text-[12px] border border-[#dde1e6]/60">
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#5a5f68] uppercase font-bold tracking-wider">
                    Quantity
                  </span>
                  <span className="text-[13px] text-[#181c23] font-bold">
                    {order.quantity}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#5a5f68] uppercase font-bold tracking-wider">
                    {isCompleted ? 'Delivered' : 'Delivery Due'}
                  </span>
                  <span
                    className={`text-[13px] font-bold ${
                      isOverdue ? 'text-[#ba1a1a]' : 'text-[#181c23]'
                    }`}
                  >
                    {order.deliveryDue} {order.deliveryDueSubtitle}
                  </span>
                </div>
              </div>

              {/* Milestone Progress */}
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between text-[#5a5f68]">
                  <div className="flex items-center gap-1 min-w-0">
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isOverdue
                          ? 'text-[#ba1a1a]'
                          : isCompleted
                          ? 'text-[#107c41]'
                          : 'text-[#195b9e]'
                      }`}
                    >
                      {isOverdue
                        ? 'precision_manufacturing'
                        : isCompleted
                        ? 'done_all'
                        : 'verified'}
                    </span>
                    <span className="text-[11px] text-[#181c23] truncate font-medium">
                      {order.stageDescription}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[12px] font-bold ${
                      isOverdue
                        ? 'text-[#ba1a1a]'
                        : isCompleted
                        ? 'text-[#5a5f68]'
                        : 'text-[#195b9e]'
                    }`}
                  >
                    {order.progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#ebeef7] rounded-full h-1.5 overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverdue
                        ? 'bg-[#ba1a1a]'
                        : isCompleted
                        ? 'bg-[#5a5f68]'
                        : 'bg-[#195b9e]'
                    }`}
                    style={{ width: `${order.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              {isOverdue ? (
                <button
                  type="button"
                  onClick={() => {
                    onSelectOrder(order);
                    onSelectException();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#b70100] hover:bg-[#930100] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Resolve Exception & Delay</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : isCompleted ? (
                <button
                  type="button"
                  onClick={() => onSelectOrder(order)}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#ebeef7] hover:bg-[#dfe2ec] text-[#181c23] text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Summary & Proofs</span>
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectOrder(order)}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#ebeef7] hover:bg-[#dfe2ec] text-[#181c23] text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details & Milestones</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              )}
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="p-8 text-center bg-white rounded-xl border border-[#dde1e6] space-y-2">
            <span className="material-symbols-outlined text-[28px] text-[#5a5f68]">
              inventory
            </span>
            <p className="text-xs font-semibold text-[#181c23]">No orders found matching filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterPill('all');
              }}
              className="text-xs text-[#b70100] font-bold underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* 5. Refresh & Status Summary */}
      <div className="flex items-center justify-between pt-2 px-1 text-[#5a5f68]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#107c41]">check</span>
          <span className="text-[12px] font-medium">
            Showing {filteredOrders.length} active purchase orders
          </span>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="flex items-center gap-1 text-[#b70100] hover:text-[#930100] text-[12px] font-bold transition-colors py-1 px-2 rounded cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">sync</span>
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
};
