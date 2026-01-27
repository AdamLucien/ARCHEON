import type { Easing, Variants } from "framer-motion";

const ease: Easing = [0.33, 1, 0.68, 1];

export const createFadeVariant = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? 0 : 0.6,
      ease,
    },
  },
});

export const createMenuVariant = (reduceMotion: boolean): Variants => ({
  hidden: reduceMotion ? { opacity: 1 } : { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: reduceMotion ? 0 : 0.55,
      ease,
    },
  },
});

export const createProgressVariant = (reduceMotion: boolean): Variants => ({
  visible: (value: number) => ({
    scaleX: value,
    transition: {
      duration: reduceMotion ? 0 : 0.4,
      ease,
    },
  }),
});
