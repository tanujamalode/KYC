import { Order, ExceptionItem, NotificationItem, EvidenceFile } from '../types';

export const ASSET_URLS = {
  abbLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9rljNvSxJ9CukZM-Qa6WKKsBrcL_jixO-5kSJ8kfaBeW-NTnhm2qDT-OihUFuYJ0s8D54ELkvpxA3VBthditqcdQoemWBCShiWl_s5mrp6k7rcfhx0xUwj3LFkt1d_IjkmErTodle8OK76-vYRtdDrnISathbzOZ0-3mIc7kPGqws8btvpnqH_avkrKdNwZ7c-mhydqXiWRAZc_UcQb90muVy0DcDMFz36ebtolfak-T5FwoKeIPo_w',
  profileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoTVYWzXGX6bX1O35P0SdryIFigh60i_ZVVuD2y_kjl1tEOnDEWC-zXXYZoxr9HO2j_VfCd2FvXtb7aXan2xPeL1k-RwH0UaGO7xwlv6v9Y6T_YVZS_4Z6x90zPS6HMJGlaLYR78BHkHLxzWgqmGd37rjl5UzZChnbR1RM-j0gZf_av2LzPrBB18m-Ciog4dGTdp1UJjIt-sGr6rMM9FtLcU3DRJVKld-6loV_r6PH2NrCUJKgTQDnXA',
  copperBusbarDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvlohPwzwCEkmM0kOPMYzLih3-n3sEZfxpw3_eUeRzX_DccyBwXY4X7GBP_IoeuruzI00fqG_L4L1b33Jds9Ld9bk9SaZUajgEABtQgrKU4OQBmMUNFdP0nvKj11ewW4lAEGIv0l2qC24lTdM0-yHnID8ztZMAZatkn0eO5hacKeNeLYrU3yEx9bZCNwK_b25bHBx6eirrzynq09jzUs54pZMtLG-FWYWstTraz68Kxp4pVe3E0_6RSQ',
  busbarHome: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYUXJcY3ygGKKQ_E7KkODQOPPAhyfZPfCmsVkx3T9ihcXAN8mH83okcZ6hQN6WV490NlW3_BX6zVTnzWIxExuLL0FNko4NIf2R1l2tsmlrrkUYSPMU9PqJpw6JTYNyMjoE7eoZ2UYKS3nzMUzzVwQDAdAdnbvJSwydd9j_PlWx6o0XL7S7pGgJENomSrEU_XgsMoQePbnRVrQer38452hYS_vhawhpX4_yr9LOYPlObracXK5Z27lRrA',
  epoxyBushingHome: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrqHpAwINHPTgoVOtMAw-E-S6rhmhmLIDlDcrZqMcNVwx7FEEY1EFKmgQLz8J0vxaSuOqBnFMZdpcDPYywDkEebz-XaD1V-iBzf-IgjrnsMaOMnxsSrHmGiuGULr-UG037SMSeY7lYvNXEyW93lsXCW2KvBabqplTWT2vi3ebS0YmIcO3FlIeDmWr2HVahrG6wil4Ee1aX8t7W08MIk2th5noVzxmFK-eDSbtsCIXDD60GkF5ysl0AXw',
  enclosureHome: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrKAcwf6uJgszePlW82o9TAB546Y0Bizcwfo4IdsM90ShaUMAj7P-dGfGkc1j3bgpl_JXc6q098UUANh9_3koEsFPivmGi40_YK0IfZ3Yv608KaTqam3wUVsUH7lQSESclMNzG7o56IjNLY5IBMHfvyh552kqFzX3fM4EDsuqmF6EMFpK-Liv9RjmQ_gvf4YLo01WJyvkPiD0vrrFbvXOCasxtPp6LhT4xbfhUUaTN814wtwbBOAX_Nw',
  dimensionalScan: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtohNr2PhmDzAG2dEhgzd4UXQWGHtpCmFga1slAgKEa_0v1JLnGN0iARAlFyposNOdQt3iXZf2apdziGYAkQkrnZKH7CZFBb9bGv0qvuvWW5f-ok8EGTBVCZ7F_nFypm8iMd0cpHZ9_QWcHXlUnZ8JTjENhvMME4DayXi0wrthGQuKj2GlpLijKaa2q-Mty7v4hOd5jccjEgYvF9RHFBAsTWSOwYmy8tLbN6ldKe4mNszDI3mgMWw4UQ',
  epoxyOrders: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk0bsGk-fhXda2jeY5RiAnCgUXrpyxoL2SmuFbASefdpD0pJqmheegrviYtgmSaoRag_BEJ33qZvift4sdH6nJKfW4V-iSxVWWLNbOdqa-VB8hQQShuze6t5RXA2TWyL7xUeQr8oEMVQcKuXizqlJ5AChVqEl3ngU6KDr1DP95Y2RrRDqBylzPNfR2V2cic-YX6vJVeE4_eI6Lx8D94titYqlI9chKhqpTiFoyyHQc9uZSdbj0g5IoIQ',
  busbarOrders: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdeEkucrFcBCx4UH_i7QFYeodPFMH0BNyci618mC4FEXYfb8pRvf4kUehzY6GFz-K24CMbdvTg5WGdr7NwwA14_ugQH5HCKpE_Ja_4SIuUVI4q_NZ_F-jVOWxGcNQBAYDo7ZtTrI34Pn9ewG0JLObCDC2qgJA-eEx9_ZygmqKlE5VWQHz5jPL8nQGKhv2snmjNydnrfHwrpD41naVRrK_xJHePPdRQoN30ueluoJEISdMDVcQRwGEnDg',
  enclosureOrders: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO_RmhkLPc9_nnG4TNSDYYjrOIl90aklLb1lGD36ikVDGp_u1qfJDG1fJ32e8ErUGJKRo3W7z2ChuIZafFedePtKRirMQnkTRn7h8OfgEUrBjJYrcTTebaEqhaf58jgQff7Ri2iZ5YqqMdzRhdXkyiguW5a1ZhFokBKRiMmflsozsnlJjCk2ggLGrorCbtKo-KUjbRnMuKdGa-fjyWl1qkFQpn-ha7AdyV2RNRGeFfZ07ytDhoOPm5hA',
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'po-9115',
    poNumber: 'PO-9115',
    title: 'Copper Busbar Power Distributor 1250A',
    stageDescription: 'Stage 4: Quality Inspection',
    currentStage: 4,
    totalStages: 5,
    progressPercent: 80,
    status: 'active',
    statusLabel: 'In Production',
    quantity: '150 bars',
    deliveryDue: '22 Oct 2026',
    deliveryDueSubtitle: '(In 7 days)',
    supplier: 'Precision Metals Ltd',
    supplierCode: '(V-44910)',
    destination: 'ABB Vadodara Plant 04',
    destinationSub: 'Substation Tech Bay',
    imageUrl: ASSET_URLS.busbarHome,
    specBadge: '1250A CU',
    milestones: [
      {
        id: 1,
        stageNumber: 1,
        title: '1. Raw Material Verification & MTC Signoff',
        date: '02 Oct 2026',
        description: 'Verified MTC #MTC-8891 attached. Electrolytic copper purity 99.9% matched.',
        status: 'completed',
        signoffNote: 'Completed & Signed Off',
        signedBy: 'Dr. Alok Verma (Metals Lab Lead)'
      },
      {
        id: 2,
        stageNumber: 2,
        title: '2. CNC Precision Milling & Boring',
        date: '10 Oct 2026',
        description: 'Tolerance ±0.05mm inspected on CMM. Signoff by Rajesh S. (Lead Machinist).',
        status: 'completed',
        signoffNote: 'Completed & Signed Off',
        signedBy: 'Rajesh Sharma'
      },
      {
        id: 3,
        stageNumber: 3,
        title: '3. Anti-Corrosion Electroplating & Surface Coating',
        date: '16 Oct 2026',
        description: 'Tin plating thickness 12 microns certified with salt spray report. Lab pass.',
        status: 'completed',
        signoffNote: 'Completed & Signed Off',
        signedBy: 'Surface QA Lab'
      },
      {
        id: 4,
        stageNumber: 4,
        title: '4. ABB Quality Verification & Inspection',
        date: 'Pending Report',
        description: 'Batch physical inspection scheduled on-site. Requires test report and tolerance scan upload for final signoff.',
        status: 'active',
        signoffNote: 'In Progress (80% Complete)'
      },
      {
        id: 5,
        stageNumber: 5,
        title: '5. Final Packaging, Barcoding & Dispatch',
        date: 'Due 22 Oct 2026',
        description: 'Palletized crating with QR serial badges and automatic SAP gate pass generation.',
        status: 'locked',
        signoffNote: 'Locked until Stage 4 quality signoff'
      }
    ],
    evidenceFiles: [
      {
        id: 'ev-1',
        name: 'Dimensional_Tolerance_Scan_RunB.jpg',
        size: '2.4 MB',
        type: 'image',
        status: 'Inspected',
        statusType: 'success',
        previewUrl: ASSET_URLS.dimensionalScan,
        uploadedAt: '17 Oct 2026, 14:32',
        poNumber: 'PO-9115'
      },
      {
        id: 'ev-2',
        name: 'MTC_Copper_Electrolytic_Purity_99.9%.pdf',
        size: '1.8 MB',
        type: 'pdf',
        status: 'Verified MTC',
        statusType: 'info',
        uploadedAt: '02 Oct 2026, 09:15',
        poNumber: 'PO-9115'
      }
    ]
  },
  {
    id: 'po-5290',
    poNumber: 'PO-5290',
    title: 'M12 High Voltage Epoxy Bushing Insulator',
    stageDescription: 'Stage 2: Milling & Boring',
    currentStage: 2,
    totalStages: 5,
    progressPercent: 20,
    status: 'overdue',
    statusLabel: 'Overdue (17 Days)',
    quantity: '500 bushings',
    deliveryDue: '25 Sep 2026',
    deliveryDueSubtitle: '(Overdue 17 days)',
    supplier: 'Precision Metals Ltd',
    supplierCode: '(V-44910)',
    destination: 'ABB Vadodara Plant 04',
    destinationSub: 'Transformer Bay 2',
    imageUrl: ASSET_URLS.epoxyBushingHome,
    specBadge: '12kV M12',
    hasException: true,
    exceptionRef: 'EX-104',
    exceptionDescription: 'Ceramic core shortage reported on milling line B-2.',
    milestones: [
      {
        id: 11,
        stageNumber: 1,
        title: '1. Ceramic Ingot Raw Material Verification',
        date: '10 Sep 2026',
        description: 'Lot batch certification #CER-4402 validated against electrical breakdown spec.',
        status: 'completed',
        signoffNote: 'Completed & Signed Off'
      },
      {
        id: 12,
        stageNumber: 2,
        title: '2. CNC Precision Milling & Boring',
        date: '25 Sep 2026 (Delayed)',
        description: 'Shortage of high-grade alumina ceramic cores caused milling hold at line B-2.',
        status: 'active',
        signoffNote: 'Hold on Milling Line B-2'
      },
      {
        id: 13,
        stageNumber: 3,
        title: '3. Epoxy Vacuum Impregnation & Curing',
        date: 'Pending Stage 2',
        description: 'Thermal autoclave cure schedule 140°C for 6 hours.',
        status: 'locked'
      },
      {
        id: 14,
        stageNumber: 4,
        title: '4. 75kV Impulse & Dielectric QA Testing',
        date: 'Pending Stage 3',
        description: 'Corona discharge and partial discharge threshold verification.',
        status: 'locked'
      },
      {
        id: 15,
        stageNumber: 5,
        title: '5. Packaging & SAP Dispatch',
        date: 'Pending',
        description: 'Shock-resistant wooden crate packaging with impact tilt indicators.',
        status: 'locked'
      }
    ],
    evidenceFiles: [
      {
        id: 'ev-5290-1',
        name: 'Ceramic_Core_Shortage_Incident_Log.pdf',
        size: '1.2 MB',
        type: 'pdf',
        status: 'Under Review',
        statusType: 'warning',
        uploadedAt: '25 Sep 2026, 11:20',
        poNumber: 'PO-5290'
      }
    ]
  },
  {
    id: 'po-8831',
    poNumber: 'PO-8831',
    title: '36kV Front Cover Enclosure',
    stageDescription: 'Completed (5/5 Milestones)',
    currentStage: 5,
    totalStages: 5,
    progressPercent: 100,
    status: 'completed',
    statusLabel: 'Completed',
    quantity: '240 units',
    deliveryDue: '18 Oct 2026',
    deliveryDueSubtitle: '(Delivered & Verified)',
    supplier: 'Precision Metals Ltd',
    supplierCode: '(V-44910)',
    destination: 'ABB Vadodara Plant 04',
    destinationSub: 'Medium Voltage Assembly',
    imageUrl: ASSET_URLS.enclosureHome,
    specBadge: '36kV IP55',
    milestones: [
      {
        id: 21,
        stageNumber: 1,
        title: '1. Sheet Metal Laser Profiling & Punching',
        date: '28 Sep 2026',
        description: '2.5mm CRCA sheet steel laser profiled on Trumpf TruLaser 3030.',
        status: 'completed',
        signoffNote: 'Completed & Signed Off'
      },
      {
        id: 22,
        stageNumber: 2,
        title: '2. Precision CNC Bending & Robotic Welding',
        date: '04 Oct 2026',
        description: 'Seam welds leak tested and dimensionally calibrated.',
        status: 'completed',
        signoffNote: 'Completed & Signed Off'
      },
      {
        id: 23,
        stageNumber: 3,
        title: '3. 7-Tank Pretreatment & Polyester Powder Coating',
        date: '09 Oct 2026',
        description: 'RAL 7035 light grey, 80-100 micron thickness cross-hatch tested.',
        status: 'completed',
        signoffNote: 'Completed & Signed Off'
      },
      {
        id: 24,
        stageNumber: 4,
        title: '4. Gasket Polyurethane Foaming & IP55 Test',
        date: '14 Oct 2026',
        description: 'Ingress protection cert IP55 signed by NABL accredited inspector.',
        status: 'completed',
        signoffNote: 'Completed & Signed Off'
      },
      {
        id: 25,
        stageNumber: 5,
        title: '5. Packaging, Serial Barcoding & SAP Dispatch',
        date: '18 Oct 2026',
        description: 'Barcoded with ABB SAP Gate Pass #GP-8831-VAD. Dispatched.',
        status: 'completed',
        signoffNote: 'Dispatched & Archived'
      }
    ],
    evidenceFiles: [
      {
        id: 'ev-8831-1',
        name: 'IP55_Ingress_Protection_Certificate.pdf',
        size: '3.1 MB',
        type: 'pdf',
        status: 'Certified Pass',
        statusType: 'success',
        uploadedAt: '14 Oct 2026, 16:40',
        poNumber: 'PO-8831'
      },
      {
        id: 'ev-8831-2',
        name: 'SAP_Gate_Pass_GP8831.pdf',
        size: '0.9 MB',
        type: 'pdf',
        status: 'Dispatched',
        statusType: 'info',
        uploadedAt: '18 Oct 2026, 08:30',
        poNumber: 'PO-8831'
      }
    ]
  }
];

export const MOCK_EXCEPTIONS: ExceptionItem[] = [
  {
    id: 'EX-104',
    poNumber: 'PO-5290',
    title: 'Shortage: Ceramic core shipment delayed (Overdue 25 Sep)',
    severity: 'critical',
    status: 'open',
    reportedDate: '25 Sep 2026, 09:30',
    reportedBy: 'Kailash Patel (Shop Floor Line Supervisor)',
    impact: 'Batch of 500 bushings delayed on CNC milling line B-2. Downstream autoclave cycle postponed.',
    rootCause: 'Tier-2 raw ceramic supplier experienced kiln refractory breakdown in Morbi cluster.',
    mitigationPlan: 'Emergency allocation approved from secondary ABB-cleared vendor (Apex Technical Ceramics). Replacement lot ETA 14 Oct 2026.',
    actionRequired: 'Supplier must upload replacement ceramic MTC and confirm rescheduled delivery date in KYC portal.'
  },
  {
    id: 'EX-102',
    poNumber: 'PO-9115',
    title: 'Galvanizing bath zinc thickness variance (+3µm) on initial sample',
    severity: 'warning',
    status: 'resolved',
    reportedDate: '15 Oct 2026, 11:15',
    reportedBy: 'QA Lab Tech Dinesh',
    impact: 'Sample exceeded max coating limit by 3µm.',
    rootCause: 'Immersion duration calibrated for thicker substrate.',
    mitigationPlan: 'Recalibrated timer controls to 42 seconds. Subsequent 15 samples fully conforming.',
    actionRequired: 'Resolved. Signed off by QA engineer on 16 Oct.'
  },
  {
    id: 'EX-098',
    poNumber: 'PO-8831',
    title: 'Customs port congestion holding stainless steel hardware batch',
    severity: 'info',
    status: 'resolved',
    reportedDate: '01 Oct 2026, 17:00',
    reportedBy: 'Rajesh Sharma',
    impact: 'Enclosure handle assemblies waited 48h at Mundra port.',
    rootCause: 'Green channel customs clearance queue.',
    mitigationPlan: 'Customs cleared on 03 Oct; expedited via priority air cargo to plant.',
    actionRequired: 'Archived.'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Urgent Action: PO-5290 Overdue',
    message: 'Ceramic core exception #EX-104 requires revised dispatch schedule for Plant 04.',
    timestamp: '10m ago',
    type: 'critical',
    unread: true,
    poRef: 'PO-5290'
  },
  {
    id: 'notif-2',
    title: 'Quality Verification Ready: PO-9115',
    message: 'Batch sample ready for electrical conductivity & dimensional tolerance signoff.',
    timestamp: '1h ago',
    type: 'alert',
    unread: true,
    poRef: 'PO-9115'
  },
  {
    id: 'notif-3',
    title: 'SAP Gate Pass Synchronized',
    message: 'PO-8831 36kV Front Cover Enclosure received by ABB Vadodara Plant 04 warehouse.',
    timestamp: 'Yesterday',
    type: 'success',
    unread: true,
    poRef: 'PO-8831'
  }
];
