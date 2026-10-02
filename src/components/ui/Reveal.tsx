"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; once?: boolean };

export default function Reveal({ delay = 0, y = 40, once = true, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
