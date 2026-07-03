"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,        // smoothness (lower = smoother, higher = snappier)
      smoothWheel: true,
      // Let elements marked data-lenis-prevent (e.g. inner scrollable
      // panels like .sih-desc) handle their own wheel/touch scroll instead
      // of Lenis hijacking it to drive the page.
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
    });
    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis is a singleton that survives client-side route changes, but pages
  // with pinned/sticky ScrollTrigger sections (Hero, PeopleAdvisory) mount
  // fresh triggers on every route. Without resetting scroll + re-measuring
  // those triggers against the new page's layout, you land wherever the old
  // route left the scroll position — which reads as a sticky section being
  // "stuck halfway". Snap to top, then refresh once the new page has painted.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });

    // Lenis caches the page's scroll limit and only recalculates it on a
    // native window "resize" event — never on SPA route/content changes.
    // Without an explicit resize() here, Lenis keeps the previous route's
    // (often shorter) scroll limit, which clamps how far the new page can
    // scroll. resize() must run before ScrollTrigger.refresh() so GSAP
    // re-measures against the corrected scroll height.
    const resync = () => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(resync);
    // Late safety net — async-mounted content (Three.js scenes/canvases via
    // dynamic import) can still be growing the page after the first paint.
    const timeout = setTimeout(resync, 400);

    // Pages that fetch content over the network (e.g. Training's course
    // list) can still be growing the DOM well past the 400ms safety net —
    // that leaves Lenis clamped to the pre-fetch (shorter) scroll height,
    // which reads as the page "stopping halfway" until a manual refresh.
    // Any such page can broadcast this event once its async content mounts.
    window.addEventListener("lenis-resync", resync);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener("lenis-resync", resync);
    };
  }, [pathname]);

  return <>{children}</>;
}
