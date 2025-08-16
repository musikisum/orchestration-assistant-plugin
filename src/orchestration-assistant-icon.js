import React from 'react';
import iconNs from '@ant-design/icons';

const Icon = iconNs.default || iconNs;

export function OrchestrationIconComponent() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 1200 1200">
      <g transform="translate(6.766 29.882)">
        <rect
          width={357.025}
          height={210.468}
          x={389.185}
          y={565.278}
          rx={18.528}
          ry={18.528}
          style={{
            fill: '#666',
            fillOpacity: 1,
            strokeWidth: 1.88976,
          }}
          />
        <rect
          width={36.364}
          height={218.182}
          x={550.556}
          y={763.625}
          rx={18.528}
          ry={18.528}
          style={{
            fill: '#666',
            fillOpacity: 1,
            stroke: '#666',
            strokeWidth: 3.39,
            strokeDasharray: 'none',
          }}
          />
        <ellipse
          cx={696.254}
          cy={197.789}
          rx={116.253}
          ry={82.094}
          style={{
            fill: '#666',
            fillOpacity: 1,
            stroke: '#666',
            strokeWidth: 3.39,
            strokeDasharray: 'none',
          }}
          />
        <ellipse
          cx={407.439}
          cy={194.789}
          rx={116.253}
          ry={82.094}
          style={{
            fill: '#666',
            fillOpacity: 1,
            stroke: '#666',
            strokeWidth: 3.39,
            strokeDasharray: 'none',
          }}
          />
        <ellipse
          cx={182.948}
          cy={393.789}
          rx={116.253}
          ry={82.094}
          style={{
            fill: '#666',
            fillOpacity: 1,
            stroke: '#666',
            strokeWidth: 3.39,
            strokeDasharray: 'none',
          }}
          />
        <ellipse
          cx={925.948}
          cy={399.789}
          rx={116.253}
          ry={82.094}
          style={{
            fill: '#666',
            fillOpacity: 1,
            stroke: '#666',
            strokeWidth: 3.39,
            strokeDasharray: 'none',
          }}
          />
      </g>
    </svg>
  );
}

function IconComponent() {
  return (
    <Icon component={OrchestrationIconComponent} />
  );
}

export default IconComponent;
