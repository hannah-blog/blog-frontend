'use client'

import { useEffect, useRef, useState } from 'react'
import ScrollReveal from '@/components/utils/scroll-reveal'

const ITEMS_PER_PAGE = 12

export default function InfiniteGrid({
  children,
  columns = 3,
}: {
  children: React.ReactNode[]
  columns?: number
}) {
  const [count, setCount] = useState(ITEMS_PER_PAGE)
  const [cols, setCols] = useState(1)
  const loaderRef = useRef<HTMLDivElement>(null)

  // Responsive column count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (columns === 2) {
        setCols(w >= 768 ? 2 : 1)
      } else {
        setCols(w >= 1024 ? 3 : w >= 768 ? 2 : 1)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [columns])

  // Infinite scroll
  useEffect(() => {
    const el = loaderRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount((prev) => prev + ITEMS_PER_PAGE)
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const visible = children.slice(0, count)

  // Distribute items row-first: 0→col0, 1→col1, 2→col2, 3→col0, ...
  const buckets: React.ReactNode[][] = Array.from({ length: cols }, () => [])
  visible.forEach((child, idx) => {
    buckets[idx % cols].push(
      <ScrollReveal key={idx} className="mb-6" delay={(idx % ITEMS_PER_PAGE) * 60}>
        {child}
      </ScrollReveal>
    )
  })

  return (
    <>
      <div className="flex gap-6">
        {buckets.map((bucket, colIdx) => (
          <div key={colIdx} className="flex-1 min-w-0">
            {bucket}
          </div>
        ))}
      </div>
      {count < children.length && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      )}
    </>
  )
}
