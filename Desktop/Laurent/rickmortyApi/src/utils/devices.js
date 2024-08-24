const screenSize = {
  phone: "767px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};

export const devices = {
  phone: `(max-width: ${screenSize.phone})`,
  tablet: `(min-width: ${screenSize.tablet})`,
  laptop: `(min-width: ${screenSize.laptop})`,
  desktop: `(min-width: ${screenSize.desktop})`,
};
