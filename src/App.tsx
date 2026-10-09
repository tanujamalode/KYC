import React, { useState } from 'react';
import { ScreenType, Order, EvidenceFile, NotificationItem, UserRole } from './types';
import { INITIAL_ORDERS, MOCK_NOTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { LoginScreen } from './screens/LoginScreen';
import { HomeDashboardScreen } from './screens/HomeDashboardScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { OrderDetailScreen } from './screens/OrderDetailScreen';
import { ProofAndDocsScreen } from './screens/ProofAndDocsScreen';
import { ExceptionsScreen } from './screens/ExceptionsScreen';
import { UploadEvidenceModal } from './components/Modals/UploadEvidenceModal';
import { ReportDelayModal } from './components/Modals/ReportDelayModal';
import { ImagePreviewModal } from './components/Modals/ImagePreviewModal';
import { NotificationsSheet } from './components/Modals/NotificationsSheet';
import { ProfileModal } from './components/Modals/ProfileModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order>(INITIAL_ORDERS[0]);
  const [userRole, setUserRole] = useState<UserRole>('supplier');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isReportDelayOpen, setIsReportDelayOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<EvidenceFile | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastIcon, setToastIcon] = useState('check_circle');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string, icon: string = 'check_circle') => {
    setToastMessage(message);
    setToastIcon(icon);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  const handleFileUpload = (newFile: EvidenceFile) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.poNumber === newFile.poNumber) {
          return {
            ...order,
            evidenceFiles: [newFile, ...order.evidenceFiles],
          };
        }
        return order;
      })
    );

    if (selectedOrder.poNumber === newFile.poNumber) {
      setSelectedOrder((prev) => ({
        ...prev,
        evidenceFiles: [newFile, ...prev.evidenceFiles],
      }));
    }

    showToast(`File ${newFile.name} attached & synced to ABB SAP QA.`, 'verified');
  };

  const handleDelaySubmit = (delayData: {
    poNumber: string;
    category: string;
    duration: string;
    notes: string;
  }) => {
    showToast(
      `Incident logged for ${delayData.poNumber} with ABB Plant 04 Dispatch desk.`,
      'warning'
    );
  };

  const handlePreviewFile = (file: EvidenceFile) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    setIsNotificationsOpen(false);

    if (notif.poRef === 'PO-5290') {
      setCurrentScreen('exceptions');
    } else if (notif.poRef === 'PO-9115') {
      const ord = orders.find((o) => o.poNumber === 'PO-9115');
      if (ord) setSelectedOrder(ord);
      setCurrentScreen('order-detail');
    } else {
      setCurrentScreen('orders');
    }
  };

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#20242b]">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-[#f7f8fa] shadow-none sm:max-w-[460px]">
        <Header
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBack={() => setCurrentScreen('orders')}
          unreadCount={unreadNotifsCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          userRole={userRole}
        />

        <main className="flex-1 w-full px-4 pt-20 bg-[#f7f8fa] pb-safe">
          {currentScreen === 'login' && (
            <LoginScreen
              onLoginSuccess={(role) => {
                setUserRole(role);
                setCurrentScreen('home');
                showToast(`Authenticated as ${role === 'supplier' ? 'Supplier' : 'ABB Staff'}.`);
              }}
            />
          )}

          {currentScreen === 'home' && (
            <HomeDashboardScreen
              orders={orders}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSelectOrder={(order) => {
                setSelectedOrder(order);
                setCurrentScreen('order-detail');
              }}
              onOpenUploadProof={() => setIsUploadOpen(true)}
              onOpenReportDelay={() => setIsReportDelayOpen(true)}
              onSelectException={() => setCurrentScreen('exceptions')}
            />
          )}

          {currentScreen === 'orders' && (
            <OrdersScreen
              orders={orders}
              onSelectOrder={(order) => {
                setSelectedOrder(order);
                setCurrentScreen('order-detail');
              }}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSelectException={() => setCurrentScreen('exceptions')}
              onTriggerRefresh={() => {
                showToast('Live supplier telemetry synchronized with Plant 04.');
              }}
            />
          )}

          {currentScreen === 'order-detail' && (
            <OrderDetailScreen
              order={selectedOrder}
              onBack={() => setCurrentScreen('orders')}
              onOpenUploadEvidence={() => setIsUploadOpen(true)}
              onOpenReportDelay={() => setIsReportDelayOpen(true)}
              onPreviewFile={handlePreviewFile}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'proof-and-docs' && (
            <ProofAndDocsScreen
              orders={orders}
              onOpenUploadModal={() => setIsUploadOpen(true)}
              onPreviewFile={handlePreviewFile}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'exceptions' && (
            <ExceptionsScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenReportDelay={() => setIsReportDelayOpen(true)}
              onShowToast={showToast}
            />
          )}
        </main>

        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          exceptionCount={orders.filter((o) => o.hasException).length}
        />
      </div>

      {/* Floating Interactive Toast */}
      <Toast message={toastMessage} icon={toastIcon} visible={toastVisible} />

      {/* Modals & Drawers */}
      <UploadEvidenceModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        poNumber={selectedOrder?.poNumber || 'PO-9115'}
        onFileUpload={handleFileUpload}
      />

      <ReportDelayModal
        isOpen={isReportDelayOpen}
        onClose={() => setIsReportDelayOpen(false)}
        defaultPo={selectedOrder?.poNumber || 'PO-9115'}
        onSubmitDelay={handleDelaySubmit}
      />

      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        file={previewFile}
      />

      <NotificationsSheet
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onSelectNotification={handleSelectNotification}
        onClearAll={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
          showToast('All notifications marked read.');
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userRole={userRole}
        onChangeRole={(role) => {
          setUserRole(role);
          showToast(`Switched active profile to ${role === 'supplier' ? 'Supplier' : 'ABB Staff'}.`);
        }}
        onLogout={() => {
          setCurrentScreen('login');
          showToast('Logged out to KYC portal.');
        }}
      />
    </div>
  );
}
