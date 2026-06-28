'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideUp';
  splitBy?: 'characters' | 'words';
}

export default function SplitText({ text, className = '', delay = 0, animationType = 'fadeUp', splitBy = 'words' }: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const items = splitBy === 'characters' ? text.split('') : text.split(' ');
  
  const animations = {
    fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slideUp: { hidden: { opacity: 0, y: 80, rotateX: 40 }, visible: { opacity: 1, y: 0, rotateX: 0 } },
  };
  
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={animations[animationType]}
          transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.215, 0.61, 0.355, 1] }}
          className="inline-block"
          style={{ marginRight: splitBy === 'words' ? '0.3em' : undefined }}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </span>
  );
}
