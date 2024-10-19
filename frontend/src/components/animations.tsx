export const floatUp = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1, // duration in seconds
    },
  },
};

export const floatRight = {
  hidden: { x: 200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1, // duration in seconds
    },
  },
};

export const floatLeft = {
  hidden: { x: -200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1, // duration in seconds
    },
  },
};
