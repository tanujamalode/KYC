import React, { useState, useMemo } from 'react';
import { Order, ScreenType } from '../types';
import { ASSET_URLS } from '../data/mockData';

interface HomeDashboardScreenProps {
  orders: Order[];
  onNavigate: (screen: ScreenType) => void;
  onSelectOrder: (order: Order) => void;
  onOpenUploadProof: () => void;
  onOpenReportDelay: () => void;
  onSelectException: () => void;
}

export const HomeDashboardScreen: React.FC<HomeDashboardScreenProps> = ({
  orders,
  onNavigate,
  onSelectOrder,
  onOpenUploadProof,
  onOpenReportDelay,
  onSelectException,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'overdue'>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.title.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'active') return order.status === 'active';
      if (activeFilter === 'overdue') return order.status === 'overdue';
      return true;
    });
  }, [orders, searchQuery, activeFilter]);

  return (
    <div className="flex flex-col w-full pb-24 space-y-4">
      {/* 1. Streamlined Vendor Header */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#dde1e6]">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#195b9e] shrink-0" />
              <h2 className="text-[17px] font-bold text-[#181c23] truncate">
                Precision Metals Ltd{' '}
                <span className="font-mono text-[12px] text-[#5a5f68] font-normal">
                  (V-44910)
                </span>
              </h2>
            </div>
            <p className="text-[14px] text-[#5a5f68] mt-1 pl-4.5 font-medium">
              Rajesh Sharma • Plant 04 Vadodara
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#ebeef7] flex items-center justify-center shrink-0 text-[#5a5f68]">
            <span className="material-symbols-outlined text-[24px]">factory</span>
          </div>
        </div>
      </div>

      {/* 2. High-Contrast Needs Attention Alert Banner */}
      <div className="bg-[#fff7f5] border border-[#ffdad6] rounded-xl p-4 flex flex-col gap-3 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[24px] shrink-0 mt-0.5">
              warning
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#b70100] font-bold uppercase tracking-wider">
                  Needs Attention
                </span>
                <span className="font-mono text-[12px] font-bold text-[#b70100] bg-red-100/60 px-1.5 py-0.2 rounded">
                  PO-5290
                </span>
              </div>
              <p className="text-[14px] text-[#181c23] font-medium mt-1 leading-snug">
                Shortage: Ceramic core shipment delayed (Overdue 25 Sep)
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onSelectException}
          className="h-12 w-full px-4 rounded-xl bg-[#b70100] hover:bg-[#930100] active:scale-[0.99] text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <span>Review Issue & Exception</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* 3. Streamlined 3-Metric KPI Row */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onNavigate('orders')}
          className="bg-white rounded-xl p-3 shadow-xs border border-[#dde1e6] flex flex-col justify-between text-left active:scale-95 transition-transform cursor-pointer hover:border-gray-400"
        >
          <span className="text-[11px] font-semibold text-[#5a5f68] uppercase tracking-wide truncate">
            Active
          </span>
          <div className="text-[24px] font-bold text-[#181c23] leading-none my-1 font-mono">
            3
          </div>
          <span className="text-[12px] text-[#195b9e] font-semibold">In Factory</span>
        </button>

        <button
          onClick={() => onNavigate('proof-and-docs')}
          className="bg-white rounded-xl p-3 shadow-xs border border-[#dde1e6] flex flex-col justify-between text-left active:scale-95 transition-transform cursor-pointer hover:border-gray-400"
        >
          <span className="text-[11px] font-semibold text-[#5a5f68] uppercase tracking-wide truncate">
            Signoffs
          </span>
          <div className="text-[24px] font-bold text-[#195b9e] leading-none my-1 font-mono">
            2
          </div>
          <span className="text-[12px] text-[#5a5f68] font-semibold">Awaiting MTC</span>
        </button>

        <div className="bg-white rounded-xl p-3 shadow-xs border border-[#dde1e6] flex flex-col justify-between text-left">
          <span className="text-[11px] font-semibold text-[#5a5f68] uppercase tracking-wide truncate">
            Completed
          </span>
          <div className="text-[24px] font-bold text-[#181c23] leading-none my-1 font-mono">
            18
          </div>
          <span className="text-[12px] text-[#107c41] font-semibold">98.4% On-Time</span>
        </div>
      </div>

      {/* 4. High-Touch Accessibility Quick Action Buttons (Min 48px height) */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onOpenUploadProof}
          className="h-12 px-3 rounded-xl bg-white border border-[#dde1e6] hover:bg-[#f1f3fd] text-[#181c23] text-[13px] font-bold shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-[#195b9e]">
            upload_file
          </span>
          <span>Upload MTC Proof</span>
        </button>

        <button
          type="button"
          onClick={onOpenReportDelay}
          className="h-12 px-3 rounded-xl bg-white border border-[#fee2e2] text-[#ba1a1a] hover:bg-[#fff7f5] text-[13px] font-bold shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">
            report_problem
          </span>
          <span>Report Floor Delay</span>
        </button>
      </div>

      {/* 5. Assigned Purchase Orders Section */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#181c23]">Assigned Orders</h3>
          <span className="text-[12px] font-semibold text-[#5a5f68]">
            {filteredOrders.length} of {orders.length} total
          </span>
        </div>

        {/* Simplified Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a5f68] text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PO number or part name..."
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-white border border-[#dde1e6] text-[#181c23] placeholder:text-[#5a5f68] text-[14px] focus:outline-none focus:border-[#b70100] shadow-xs transition-all font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a5f68] hover:text-[#181c23] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`shrink-0 h-10 px-4 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#181c23] text-white shadow-xs'
                : 'bg-white border border-[#dde1e6] text-[#5a5f68] hover:text-[#181c23]'
            }`}
          >
            All (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('active')}
            className={`shrink-0 h-10 px-4 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeFilter === 'active'
                ? 'bg-[#181c23] text-white shadow-xs'
                : 'bg-white border border-[#dde1e6] text-[#5a5f68] hover:text-[#181c23]'
            }`}
          >
            Active (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('overdue')}
            className={`shrink-0 h-10 px-4 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeFilter === 'overdue'
                ? 'bg-[#181c23] text-white shadow-xs'
                : 'bg-white border border-[#dde1e6] text-[#5a5f68] hover:text-[#181c23]'
            }`}
          >
            Overdue (1)
          </button>
        </div>

        {/* Order Cards Container */}
        <div className="flex flex-col gap-3 mt-1">
          {filteredOrders.map((order) => {
            const isOverdue = order.status === 'overdue';
            const isCompleted = order.status === 'completed';

            return (
              <article
                key={order.id}
                className={`bg-white rounded-xl p-4 shadow-xs flex flex-col gap-3 transition-all ${
                  isOverdue
                    ? 'border-2 border-[#ba1a1a]/40 bg-[#fffdfd]'
                    : isCompleted
                    ? 'border border-[#dde1e6] opacity-95'
                    : 'border border-[#dde1e6]'
                }`}
              >
                {/* Card Top Lockup */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <img
                      src={order.imageUrl}
                      alt={order.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#dde1e6] bg-slate-100"
                    />
                    <div className="min-w-0 flex-1">
                      <span
                        className={`font-mono text-[14px] font-bold ${
                          isOverdue
                            ? 'text-[#ba1a1a]'
                            : isCompleted
                            ? 'text-[#5a5f68]'
                            : 'text-[#195b9e]'
                        }`}
                      >
                        {order.poNumber}
                      </span>
                      <h4 className="text-[16px] text-[#181c23] font-bold mt-0.5 leading-snug truncate">
                        {order.title}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 ${
                      isOverdue
                        ? 'bg-[#fee2e2] text-[#93000a]'
                        : isCompleted
                        ? 'bg-[#e5e8f2] text-[#181c23]'
                        : 'bg-[#d4e3ff] text-[#001c39]'
                    }`}
                  >
                    {isOverdue ? 'Overdue' : isCompleted ? 'Completed' : 'Active'}
                  </span>
                </div>

                {/* Specs Row */}
                <div className="grid grid-cols-2 gap-2 py-1.5 border-t border-b border-[#dde1e6] text-[13px] text-[#5a5f68]">
                  <div>
                    Qty: <strong className="text-[#181c23] font-bold">{order.quantity}</strong>
                  </div>
                  <div className={isOverdue ? 'text-[#ba1a1a] font-bold' : ''}>
                    {isCompleted ? 'Dispatched: ' : 'Due: '}
                    <strong className={isOverdue ? 'font-bold' : 'text-[#181c23] font-semibold'}>
                      {order.deliveryDue}
                    </strong>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[#5a5f68] font-medium">
                      {order.stageDescription}
                    </span>
                    <span
                      className={`font-mono font-bold ${
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
                  <div className="w-full h-2 rounded-full bg-[#ebeef7] overflow-hidden">
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

                {/* Action CTA */}
                {isOverdue ? (
                  <button
                    onClick={() => {
                      onSelectOrder(order);
                      onSelectException();
                    }}
                    className="h-12 w-full mt-1 rounded-xl bg-[#b70100] hover:bg-[#930100] text-white text-[13px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Update Stage & Exception</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                ) : isCompleted ? (
                  <button
                    onClick={() => onSelectOrder(order)}
                    className="h-12 w-full mt-1 rounded-xl bg-[#ebeef7] hover:bg-[#dfe2ec] text-[#5a5f68] hover:text-[#181c23] text-[13px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>View Archive Slip</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectOrder(order)}
                    className="h-12 w-full mt-1 rounded-xl bg-[#ebeef7] hover:bg-[#dfe2ec] text-[#181c23] text-[13px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>View Milestones</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                )}
              </article>
            );
          })}

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-xs border border-[#dde1e6] space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#ebeef7] flex items-center justify-center text-[#5a5f68]">
                <span className="material-symbols-outlined text-[24px]">search_off</span>
              </div>
              <h5 className="text-[16px] font-bold text-[#181c23]">No matching orders</h5>
              <p className="text-xs text-[#5a5f68] max-w-xs">
                No purchase orders matched "{searchQuery}". Try clearing search or resetting active status filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-[#ebeef7] text-[#181c23] text-xs font-bold hover:bg-[#dfe2ec] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
