'use client';

import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

export default function ClientMotionDiv(props: ComponentProps<typeof motion.div>) {
  return <motion.div {...props} />;
}
