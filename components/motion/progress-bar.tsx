'use client'

import styles from '@/styles/app/blog/id/page.module.css'
import { motion, useScroll } from 'framer-motion'

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return <div className={styles.progressBar}>
    <motion.div
      className="progress-bar"
      style={{scaleX: scrollYProgress}}
    />
  </div>;
}
