import { useState, useRef, useEffect, useCallback } from "react"

type useElementOnScreenProps = {
  root?: HTMLDivElement | null
  rootMargin?: string
  threshold?: number
}

const useElementOnScreen = ({
  root = null,
  rootMargin = "0px",
  threshold = 1.0,
}: useElementOnScreenProps) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const [isIntersecting, setIntersecting] = useState(false)
  const [targetRef, setTargetRef] = useState<null | HTMLDivElement>(null)
  
  const handleObserve = ([entry]: IntersectionObserverEntry[]) => {
    setIntersecting(entry.isIntersecting)
  }

  useEffect(() => {
    if (targetRef) {
      observer.current = new IntersectionObserver(handleObserve, {
        root,
        rootMargin,
        threshold,
      })
      observer.current.observe(targetRef)
    }

    return () => {
      if (observer.current && targetRef) {
        observer.current.unobserve(targetRef)
      }
    }
  }, [root, rootMargin, threshold, targetRef])

  const containerRef = useCallback((node: HTMLDivElement) => {
    setTargetRef(node)
    setIntersecting(false)
  }, [])

  return { containerRef, isIntersecting }
}

export default useElementOnScreen
