const colors = {
  dark: {
    primary: "#141118",
    secondary: "#1e1f24",
    accent: "#00bcd7",
    text: "#dfdcef",
    focus: "#4a4558",
  },

  light: {
    primary: "#fef7fe",
    secondary: "#f3edf7",
    accent: "#00bcd7",
    text: "#181025",
    focus: "#e9dff7",
  },

  indicator: {
    green: "#a6ce39",
    yellow: "#ffed01",
    orange: "#feb600",
    deepOrange: "#bb3a01",
    red: "#990910",
  },
};

type IndicatorColorKey = keyof typeof colors.indicator;
type IndicatorColor = (typeof colors.indicator)[IndicatorColorKey];

export { colors, IndicatorColor };
