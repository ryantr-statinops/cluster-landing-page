'use client';

import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────
type CanvasTheme = 'sleek-neon' | 'classic-blueprint';

interface NodeState {
  id: string;
  visible: boolean;
  title: string;
  type: 'data-field' | 'data-hub' | 'pivot-table' | 'graph';
  x: number;
  y: number;
  width: number;
  height: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom Interactive Visual Workflow Component
// ─────────────────────────────────────────────────────────────────────────────
export default function VisualWorkflow() {
  // Theme state: default is premium sleek dark mode
  const [theme, setTheme] = useState<CanvasTheme>('sleek-neon');
  const [zoom, setZoom] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  
  // Settings dropdowns for nodes
  const [activeSettingsNode, setActiveSettingsNode] = useState<string | null>(null);
  
  // Custom states for nodes
  const [dh1SortDesc, setDh1SortDesc] = useState<boolean>(true);
  const [dh2GroupField, setDh2GroupField] = useState<'Category' | 'Source'>('Category');
  const [pivotMetric, setPivotMetric] = useState<'Revenue' | 'Efficiency'>('Revenue');
  const [graphChartType, setGraphChartType] = useState<'pie' | 'donut' | 'bar'>('pie');
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // Nodes state matching image.png exactly
  const [nodes, setNodes] = useState<NodeState[]>([
    { id: 'df1', visible: true, title: 'Data Field', type: 'data-field', x: 60, y: 100, width: 280, height: 210 },
    { id: 'df2', visible: true, title: 'Data Field', type: 'data-field', x: 60, y: 380, width: 280, height: 210 },
    { id: 'df3', visible: true, title: 'Data Field', type: 'data-field', x: 60, y: 660, width: 280, height: 210 },
    { id: 'dh1', visible: true, title: 'Data Hub', type: 'data-hub', x: 560, y: 100, width: 340, height: 210 },
    { id: 'dh2', visible: true, title: 'Data Hub', type: 'data-hub', x: 560, y: 520, width: 340, height: 210 },
    { id: 'pivot', visible: true, title: 'Pivot Table', type: 'pivot-table', x: 560, y: 940, width: 340, height: 210 },
    { id: 'graph', visible: true, title: 'Graph', type: 'graph', x: 60, y: 940, width: 340, height: 250 },
  ]);

  // Trigger step-by-step pipeline highlights when running
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      setSimulationStep(1);
      
      const runTimeline = () => {
        timer = setTimeout(() => {
          setSimulationStep((prev) => {
            if (prev >= 5) {
              setIsRunning(false);
              return 0;
            }
            return prev + 1;
          });
        }, 2200);
      };
      
      runTimeline();
    } else {
      setSimulationStep(0);
    }
    return () => clearTimeout(timer);
  }, [isRunning]);

  const toggleNodeVisibility = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, visible: !n.visible } : n))
    );
    // Close settings if it was open
    if (activeSettingsNode === id) {
      setActiveSettingsNode(null);
    }
  };

  const resetAllNodes = () => {
    setNodes((prev) => prev.map((n) => ({ ...n, visible: true })));
    setIsRunning(false);
    setSimulationStep(0);
  };

  // Mock data for Data Field 1 (User Profiles)
  const df1Data = [
    { id: '#101', name: 'Alex', role: 'Dev', score: '88', status: 'Active' },
    { id: '#102', name: 'Betty', role: 'PM', score: '92', status: 'Active' },
    { id: '#103', name: 'Chris', role: 'Design', score: '79', status: 'Pending' },
    { id: '#104', name: 'Diana', role: 'QA', score: '85', status: 'Active' },
    { id: '#105', name: 'Ethan', role: 'Dev', score: '90', status: 'Inactive' },
  ];

  // Mock data for Data Field 2 (Transactions)
  const df2Data = [
    { id: '#T901', amount: 120, category: 'SaaS', date: 'May 12', status: 'Paid' },
    { id: '#T902', amount: 450, category: 'Hardware', date: 'May 13', status: 'Paid' },
    { id: '#T903', amount: 80, category: 'Cloud', date: 'May 14', status: 'Pending' },
    { id: '#T904', amount: 1500, category: 'SaaS', date: 'May 15', status: 'Paid' },
    { id: '#T905', amount: 310, category: 'Marketing', date: 'May 16', status: 'Failed' },
  ];

  // Mock data for Data Field 3 (Traffic)
  const df3Data = [
    { source: 'Google', views: '14.2k', bounce: '42%', duration: '2.5m', conv: '3.2%' },
    { source: 'Direct', views: '8.9k', bounce: '38%', duration: '3.1m', conv: '4.5%' },
    { source: 'Social', views: '11.5k', bounce: '55%', duration: '1.2m', conv: '1.8%' },
    { source: 'Referral', views: '3.1k', bounce: '29%', duration: '4.0m', conv: '5.1%' },
    { source: 'Email', views: '5.4k', bounce: '31%', duration: '3.8m', conv: '6.2%' },
  ];

  // Downstream Data Hub 1: Dynamic reaction to Data Field 1 visibility & sorting direction
  const getDh1Data = () => {
    if (!nodes.find((n) => n.id === 'df1')?.visible) {
      return [];
    }
    const data = [...df2Data];
    return data.sort((a, b) => (dh1SortDesc ? b.amount - a.amount : a.amount - b.amount));
  };

  // Downstream Data Hub 2: Reactive to Data Field 2 & 3 visibility
  const getDh2Data = () => {
    const df2Visible = nodes.find((n) => n.id === 'df2')?.visible;
    const df3Visible = nodes.find((n) => n.id === 'df3')?.visible;
    
    if (!df2Visible && !df3Visible) return [];
    
    const combined = [];
    if (df2Visible) {
      combined.push(
        { metric: 'Total SaaS', value: '$1,620', source: 'Data Field 2', impact: 'High', trend: '+12%' },
        { metric: 'Hardware', value: '$450', source: 'Data Field 2', impact: 'Medium', trend: '-2%' }
      );
    }
    if (df3Visible) {
      combined.push(
        { metric: 'Total Views', value: '43.1k', source: 'Data Field 3', impact: 'Medium', trend: '+8%' },
        { metric: 'Avg Conv', value: '4.16%', source: 'Data Field 3', impact: 'High', trend: '+1.5%' }
      );
    }
    
    // Switch dynamic view based on grouped settings
    if (dh2GroupField === 'Source') {
      return combined.sort((a, b) => a.source.localeCompare(b.source));
    }
    return combined;
  };

  // Pivot Table mock data - reacts to DH2 data
  const getPivotData = () => {
    const dh2HasData = getDh2Data().length > 0;
    if (!dh2HasData) return [];
    
    if (pivotMetric === 'Efficiency') {
      return [
        { group: 'Marketing', col1: '94%', col2: '92%', col3: '96%', col4: '95%' },
        { group: 'Product', col1: '88%', col2: '85%', col3: '91%', col4: '89%' },
        { group: 'Operations', col1: '92%', col2: '90%', col3: '94%', col4: '91%' },
        { group: 'Sales', col1: '85%', col2: '80%', col3: '88%', col4: '84%' },
        { group: 'Support', col1: '99%', col2: '98%', col3: '100%', col4: '99%' },
      ];
    }

    return [
      { group: 'Marketing', col1: '$4.2k', col2: '$4.0k', col3: '82%', col4: '94%' },
      { group: 'Product', col1: '$12.5k', col2: '$12.0k', col3: '75%', col4: '88%' },
      { group: 'Operations', col1: '$1.8k', col2: '$2.0k', col3: '90%', col4: '92%' },
      { group: 'Sales', col1: '$15.6k', col2: '$14.5k', col3: '68%', col4: '85%' },
      { group: 'Support', col1: '$0.8k', col2: '$1.0k', col3: '95%', col4: '99%' },
    ];
  };

  // Pie chart parameters
  const chartSlices = [
    { label: 'Society', value: 21.3, color: '#312e81', neonColor: 'rgba(99,102,241,0.85)' },
    { label: 'Science', value: 20.7, color: '#4c1d95', neonColor: 'rgba(168,85,247,0.85)' },
    { label: 'Business', value: 14.8, color: '#1e3a8a', neonColor: 'rgba(59,130,246,0.85)' },
    { label: 'Recreation', value: 9.5, color: '#1d4ed8', neonColor: 'rgba(29,78,216,0.85)' },
    { label: 'Home', value: 8.9, color: '#db2777', neonColor: 'rgba(236,72,153,0.85)' },
    { label: 'Health', value: 8.8, color: '#0891b2', neonColor: 'rgba(6,182,212,0.85)' },
    { label: 'Computers', value: 6.2, color: '#6d28d9', neonColor: 'rgba(139,92,246,0.85)' },
    { label: 'Sports', value: 4.6, color: '#0369a1', neonColor: 'rgba(14,165,233,0.85)' },
    { label: 'Shopping', value: 3.9, color: '#be185d', neonColor: 'rgba(219,39,119,0.85)' },
    { label: 'Games', value: 1.2, color: '#581c87', neonColor: 'rgba(126,34,206,0.85)' },
  ];

  // Dynamic layout colors depending on Sleek Neon vs Classic Blueprint
  const isClassic = theme === 'classic-blueprint';
  
  const canvasBgClass = isClassic ? 'bg-white' : 'bg-[#080808]';
  const gridLineColor = isClassic ? 'rgba(0,0,0,0.06)' : 'rgba(6,182,212,0.04)';
  
  // Connection line states (active/faded depending on source node visibility)
  const isPathActive = (srcId: string) => {
    return nodes.find((n) => n.id === srcId)?.visible ?? false;
  };

  // SVG dimensions for coordinates
  const canvasWidth = 960;
  const canvasHeight = 1220;

  // Pie chart calculation
  let cumulativeAngle = 0;
  const pieRadius = 60;
  const pieCenterX = 170;
  const pieCenterY = 135;

  return (
    <section id="visual-workflow" className="relative py-24 md:py-32 overflow-hidden border-t border-border">
      {/* Dynamic Grid Background */}
      <div 
        className="absolute inset-0 transition-colors duration-500 pointer-events-none" 
        style={{
          backgroundColor: isClassic ? '#ffffff' : '#080808',
          backgroundImage: `
            linear-gradient(${gridLineColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Background orbs (Sleek Theme only) */}
      {!isClassic && (
        <>
          <div className="orb w-96 h-96 top-1/4 -left-32 opacity-40" style={{ background: 'rgba(6,182,212,0.1)' }} />
          <div className="orb w-96 h-96 bottom-1/4 -right-32 opacity-30" style={{ background: 'rgba(244,190,155,0.08)' }} />
        </>
      )}

      {/* Styled self-contained CSS block for neon glows & animated lines */}
      <style>{`
        @keyframes strokeDash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animated-flow-path {
          stroke-dasharray: 8, 8;
          animation: strokeDash 1.2s linear infinite;
        }
        .neon-shadow-node {
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.15);
        }
        .neon-shadow-node:hover {
          box-shadow: 0 0 35px rgba(6, 182, 212, 0.25);
          border-color: rgba(6, 182, 212, 0.4) !important;
        }
        .classic-shadow-node {
          box-shadow: 6px 6px 0px #000;
        }
        .classic-shadow-node:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0px #000;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="reveal mb-12">
          <div className="label mb-4">// 03 — Interactive Spatial Engine</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                Không gian thiết kế <br className="hidden md:block" />
                <span className="grad-text">Visual Workflow trực quan</span>
              </h2>
              <p className="text-subtle text-sm max-w-xl leading-relaxed">
                Tương tác trực tiếp với các node dữ liệu bên dưới: nhấp <span className="text-red-400 font-bold">X</span> để đóng node, điều chỉnh bánh răng cài đặt, thay đổi sắp xếp dữ liệu hoặc bật mô phỏng để xem luồng dữ liệu tự động đồng bộ hóa.
              </p>
            </div>
            
            {/* Toolbar Panel */}
            <div className="flex flex-wrap items-center gap-3 bg-surface border border-border p-2.5 rounded-lg shadow-xl shrink-0">
              
              {/* Play Simulation Button */}
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-[11px] font-bold tracking-wider uppercase rounded transition-all duration-300 ${
                  isRunning 
                    ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                }`}
              >
                {isRunning ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Dừng Mô Phỏng
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Mô Phỏng Luồng
                  </>
                )}
              </button>

              {/* Reset Canvas Button */}
              <button
                onClick={resetAllNodes}
                className="p-2 border border-border hover:border-subtle bg-black/30 hover:bg-black/50 text-subtle hover:text-white rounded transition-colors text-[11px] font-mono flex items-center gap-1.5"
                title="Khôi phục trạng thái Canvas ban đầu"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5M4 9h4.5" />
                </svg>
                Khôi phục
              </button>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Zoom controls */}
              <div className="flex items-center gap-1 bg-black/45 px-2 py-1 rounded border border-border">
                <button 
                  onClick={() => setZoom((z) => Math.max(0.65, z - 0.1))} 
                  className="w-5 h-5 flex items-center justify-center font-bold text-subtle hover:text-white hover:bg-white/10 rounded transition-colors text-xs select-none"
                >
                  -
                </button>
                <span className="text-[10px] font-mono font-bold text-dim w-9 text-center select-none">
                  {Math.round(zoom * 100)}%
                </span>
                <button 
                  onClick={() => setZoom((z) => Math.min(1.2, z + 0.1))} 
                  className="w-5 h-5 flex items-center justify-center font-bold text-subtle hover:text-white hover:bg-white/10 rounded transition-colors text-xs select-none"
                >
                  +
                </button>
              </div>

              <div className="w-px h-6 bg-border mx-1" />

              {/* Theme Switcher Toggle */}
              <div className="flex items-center gap-1 bg-black/45 p-0.5 rounded border border-border">
                <button
                  onClick={() => setTheme('sleek-neon')}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all duration-300 ${
                    theme === 'sleek-neon'
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                      : 'text-dim hover:text-subtle border border-transparent'
                  }`}
                >
                  Sleek Dark
                </button>
                <button
                  onClick={() => setTheme('classic-blueprint')}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all duration-300 ${
                    theme === 'classic-blueprint'
                      ? 'bg-red-500/10 border border-red-500/30 text-red-500'
                      : 'text-dim hover:text-subtle border border-transparent'
                  }`}
                >
                  Blueprint
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Spatial Canvas Container Wrapper with horizontal scrollbar for mobile responsiveness */}
        <div className="w-full overflow-x-auto rounded-xl border border-border bg-black/40 backdrop-blur-sm shadow-[inset_0_1px_8px_rgba(255,255,255,0.03)] cursor-grab active:cursor-grabbing">
          
          {/* Main Visual Canvas Area */}
          <div 
            className="relative transition-all duration-500 select-none mx-auto"
            style={{ 
              width: `${canvasWidth}px`, 
              height: `${canvasHeight}px`,
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              margin: zoom < 1 ? `0 auto -${canvasHeight * (1 - zoom)}px` : '0 auto',
            }}
          >
            
            {/* ─── CONNECTION LINES SVG OVERLAY ─── */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Arrow markers for standard connections */}
                <marker
                  id="arrow-classic"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#ef4444" />
                </marker>
                
                <marker
                  id="arrow-neon"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 2 L 7 5 L 0 8 z" fill="#06b6d4" />
                </marker>

                <marker
                  id="arrow-neon-faded"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 2 L 7 5 L 0 8 z" fill="#2a2a2a" />
                </marker>

                {/* Filter for neon glowing paths */}
                <filter id="neon-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Connection: DataField1 -> DataHub1 (Sort Data) */}
              {(() => {
                const active = isPathActive('df1') && isPathActive('dh1');
                const isStepActive = simulationStep === 1;
                const pathD = "M 340 205 L 552 205";
                return (
                  <>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                      strokeWidth={isClassic ? 4 : 2}
                      markerEnd={isClassic ? "url(#arrow-classic)" : active ? "url(#arrow-neon)" : "url(#arrow-neon-faded)"}
                      filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                      className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                    />
                    {/* Glowing packet animation */}
                    {!isClassic && active && isRunning && (
                      <circle r="5" fill="#f4be9b" filter="url(#neon-glow)">
                        <animateMotion dur="2.2s" repeatCount="indefinite" path={pathD} keyTimes="0;1" />
                      </circle>
                    )}
                  </>
                );
              })()}

              {/* 2. Connection: DataField2 -> Vertical Joint (Input - Upper branch arrow) */}
              {(() => {
                const active = isPathActive('df2') && isPathActive('dh2');
                const isStepActive = simulationStep === 2;
                const pathD = "M 340 485 L 442 485";
                return (
                  <>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                      strokeWidth={isClassic ? 4 : 2}
                      markerEnd={isClassic ? "url(#arrow-classic)" : active ? "url(#arrow-neon)" : "url(#arrow-neon-faded)"}
                      filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                      className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                    />
                  </>
                );
              })()}

              {/* 3. Connection: DataField3 -> Vertical Joint (Input - Lower branch arrow) */}
              {(() => {
                const active = isPathActive('df3') && isPathActive('dh2');
                const isStepActive = simulationStep === 2;
                const pathD = "M 340 765 L 442 765";
                return (
                  <>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                      strokeWidth={isClassic ? 4 : 2}
                      markerEnd={isClassic ? "url(#arrow-classic)" : active ? "url(#arrow-neon)" : "url(#arrow-neon-faded)"}
                      filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                      className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                    />
                  </>
                );
              })()}

              {/* 4. Connection: Vertical joining line */}
              {(() => {
                const active = (isPathActive('df2') || isPathActive('df3')) && isPathActive('dh2');
                const isStepActive = simulationStep === 2;
                const pathD = "M 450 485 L 450 765";
                return (
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                    strokeWidth={isClassic ? 4 : 2}
                    filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                    className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                  />
                );
              })()}

              {/* 5. Connection: Joint horizontal arrow to DataHub2 */}
              {(() => {
                const active = (isPathActive('df2') || isPathActive('df3')) && isPathActive('dh2');
                const isStepActive = simulationStep === 2;
                const pathD = "M 450 625 L 552 625";
                return (
                  <>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                      strokeWidth={isClassic ? 4 : 2}
                      markerEnd={isClassic ? "url(#arrow-classic)" : active ? "url(#arrow-neon)" : "url(#arrow-neon-faded)"}
                      filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                      className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                    />
                    {/* Glowing packet animation from df2 to dh2 */}
                    {!isClassic && isPathActive('df2') && isPathActive('dh2') && isRunning && (
                      <circle r="4.5" fill="#f4be9b" filter="url(#neon-glow)">
                        <animateMotion dur="2.4s" repeatCount="indefinite" path="M 340 485 L 450 485 L 450 625 L 552 625" />
                      </circle>
                    )}
                    {/* Glowing packet animation from df3 to dh2 */}
                    {!isClassic && isPathActive('df3') && isPathActive('dh2') && isRunning && (
                      <circle r="4.5" fill="#f4be9b" filter="url(#neon-glow)">
                        <animateMotion dur="2.4s" repeatCount="indefinite" path="M 340 765 L 450 765 L 450 625 L 552 625" />
                      </circle>
                    )}
                  </>
                );
              })()}

              {/* 6. Connection: DataHub1 -> DataHub2 (Input) */}
              {(() => {
                const active = isPathActive('dh1') && isPathActive('dh2');
                const isStepActive = simulationStep === 3;
                const pathD = "M 730 310 L 730 512";
                return (
                  <>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                      strokeWidth={isClassic ? 4 : 2}
                      markerEnd={isClassic ? "url(#arrow-classic)" : active ? "url(#arrow-neon)" : "url(#arrow-neon-faded)"}
                      filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                      className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                    />
                    {!isClassic && active && isRunning && (
                      <circle r="5" fill="#f4be9b" filter="url(#neon-glow)">
                        <animateMotion dur="1.8s" repeatCount="indefinite" path={pathD} />
                      </circle>
                    )}
                  </>
                );
              })()}

              {/* 7. Connection: DataHub2 -> PivotTable (Input) */}
              {(() => {
                const active = isPathActive('dh2') && isPathActive('pivot');
                const isStepActive = simulationStep === 4;
                const pathD = "M 730 730 L 730 932";
                return (
                  <>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                      strokeWidth={isClassic ? 4 : 2}
                      markerEnd={isClassic ? "url(#arrow-classic)" : active ? "url(#arrow-neon)" : "url(#arrow-neon-faded)"}
                      filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                      className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                    />
                    {!isClassic && active && isRunning && (
                      <circle r="5" fill="#f4be9b" filter="url(#neon-glow)">
                        <animateMotion dur="1.8s" repeatCount="indefinite" path={pathD} />
                      </circle>
                    )}
                  </>
                );
              })()}

              {/* 8. Connection: PivotTable -> Graph (Input - Right to Left) */}
              {(() => {
                const active = isPathActive('pivot') && isPathActive('graph');
                const isStepActive = simulationStep === 5;
                const pathD = "M 560 1045 L 408 1045";
                return (
                  <>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isClassic ? '#ef4444' : active ? (isStepActive ? '#22d3ee' : 'rgba(6,182,212,0.45)') : '#2a2a2a'}
                      strokeWidth={isClassic ? 4 : 2}
                      markerEnd={isClassic ? "url(#arrow-classic)" : active ? "url(#arrow-neon)" : "url(#arrow-neon-faded)"}
                      filter={!isClassic && active ? "url(#neon-glow)" : undefined}
                      className={`transition-all duration-500 ${!isClassic && active && isStepActive ? 'animated-flow-path' : ''}`}
                    />
                    {!isClassic && active && isRunning && (
                      <circle r="5" fill="#f4be9b" filter="url(#neon-glow)">
                        <animateMotion dur="1.4s" repeatCount="indefinite" path={pathD} />
                      </circle>
                    )}
                  </>
                );
              })()}
            </svg>

            {/* ─── LABEL BOXES OVERLAY ─── */}
            <div className="absolute inset-0 pointer-events-none z-20 font-mono text-[9px] font-bold">
              
              {/* Label: Sort Data (df1 -> dh1) */}
              {isPathActive('df1') && isPathActive('dh1') && (
                <div 
                  className="absolute px-1.5 py-0.5 border select-none transition-all duration-300 pointer-events-auto"
                  style={{
                    left: '410px',
                    top: '193px',
                    backgroundColor: isClassic ? '#ffff00' : 'rgba(234,179,8,0.15)',
                    borderColor: isClassic ? '#000000' : 'rgba(234,179,8,0.4)',
                    color: isClassic ? '#000000' : '#fbbf24',
                    borderWidth: isClassic ? '2px' : '1px',
                  }}
                >
                  Sort Data
                </div>
              )}

              {/* Label: Input (df2 -> joint) */}
              {isPathActive('df2') && isPathActive('dh2') && (
                <div 
                  className="absolute px-1.5 py-0.5 border select-none pointer-events-auto"
                  style={{
                    left: '375px',
                    top: '473px',
                    backgroundColor: isClassic ? '#ffff00' : 'rgba(234,179,8,0.15)',
                    borderColor: isClassic ? '#000000' : 'rgba(234,179,8,0.4)',
                    color: isClassic ? '#000000' : '#fbbf24',
                    borderWidth: isClassic ? '2px' : '1px',
                  }}
                >
                  Input
                </div>
              )}

              {/* Label: Input (df3 -> joint) */}
              {isPathActive('df3') && isPathActive('dh2') && (
                <div 
                  className="absolute px-1.5 py-0.5 border select-none pointer-events-auto"
                  style={{
                    left: '375px',
                    top: '753px',
                    backgroundColor: isClassic ? '#ffff00' : 'rgba(234,179,8,0.15)',
                    borderColor: isClassic ? '#000000' : 'rgba(234,179,8,0.4)',
                    color: isClassic ? '#000000' : '#fbbf24',
                    borderWidth: isClassic ? '2px' : '1px',
                  }}
                >
                  Input
                </div>
              )}

              {/* Label: Input (dh1 -> dh2) */}
              {isPathActive('dh1') && isPathActive('dh2') && (
                <div 
                  className="absolute px-1.5 py-0.5 border select-none pointer-events-auto"
                  style={{
                    left: '710px',
                    top: '403px',
                    backgroundColor: isClassic ? '#ffff00' : 'rgba(234,179,8,0.15)',
                    borderColor: isClassic ? '#000000' : 'rgba(234,179,8,0.4)',
                    color: isClassic ? '#000000' : '#fbbf24',
                    borderWidth: isClassic ? '2px' : '1px',
                  }}
                >
                  Input
                </div>
              )}

              {/* Label: Input (dh2 -> pivot) */}
              {isPathActive('dh2') && isPathActive('pivot') && (
                <div 
                  className="absolute px-1.5 py-0.5 border select-none pointer-events-auto"
                  style={{
                    left: '710px',
                    top: '823px',
                    backgroundColor: isClassic ? '#ffff00' : 'rgba(234,179,8,0.15)',
                    borderColor: isClassic ? '#000000' : 'rgba(234,179,8,0.4)',
                    color: isClassic ? '#000000' : '#fbbf24',
                    borderWidth: isClassic ? '2px' : '1px',
                  }}
                >
                  Input
                </div>
              )}

              {/* Label: Input (pivot -> graph) */}
              {isPathActive('pivot') && isPathActive('graph') && (
                <div 
                  className="absolute px-1.5 py-0.5 border select-none pointer-events-auto"
                  style={{
                    left: '460px',
                    top: '1033px',
                    backgroundColor: isClassic ? '#ffff00' : 'rgba(234,179,8,0.15)',
                    borderColor: isClassic ? '#000000' : 'rgba(234,179,8,0.4)',
                    color: isClassic ? '#000000' : '#fbbf24',
                    borderWidth: isClassic ? '2px' : '1px',
                  }}
                >
                  Input
                </div>
              )}

            </div>

            {/* ─── RENDERING NODES ─── */}
            {nodes.map((node) => {
              if (!node.visible) return null;

              // Compute node highlight classes based on simulation running stage
              const isGlowing = 
                (node.id === 'df1' && simulationStep === 1) ||
                ((node.id === 'df2' || node.id === 'df3') && simulationStep === 2) ||
                (node.id === 'dh1' && (simulationStep === 1 || simulationStep === 3)) ||
                (node.id === 'dh2' && (simulationStep === 2 || simulationStep === 3 || simulationStep === 4)) ||
                (node.id === 'pivot' && (simulationStep === 4 || simulationStep === 5)) ||
                (node.id === 'graph' && simulationStep === 5);

              // Stylings for Sleek Dark vs Classic Blueprint
              const nodeClass = isClassic
                ? 'absolute bg-white border-2 border-black classic-shadow-node rounded-none overflow-hidden transition-all duration-300'
                : `absolute bg-[#0f0f11]/85 backdrop-blur-md border rounded-lg transition-all duration-500 overflow-hidden ${
                    isGlowing 
                      ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] scale-[1.01]' 
                      : 'border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                  } neon-shadow-node`;

              const headerStyle = isClassic
                ? { backgroundColor: '#f0c2a2', borderBottom: '2px solid black' }
                : {
                    background: isGlowing 
                      ? 'linear-gradient(90deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.03) 100%)' 
                      : 'linear-gradient(90deg, rgba(244,190,155,0.08) 0%, rgba(255,255,255,0.01) 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  };

              const headerTextClass = isClassic 
                ? 'font-bold text-black text-xs' 
                : `font-bold font-mono text-[10px] tracking-wider uppercase ${isGlowing ? 'text-cyan-400' : 'text-[#f4be9b]'}`;

              const cellBorderClass = isClassic ? 'border border-black' : 'border-b border-white/5 text-white/70';

              return (
                <div
                  key={node.id}
                  className={nodeClass}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                    zIndex: activeSettingsNode === node.id ? 40 : 30,
                  }}
                >
                  {/* Window Title Bar */}
                  <div 
                    className="px-3 py-2 flex items-center justify-between transition-colors duration-500"
                    style={headerStyle}
                  >
                    <span className={headerTextClass}>
                      {node.title}
                    </span>
                    
                    {/* Window Controls */}
                    <div className="flex items-center gap-2">
                      {/* Settings Cog Icon (for nodes that have settings) */}
                      {node.type !== 'data-field' && (
                        <button
                          onClick={() => setActiveSettingsNode(activeSettingsNode === node.id ? null : node.id)}
                          className={`p-1 rounded transition-colors ${
                            isClassic 
                              ? 'text-black hover:bg-black/10' 
                              : activeSettingsNode === node.id 
                                ? 'text-cyan-400 bg-white/5' 
                                : 'text-dim hover:text-white hover:bg-white/5'
                          }`}
                          title="Cấu hình bộ xử lý"
                        >
                          <svg className={`w-3.5 h-3.5 ${activeSettingsNode === node.id ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      )}

                      {/* Close Red "X" Button */}
                      <button
                        onClick={() => toggleNodeVisibility(node.id)}
                        className={`w-4 h-4 text-center font-sans font-bold flex items-center justify-center text-[10px] leading-none transition-colors ${
                          isClassic
                            ? 'bg-[#ef4444] border-2 border-black text-white hover:bg-red-600'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white rounded-sm'
                        }`}
                        title="Đóng node (Cắt luồng xử lý)"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Window Body Context */}
                  <div className="relative p-2 font-mono text-[9px] w-full h-[calc(100%-29px)] overflow-y-auto">
                    
                    {/* Settings Dropdown Panel Overlay */}
                    {activeSettingsNode === node.id && (
                      <div className={`absolute inset-0 z-40 p-3 flex flex-col gap-2 ${
                        isClassic ? 'bg-white border-b-2 border-black' : 'bg-[#0f0f12]/95 text-white'
                      }`}>
                        <h4 className={`font-bold border-b pb-1 text-[10px] ${isClassic ? 'border-black text-black' : 'border-white/10 text-cyan-400'}`}>
                          ⚙️ CẤU HÌNH NODE DỮ LIỆU
                        </h4>
                        
                        {/* Custom Options based on Node ID */}
                        {node.id === 'dh1' && (
                          <div className="space-y-2 py-1">
                            <span className="text-dim">Hướng sắp xếp (Amount):</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setDh1SortDesc(true)}
                                className={`px-2 py-1 rounded text-[8px] font-bold ${
                                  dh1SortDesc 
                                    ? 'bg-cyan-500 text-black' 
                                    : 'bg-black/30 text-subtle border border-border'
                                }`}
                              >
                                GIẢM DẦN (DESC)
                              </button>
                              <button
                                onClick={() => setDh1SortDesc(false)}
                                className={`px-2 py-1 rounded text-[8px] font-bold ${
                                  !dh1SortDesc 
                                    ? 'bg-cyan-500 text-black' 
                                    : 'bg-black/30 text-subtle border border-border'
                                }`}
                              >
                                TĂNG DẦN (ASC)
                              </button>
                            </div>
                          </div>
                        )}

                        {node.id === 'dh2' && (
                          <div className="space-y-2 py-1">
                            <span className="text-dim">Gom nhóm (Group by):</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setDh2GroupField('Category')}
                                className={`px-2 py-1 rounded text-[8px] font-bold ${
                                  dh2GroupField === 'Category' 
                                    ? 'bg-cyan-500 text-black' 
                                    : 'bg-black/30 text-subtle border border-border'
                                }`}
                              >
                                PHÂN LOẠI (CATEGORY)
                              </button>
                              <button
                                onClick={() => setDh2GroupField('Source')}
                                className={`px-2 py-1 rounded text-[8px] font-bold ${
                                  dh2GroupField === 'Source' 
                                    ? 'bg-cyan-500 text-black' 
                                    : 'bg-black/30 text-subtle border border-border'
                                }`}
                              >
                                NGUỒN CẤP (SOURCE)
                              </button>
                            </div>
                          </div>
                        )}

                        {node.id === 'pivot' && (
                          <div className="space-y-2 py-1">
                            <span className="text-dim">Số liệu hiển thị (Metric):</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setPivotMetric('Revenue')}
                                className={`px-2 py-1 rounded text-[8px] font-bold ${
                                  pivotMetric === 'Revenue' 
                                    ? 'bg-cyan-500 text-black' 
                                    : 'bg-black/30 text-subtle border border-border'
                                }`}
                              >
                                DOANH THU (REVENUE)
                              </button>
                              <button
                                onClick={() => setPivotMetric('Efficiency')}
                                className={`px-2 py-1 rounded text-[8px] font-bold ${
                                  pivotMetric === 'Efficiency' 
                                    ? 'bg-cyan-500 text-black' 
                                    : 'bg-black/30 text-subtle border border-border'
                                }`}
                              >
                                HIỆU SUẤT (EFFICIENCY)
                              </button>
                            </div>
                          </div>
                        )}

                        {node.id === 'graph' && (
                          <div className="space-y-2 py-1">
                            <span className="text-dim">Loại biểu đồ (Chart View):</span>
                            <div className="flex gap-2">
                              {['pie', 'donut', 'bar'].map((type) => (
                                <button
                                  key={type}
                                  onClick={() => setGraphChartType(type as any)}
                                  className={`px-2.5 py-1 rounded text-[8px] font-bold uppercase ${
                                    graphChartType === type 
                                      ? 'bg-cyan-500 text-black' 
                                      : 'bg-black/30 text-subtle border border-border'
                                  }`}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => setActiveSettingsNode(null)}
                          className="mt-auto py-1 border border-border bg-cyan-950/20 text-cyan-400 hover:bg-cyan-950/50 rounded font-bold text-center"
                        >
                          XÁC NHẬN
                        </button>
                      </div>
                    )}

                    {/* Node Content Router */}
                    {/* Node 1: Data Field 1 (User Profiles Table) */}
                    {node.id === 'df1' && (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className={isClassic ? 'bg-[#38bdf8] text-black font-bold' : 'text-cyan-400 bg-cyan-950/20 border-b border-cyan-800/30'}>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>ID</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Name</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Role</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Score</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {df1Data.map((row) => (
                            <tr key={row.id} className={isClassic ? '' : 'hover:bg-white/5'}>
                              <td className={`p-1.5 ${cellBorderClass}`}>{row.id}</td>
                              <td className={`p-1.5 ${cellBorderClass} font-bold text-white/95`}>{row.name}</td>
                              <td className={`p-1.5 ${cellBorderClass}`}>{row.role}</td>
                              <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.score}</td>
                              <td className={`p-1.5 ${cellBorderClass}`}>
                                <span className={`px-1 py-0.25 rounded text-[8px] font-bold ${
                                  row.status === 'Active' 
                                    ? isClassic ? 'bg-green-300 text-black border border-black' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' 
                                    : row.status === 'Pending'
                                      ? 'bg-yellow-950/80 text-yellow-400 border border-yellow-800/40'
                                      : 'bg-red-950/80 text-red-400 border border-red-800/40'
                                }`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* Node 2: Data Field 2 (Transactions Table) */}
                    {node.id === 'df2' && (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className={isClassic ? 'bg-[#38bdf8] text-black font-bold' : 'text-cyan-400 bg-cyan-950/20 border-b border-cyan-800/30'}>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>ID</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Amount</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Category</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Date</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {df2Data.map((row) => (
                            <tr key={row.id} className={isClassic ? '' : 'hover:bg-white/5'}>
                              <td className={`p-1.5 ${cellBorderClass}`}>{row.id}</td>
                              <td className={`p-1.5 ${cellBorderClass} font-bold text-emerald-400`}>${row.amount}</td>
                              <td className={`p-1.5 ${cellBorderClass}`}>{row.category}</td>
                              <td className={`p-1.5 ${cellBorderClass}`}>{row.date}</td>
                              <td className={`p-1.5 ${cellBorderClass}`}>
                                <span className={`px-1 py-0.25 rounded text-[8px] ${
                                  row.status === 'Paid' 
                                    ? isClassic ? 'bg-green-300 border border-black' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' 
                                    : row.status === 'Pending'
                                      ? 'bg-yellow-950/80 text-yellow-400 border border-yellow-800/40'
                                      : 'bg-red-950/80 text-red-400 border border-red-800/40'
                                }`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* Node 3: Data Field 3 (Traffic Table) */}
                    {node.id === 'df3' && (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className={isClassic ? 'bg-[#38bdf8] text-black font-bold' : 'text-cyan-400 bg-cyan-950/20 border-b border-cyan-800/30'}>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Source</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Views</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Bounce</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Duration</th>
                            <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Conv</th>
                          </tr>
                        </thead>
                        <tbody>
                          {df3Data.map((row) => (
                            <tr key={row.source} className={isClassic ? '' : 'hover:bg-white/5'}>
                              <td className={`p-1.5 ${cellBorderClass} font-bold text-white/95`}>{row.source}</td>
                              <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.views}</td>
                              <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.bounce}</td>
                              <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.duration}</td>
                              <td className={`p-1.5 ${cellBorderClass} text-right text-emerald-400`}>{row.conv}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* Node 4: Data Hub 1 (Aggregated Data Table with yellow header style) */}
                    {node.id === 'dh1' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        {getDh1Data().length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full py-8 text-dim">
                            <span className="text-xl">⚠️</span>
                            <span>Mất kết nối đầu vào</span>
                            <span className="text-[8px] text-center mt-1">(Hãy khôi phục Data Field 1)</span>
                          </div>
                        ) : (
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className={isClassic ? 'bg-[#facc15] text-black font-bold' : 'text-yellow-400 bg-yellow-950/20 border-b border-yellow-800/30'}>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>ID</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Amount</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Category</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Date</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getDh1Data().map((row) => (
                                <tr key={row.id} className={isClassic ? '' : 'hover:bg-white/5'}>
                                  <td className={`p-1.5 ${cellBorderClass}`}>{row.id}</td>
                                  <td className={`p-1.5 ${cellBorderClass} font-bold text-yellow-400`}>${row.amount}</td>
                                  <td className={`p-1.5 ${cellBorderClass}`}>{row.category}</td>
                                  <td className={`p-1.5 ${cellBorderClass}`}>{row.date}</td>
                                  <td className={`p-1.5 ${cellBorderClass}`}>
                                    <span className="px-1 py-0.25 rounded text-[8px] bg-yellow-950/40 text-yellow-400 border border-yellow-800/20">
                                      {row.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {!isClassic && getDh1Data().length > 0 && (
                          <div className="flex items-center justify-between text-[8px] text-dim border-t border-white/5 pt-1.5 mt-1 select-none">
                            <span>⚡ Live Processor Active</span>
                            <span>Sorted: {dh1SortDesc ? 'High ➔ Low' : 'Low ➔ High'}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Node 5: Data Hub 2 (Aggregated streams with yellow header style) */}
                    {node.id === 'dh2' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        {getDh2Data().length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full py-8 text-dim">
                            <span className="text-xl">⚠️</span>
                            <span>Mất kết nối đầu vào</span>
                            <span className="text-[8px] text-center mt-1">(Nhấp mở Data Field 2 hoặc 3)</span>
                          </div>
                        ) : (
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className={isClassic ? 'bg-[#facc15] text-black font-bold' : 'text-yellow-400 bg-yellow-950/20 border-b border-yellow-800/30'}>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Metric</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Value</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Source</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Impact</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Trend</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getDh2Data().map((row) => (
                                <tr key={row.metric} className={isClassic ? '' : 'hover:bg-white/5'}>
                                  <td className={`p-1.5 ${cellBorderClass} font-bold text-white/95 truncate`}>{row.metric}</td>
                                  <td className={`p-1.5 ${cellBorderClass} text-yellow-400 font-bold`}>{row.value}</td>
                                  <td className={`p-1.5 ${cellBorderClass} text-dim truncate`}>{row.source}</td>
                                  <td className={`p-1.5 ${cellBorderClass}`}>{row.impact}</td>
                                  <td className={`p-1.5 ${cellBorderClass} text-emerald-400 text-right`}>{row.trend}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {!isClassic && getDh2Data().length > 0 && (
                          <div className="flex items-center justify-between text-[8px] text-dim border-t border-white/5 pt-1.5 mt-1 select-none">
                            <span>🔄 Flow Merger Online</span>
                            <span>Group: {dh2GroupField}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Node 6: Pivot Table (Green Left Column, Blue Header) */}
                    {node.id === 'pivot' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        {getPivotData().length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full py-8 text-dim">
                            <span className="text-xl">⚠️</span>
                            <span>Không có nguồn dữ liệu</span>
                          </div>
                        ) : (
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className={isClassic ? 'bg-[#38bdf8] text-black font-bold' : 'text-cyan-400 bg-cyan-950/20 border-b border-cyan-800/30'}>
                                <th className={`p-1.5 ${isClassic ? 'border border-black bg-white' : ''}`}>Group</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Col A</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Col B</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Col C</th>
                                <th className={`p-1.5 ${isClassic ? 'border border-black' : ''}`}>Col D</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getPivotData().map((row) => (
                                <tr key={row.group} className={isClassic ? '' : 'hover:bg-white/5'}>
                                  {/* Row Groups in Green */}
                                  <td className={`p-1.5 font-bold ${
                                    isClassic 
                                      ? 'bg-green-200 text-black border border-black' 
                                      : 'bg-emerald-950/20 text-emerald-400 border-r border-emerald-800/20'
                                  }`}>
                                    {row.group}
                                  </td>
                                  <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.col1}</td>
                                  <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.col2}</td>
                                  <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.col3}</td>
                                  <td className={`p-1.5 ${cellBorderClass} text-right`}>{row.col4}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {!isClassic && getPivotData().length > 0 && (
                          <div className="flex items-center justify-between text-[8px] text-dim border-t border-white/5 pt-1.5 mt-1 select-none">
                            <span>📊 Multidimensional Pivot</span>
                            <span>Metric: {pivotMetric}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Node 7: Graph Node (SVG dynamic chart) */}
                    {node.id === 'graph' && (
                      <div className="w-full h-full flex flex-col justify-between">
                        
                        <div className="flex-grow flex items-center justify-center py-1">
                          
                          {/* Checked if Pivot Table is supplying data */}
                          {getPivotData().length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-dim py-8">
                              <span className="text-xl">⚠️</span>
                              <span>Đang đợi luồng dữ liệu...</span>
                            </div>
                          ) : graphChartType === 'bar' ? (
                            /* Pure SVG Bar Chart View */
                            <svg width="280" height="150" viewBox="0 0 280 150" className="mt-2">
                              <g fill="none" stroke={isClassic ? '#000' : 'rgba(255,255,255,0.1)'} strokeWidth="1">
                                <line x1="35" y1="120" x2="270" y2="120" />
                                <line x1="35" y1="20" x2="35" y2="120" />
                              </g>
                              
                              {/* Draw Bars */}
                              {chartSlices.slice(0, 5).map((slice, idx) => {
                                const barWidth = 26;
                                const spacing = 16;
                                const barHeight = (slice.value / 25) * 90;
                                const x = 50 + idx * (barWidth + spacing);
                                const y = 120 - barHeight;
                                
                                return (
                                  <g key={slice.label}>
                                    <rect
                                      x={x}
                                      y={y}
                                      width={barWidth}
                                      height={barHeight}
                                      fill={isClassic ? slice.color : slice.neonColor}
                                      stroke={isClassic ? '#000' : 'rgba(255,255,255,0.1)'}
                                      strokeWidth={isClassic ? 2 : 1}
                                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                      onMouseEnter={() => setHoveredSlice(idx)}
                                      onMouseLeave={() => setHoveredSlice(null)}
                                    />
                                    <text
                                      x={x + barWidth / 2}
                                      y="135"
                                      textAnchor="middle"
                                      fill={isClassic ? '#000' : '#888'}
                                      fontSize="8"
                                    >
                                      {slice.label.substring(0, 4)}
                                    </text>
                                    <text
                                      x={x + barWidth / 2}
                                      y={y - 5}
                                      textAnchor="middle"
                                      fill={isClassic ? '#000' : '#fff'}
                                      fontWeight="bold"
                                      fontSize="7"
                                    >
                                      {slice.value}%
                                    </text>
                                  </g>
                                );
                              })}
                            </svg>
                          ) : (
                            /* Pure SVG Pie / Donut Chart View */
                            <div className="flex items-center gap-4 w-full justify-center">
                              <svg width="220" height="175" viewBox="0 0 340 270" className="shrink-0">
                                
                                {/* Label Text: "Linguistic" matching image.png exactly */}
                                <text 
                                  x="170" 
                                  y="35" 
                                  textAnchor="middle" 
                                  fontFamily="var(--font-syne), sans-serif"
                                  fontWeight="bold"
                                  fill={isClassic ? '#0000ff' : '#67e8f9'}
                                  fontSize="20"
                                >
                                  Linguistic
                                </text>

                                {/* Render Slices */}
                                {chartSlices.map((slice, idx) => {
                                  const percentage = slice.value;
                                  const angle = (percentage / 100) * 360;
                                  
                                  // Compute radial path coordinates
                                  const startAngle = cumulativeAngle;
                                  const endAngle = cumulativeAngle + angle;
                                  cumulativeAngle = endAngle;

                                  const radStart = ((startAngle - 90) * Math.PI) / 180;
                                  const radEnd = ((endAngle - 90) * Math.PI) / 180;

                                  const x1 = pieCenterX + pieRadius * Math.cos(radStart);
                                  const y1 = pieCenterY + pieRadius * Math.sin(radStart);
                                  const x2 = pieCenterX + pieRadius * Math.cos(radEnd);
                                  const y2 = pieCenterY + pieRadius * Math.sin(radEnd);

                                  const largeArc = angle > 180 ? 1 : 0;
                                  
                                  // Path for Slice
                                  const pathData = `
                                    M ${pieCenterX} ${pieCenterY}
                                    L ${x1} ${y1}
                                    A ${pieRadius} ${pieRadius} 0 ${largeArc} 1 ${x2} ${y2}
                                    Z
                                  `;

                                  // Label coordinates further out for lines
                                  const midAngle = startAngle + angle / 2;
                                  const radMid = ((midAngle - 90) * Math.PI) / 180;
                                  const labelRadius = pieRadius + 22;
                                  const lx = pieCenterX + labelRadius * Math.cos(radMid);
                                  const ly = pieCenterY + labelRadius * Math.sin(radMid);

                                  // Alignment anchors
                                  const textAnchor = lx > pieCenterX ? 'start' : 'end';

                                  // Slices Hover Glow state
                                  const isHovered = hoveredSlice === idx;

                                  return (
                                    <g key={slice.label}>
                                      {/* Pie Segment */}
                                      <path
                                        d={pathData}
                                        fill={isClassic ? slice.color : slice.neonColor}
                                        stroke={isClassic ? '#000000' : '#080808'}
                                        strokeWidth={isClassic ? 2 : isHovered ? 2.5 : 1}
                                        className="transition-all duration-300 cursor-pointer origin-center"
                                        style={{
                                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                          transformOrigin: `${pieCenterX}px ${pieCenterY}px`,
                                          filter: !isClassic && isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : undefined,
                                        }}
                                        onMouseEnter={() => setHoveredSlice(idx)}
                                        onMouseLeave={() => setHoveredSlice(null)}
                                      />

                                      {/* Small pointer lines to labels (Classic aesthetic or simple neon tags) */}
                                      <line
                                        x1={pieCenterX + (pieRadius - 5) * Math.cos(radMid)}
                                        y1={pieCenterY + (pieRadius - 5) * Math.sin(radMid)}
                                        x2={lx}
                                        y2={ly}
                                        stroke={isClassic ? '#000' : 'rgba(255,255,255,0.2)'}
                                        strokeWidth="0.8"
                                      />

                                      {/* Slices Labels */}
                                      <text
                                        x={lx > pieCenterX ? lx + 4 : lx - 4}
                                        y={ly + 3}
                                        textAnchor={textAnchor}
                                        fill={isClassic ? '#000' : isHovered ? '#fff' : '#888'}
                                        fontSize="9"
                                        fontWeight={isHovered ? 'bold' : 'normal'}
                                        fontFamily="var(--font-space-mono), monospace"
                                      >
                                        {slice.label}
                                      </text>

                                      <text
                                        x={lx > pieCenterX ? lx + 4 : lx - 4}
                                        y={ly + 11}
                                        textAnchor={textAnchor}
                                        fill={isClassic ? '#444' : isHovered ? '#67e8f9' : '#555'}
                                        fontSize="7.5"
                                        fontFamily="var(--font-space-mono), monospace"
                                      >
                                        {slice.value}%
                                      </text>
                                    </g>
                                  );
                                })}

                                {/* Inner Circle for Donut Chart style if toggled */}
                                {graphChartType === 'donut' && (
                                  <circle
                                    cx={pieCenterX}
                                    cy={pieCenterY}
                                    r={pieRadius - 22}
                                    fill={isClassic ? '#ffffff' : '#0f0f11'}
                                    stroke={isClassic ? '#000000' : 'rgba(255,255,255,0.1)'}
                                    strokeWidth={isClassic ? 2 : 1}
                                  />
                                )}
                              </svg>

                              {/* Hover Details Panel */}
                              <div className="flex flex-col gap-1 w-28 bg-black/35 p-2 rounded border border-white/5 shrink-0 text-[8px]">
                                <div className="text-dim text-[7px] uppercase tracking-wider">Chọn Phân Khúc</div>
                                {hoveredSlice !== null ? (
                                  <>
                                    <div className="font-bold text-white text-[10px] truncate">{chartSlices[hoveredSlice].label}</div>
                                    <div className="text-cyan-400 font-bold text-base mt-1">{chartSlices[hoveredSlice].value}%</div>
                                    <div className="text-[7.5px] text-dim mt-1 font-sans">Live aggregated stats</div>
                                  </>
                                ) : (
                                  <div className="text-dim text-[7.5px] py-4 leading-normal font-sans">Rê chuột lên cung biểu đồ để xem chi tiết.</div>
                                )}
                              </div>
                            </div>
                          )}

                        </div>

                        {!isClassic && getPivotData().length > 0 && (
                          <div className="flex items-center justify-between text-[8px] text-dim border-t border-white/5 pt-1.5 mt-1 select-none">
                            <span>📈 SVG Realtime Renderer</span>
                            <span>View: {graphChartType.toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
