import { useEffect, useRef, useState } from "react";

export function useStickyState<T extends Element = HTMLDivElement>() {
  const sentinelRef = useRef<T | null>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsStuck(!entry.isIntersecting);
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { sentinelRef, isStuck };
}
