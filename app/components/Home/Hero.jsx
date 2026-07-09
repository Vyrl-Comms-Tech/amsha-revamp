"use client";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import TextAnimation from "../layout/TextAnimation";
import "../../styles/Hero.css";
import { GlowDot } from "../layout/svg";
import Link from "next/link";

const DOTS = [
  { top: "22%", left: "33%" },
  { top: "34%", left: "38%" },
  { top: "68%", left: "34%" },
  { top: "20%", left: "44%" },
  { top: "55%", left: "38%" },
  { top: "82%", left: "46%" },
  { top: "25%", left: "62%" },
  { top: "48%", left: "74%" },
  { top: "75%", left: "68%" },
  { top: "40%", left: "64%" },
];

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Scroll progress drives the 3D model's rotation every frame inside Scene's
  // useFrame — kept in refs (not state) so scroll ticks never trigger a React
  // re-render. Re-rendering on every scroll pixel was the source of the
  // jitter: rotation updates were landing on React's commit schedule instead
  // of the render loop's frame schedule, so they could lag or double up
  // relative to the actual rAF tick.
  const progressRef = useRef(0);
  const progress2Ref = useRef(0);
  // Mouse-parallax + idle sway should stop once the model reaches the
  // footer (it should sit still there) and resume if the user scrolls back
  // up past it. Read fresh every frame by Scene — see enableMouseIdleRef.
  const mouseIdleRef = useRef(true);
  const canvasWrapperRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvasEl = canvasWrapperRef.current;
    const glowEl = glowRef.current;

    // Glow rotation: -26.939deg → +26.939deg across Hero(1vh) + Hero2(3vh)
    gsap.set(glowEl, { rotation: -26.939 });
    const glowTween = gsap.to(glowEl, {
      rotation: 26.939,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        scrub: 1.2,
      },
    });

    // Glow fade-out: disappears as Hero3 enters (first 60vh of its scroll budget)
    const hero3El = document.querySelector(".hero3-wrapper");
    const glowFadeTween = hero3El
      ? gsap.to(glowEl, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero3El,
            start: "top bottom",
            end: `top 40%`,
            scrub: 0.6,
          },
        })
      : null;

    // Hero(100vh) + Hero2(300vh) + Hero3(400vh) = 800vh = 8 × viewport height
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: `+=${window.innerHeight * 8}`,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    // Rotation: Facts → Footer (0→1)
    const factsEl = document.querySelector(".facts-section");
    const footerEl = document.querySelector(".facts-wrapper");
    let trigger2 = null;
    let mouseIdleTrigger = null;
    let positionTween = null;
    let mobileHero2Tween = null;
    let mobileFooterTween = null;

    if (factsEl && footerEl) {
      trigger2 = ScrollTrigger.create({
        trigger: factsEl,
        start: "top bottom",
        endTrigger: footerEl,
        end: "bottom bottom",
        onUpdate: (self) => {
          progress2Ref.current = self.progress;
        },
      });

      // Freeze mouse-parallax/idle sway once the model reaches the footer,
      // regardless of which width branch below is handling its position —
      // independent of those so it applies the same way at every breakpoint.
      mouseIdleTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: "top 75%",
        onEnter: () => {
          mouseIdleRef.current = false;
        },
        onLeaveBack: () => {
          mouseIdleRef.current = true;
        },
      });

      if (window.innerWidth > 1100) {
        // Desktop: canvas slides from center (50%) → right column (75%) on footer entry.
        // Binary toggle (not scrub) — scrub lags behind scroll position, and that lag
        // compounds with Lenis's own smoothing, so the slide could visually never
        // catch up to the true 75% mark. A fixed-duration tween triggered by crossing
        // the line always lands exactly on 75%, matching FooterModel's static position.
        // Threshold matches Footer.css's own @media(max-width:1100px) breakpoint,
        // where .footer-right (the column reserving space for the model) gets
        // display:none and .footer-left's text expands to fill the full width —
        // sliding to 75% below that width lands the model directly on that text.
        positionTween = ScrollTrigger.create({
          trigger: footerEl,
          start: "top 75%",
          onEnter: () =>
            gsap.to(canvasEl, {
              left: "65%",
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(canvasEl, {
              left: "44%",
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            }),
        });
      } else if (window.innerWidth > 575) {
        // Tablet/narrow-desktop: footer-right is hidden at this width (no room for
        // the model), so fade it out instead of sliding it onto the now-full-width
        // footer text. Fades back in if scrolling back up past the footer.
        positionTween = ScrollTrigger.create({
          trigger: footerEl,
          start: "top 55%",
          onEnter: () =>
            gsap.to(canvasEl, { autoAlpha: 0, duration: 0.4, overwrite: true }),
          onLeaveBack: () =>
            gsap.to(canvasEl, { autoAlpha: 1, duration: 0.4, overwrite: true }),
        });
      } else {
        // Mobile: canvas starts at top:40% (model at bottom, behind Hero content).
        // Animate top as each section enters so the model repositions:
        //   Hero2 / Hero3  → top: 20%  (model centered: 20% + 30vh = ~50%)
        //   Footer         → top: 45%  (model deep at bottom: 45% + 30vh = ~75%)
        const hero2El = document.querySelector(".hero2-wrapper");

        if (hero2El) {
          // Model moves from bottom (Hero) to center (Hero2/Hero3) as Hero2 scrolls in
          mobileHero2Tween = gsap.to(canvasEl, {
            top: "20%",
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: hero2El,
              start: "top 80%", // hero2 is 80% into viewport
              end: "top 10%", // hero2 almost fully entered
              scrub: 0.5,
            },
          });
        }

        // Model moves from center (Hero2/Hero3) to deep bottom (Footer),
        // drifting from centered (left:50%, the CSS default) toward the
        // right side so it lands on the right in the footer instead of
        // staying dead-center like every earlier section.
        mobileFooterTween = gsap.to(canvasEl, {
          top: "45%",
          left: "75%",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: footerEl,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
            onLeave: () => gsap.set(canvasEl, { top: "45%", left: "70%" }),
          },
        });
      }
    }

    return () => {
      glowFadeTween?.scrollTrigger?.kill();
      glowFadeTween?.kill();
      glowTween.scrollTrigger?.kill();
      glowTween.kill();
      trigger.kill();
      trigger2?.kill();
      mouseIdleTrigger?.kill();
      positionTween?.kill();
      mobileHero2Tween?.scrollTrigger?.kill();
      mobileFooterTween?.scrollTrigger?.kill();
      if (canvasEl) {
        gsap.set(canvasEl, { clearProps: "left,top,opacity,visibility" });
      }
    };
  }, []);

  return (
    <main className="main">
      <section className="hero-section">
        {/* animated glow background */}
        <div ref={glowRef} className="hero-glow" />

        {/* decorative scatter dots */}
        {DOTS.map((pos, i) => (
          <GlowDot
            key={i}
            delay={+(i * 0.31).toFixed(2)}
            style={{
              position: "absolute",
              zIndex: 6,
              pointerEvents: "none",
              ...pos,
            }}
          />
        ))}

        {/* left col */}
        <div className="hero-left">
          <TextAnimation animateOnScroll={true} delay={0.5}>
            <span className="hero-badge">
              &#8226; &nbsp; For those who want more from their business
            </span>
          </TextAnimation>
          <TextAnimation animateOnScroll={false} delay={0.7}>
            <h1 className="hero-heading">
              Empowering People Elevating Businesses
            </h1>
          </TextAnimation>
        </div>

        {/* center — transparent spacer, fixed canvas sits here */}
        <div className="hero-center" />

        {/* right col */}
        <div className="hero-right">
          <TextAnimation animateOnScroll={false} delay={0.6}>
            <p className="hero-desc">                          
              People-centred strategies designed to strengthen leadership,
              elevate workplace performance, and drive sustainable business
              growth.
            </p>
          </TextAnimation>
          <button className="hero-cta btn-4">
            <span>
              <Link href="/contact-us">Contact us</Link>
            </span>
          </button>
        </div>

        {/* fixed canvas — outside grid flow so it doesn't shift columns */}
        <div ref={canvasWrapperRef} className="home-canvas-wrapper">
          <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
            <Suspense fallback={null}>
              <Scene
                progressRef={progressRef}
                progress2Ref={progress2Ref}
                enableMouseIdleRef={mouseIdleRef}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </main>
  );
};

export default Hero;
