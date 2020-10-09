import { VictoryTheme } from 'victory';

const fontFamily = `
  "Open Sans", Courier, monospace
`;

const Theme = {
  ...VictoryTheme.material,
  axis: {
    ...VictoryTheme.material.axis,
    style: {
      ...VictoryTheme.material.axis?.style,
      tickLabels: {
        ...VictoryTheme.material.axis?.style?.tickLabels,
        fontFamily,
        fontSize: 5,
        fill: 'hsla(0, 0%, 0%, 0.8)',
      },
      axis: {
        ...VictoryTheme.material.axis?.style?.axis,
        stroke: 'hsla(0, 0%, 0%, 0.8)',
      },
      grid: {
        ...VictoryTheme.material.axis?.style?.grid,
        stroke: 'hsla(0, 0%, 0%, 0.12)',
      },
    },
  },
  legend: {
    ...VictoryTheme.material.legend,
    style: {
      ...VictoryTheme.material.legend?.style,
      labels: {
        ...VictoryTheme.material.legend?.style?.labels,
        fontFamily,
        fontSize: 5,
      },
    },
  },
  line: {
    ...VictoryTheme.material.line,
    style: {
      ...VictoryTheme.material.line?.style,
      data: {
        ...VictoryTheme.material.line?.style?.data,
        stroke: 'hsla(0, 0%, 0%, 0.2)',
      },
    },
  },
};

export default Theme;
