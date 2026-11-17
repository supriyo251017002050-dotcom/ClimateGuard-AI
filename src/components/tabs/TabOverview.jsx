import React from 'react';
import { AlertTriangle, Activity, Target, Zap, FileText, List, Map } from 'lucide-react';
import CesiumMapViewer from '../CesiumMapViewer';

export default function TabOverview({ location }) {
  const { name, riskScore, keyRiskFactors, vulnerabilityIndex, exposureLevel, hazardIntensity } = location;

  return (
    <div className="flex flex-col gap-space-xl max-w-7xl mx-auto w-full stagger-in">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-grid">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] h-full">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Risk Score
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                Composite Risk
              </span>
            </div>
            <span className="p-1.5 rounded-lg bg-error-container text-on-error-container shrink-0">
              <AlertTriangle className="w-[18px] h-[18px]" />
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display text-headline-lg text-on-surface font-bold">
                {riskScore}
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                / 100
              </span>
            </div>
            <span className="font-badge-mono text-badge-mono text-error font-bold px-2 py-0.5 rounded-full bg-error-container">
              CRITICAL
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] h-full">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Vulnerability Index
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                Severity Metric
              </span>
            </div>
            <span className="p-1.5 rounded-lg bg-surface-container text-secondary shrink-0">
              <Activity className="w-[18px] h-[18px]" />
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display text-headline-lg text-on-surface font-bold">
                {vulnerabilityIndex || '0.74'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Index
              </span>
            </div>
            <span className="font-badge-mono text-badge-mono text-secondary px-2 py-0.5 rounded-full bg-secondary-container/50 font-bold">
              SEVERE
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] h-full">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Exposure Level
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                Asset Exposure
              </span>
            </div>
            <span className="p-1.5 rounded-lg bg-surface-container-highest text-primary shrink-0">
              <Target className="w-[18px] h-[18px]" />
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display text-headline-lg text-on-surface font-bold">
                {exposureLevel || '92%'}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Coverage
              </span>
            </div>
            <span className="font-badge-mono text-badge-mono text-primary bg-primary-fixed/60 px-2 py-0.5 rounded-full font-bold">
              MAXIMUM
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px] h-full">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Hazard Intensity
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                Event Severity
              </span>
            </div>
            <span className="p-1.5 rounded-lg bg-error-container/40 text-error shrink-0">
              <Zap className="w-[18px] h-[18px]" />
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display text-headline-lg text-error font-bold">
                {hazardIntensity || '4.8'}
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                / 5.0
              </span>
            </div>
            <span className="font-badge-mono text-badge-mono text-error font-bold px-2 py-0.5 rounded-full bg-error-container">
              EXTREME
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* Left Column: Summary & Factors */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
              <FileText className="text-primary w-5 h-5" />
              Executive Summary
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Current conditions in {name} indicate a critical escalation in systemic risk due to the convergence of severe meteorological anomalies and existing infrastructural vulnerabilities. Predictive models suggest a high probability of threshold breach if mitigating interventions are not immediately deployed.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex-1 flex flex-col gap-space-md">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-2">
              <List className="text-primary w-5 h-5" />
              Key Risk Factors
            </h3>
            <div className="flex flex-col gap-space-sm">
              {(keyRiskFactors || []).map((factor, idx) => {
                const colors = ['bg-error', 'bg-secondary', 'bg-primary'];
                const color = colors[idx % colors.length];
                
                return (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg transition-colors hover:bg-surface-container group">
                    <span className={`w-1.5 h-1.5 mt-2 shrink-0 rounded-full ${color}`} />
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface">
                        {factor}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Identified structural vulnerability contributing to overall systemic risk in the region.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Map/Chart Placeholder */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm flex flex-col min-h-[400px]">
          <div className="p-space-md flex justify-between items-center bg-surface-container-lowest rounded-t-xl z-10 border-b border-outline-variant/20">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center gap-2">
              <Map className="text-primary w-5 h-5" />
              Risk Distribution Map
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-primary text-on-primary font-badge-mono text-badge-mono font-semibold rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                LIVE
              </button>
              <button className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-badge-mono text-badge-mono font-semibold rounded-lg transition-colors">
                TREND
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative bg-[#e5e7eb] rounded-b-xl overflow-hidden flex items-center justify-center">
            {/* Dynamic Map Background */}
            <CesiumMapViewer 
              lat={location.coordinates?.lat || 22.5726} 
              lng={location.coordinates?.lng || 88.3639} 
              name={location.name} 
              height={15000} 
            />
            
            {/* Gradient Overlay (Dark at bottom) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-gray-700/90 via-gray-700/30 to-transparent pointer-events-none" />
            
            {/* Bottom Bar UI */}
            <div className="absolute bottom-0 w-full p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="text-error w-5 h-5" strokeWidth={2.5} />
                <span className="text-white font-bold tracking-wide drop-shadow-md">
                  Live SAR Satellite Feed (Sentinel-1)
                </span>
              </div>
              <div className="px-3 py-1.5 bg-gray-800/90 text-white font-badge-mono text-badge-mono font-bold rounded-md shadow-sm border border-gray-600/50 uppercase tracking-widest text-[11px]">
                RES: 10M
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
