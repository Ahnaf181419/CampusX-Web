import { useCarbonFootprint } from 'react-carbon-footprint';

export default function CarbonFootprintDisplay() {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div style={{
      position: 'fixed',
      bottom: 12,
      right: 12,
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #e2e8f0',
      padding: '10px 14px',
      borderRadius: '8px',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h4 style={{ margin: '0 0 4px', fontSize: '13px', color: '#1e293b' }}>Session Carbon Footprint</h4>
      <p style={{ margin: 0, fontSize: '12px', color: '#475569' }}>Data: <strong>{bytesTransferred || 0}</strong> bytes</p>
      <p style={{ margin: 0, fontSize: '12px', color: '#16a34a' }}>CO₂: <strong>{(gCO2 || 0).toFixed(3)}</strong> gCO₂eq</p>
    </div>
  );
}