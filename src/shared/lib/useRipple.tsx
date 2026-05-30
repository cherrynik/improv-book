import { useRef, useState, type PointerEvent } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

// Material-style ripple. Spread `onPointerDown` onto a `relative overflow-hidden`
// element and render `ripples` inside it (behind the content). The ripple is
// sized to the element so the expand rate feels the same on any button.
export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setRipples((current) => [
      ...current,
      {
        id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        size: Math.max(rect.width, rect.height) * 2,
      },
    ]);
  };

  const rippleNodes = ripples.map((ripple) => (
    <span
      key={ripple.id}
      aria-hidden
      className="ripple"
      style={{
        left: ripple.x,
        top: ripple.y,
        width: ripple.size,
        height: ripple.size,
        marginLeft: -ripple.size / 2,
        marginTop: -ripple.size / 2,
      }}
      onAnimationEnd={() =>
        setRipples((current) => current.filter((item) => item.id !== ripple.id))
      }
    />
  ));

  return { onPointerDown, ripples: rippleNodes };
}
