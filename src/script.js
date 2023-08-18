import Lenis from '@studio-freight/lenis'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null

const
    mainImage = document.querySelector('.main-image'),
    heroTitle = document.querySelector('.hero-title'),
    colorOverlay = document.querySelector('.color-overlay'),
    blurOverlay = document.querySelector('.blur-overlay'),
    hexagon = document.querySelector('.hexagon'),
    colorTriggers = document.querySelectorAll('[data-color]'),
    lastSection = document.getElementById('last-section'),
    discoverShapes = document.querySelectorAll('.discover-shapes'),
    dynamicColorAnimation = () => {
        for (const [index, trigger] of colorTriggers.entries()) {
            const color = trigger.getAttribute('data-color'),
                prevColor = trigger.getAttribute('data-prev-color'),
                timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: trigger,
                        start: 'top 70%',
                        end: 'center center',
                        scrub: true
                    }
                })

            timeline
                .to(colorOverlay, {
                    backgroundColor: prevColor,
                    opacity: .8
                }).to(colorOverlay, {
                    backgroundColor: color,
                    opacity: .8
                })
        }

        ScrollTrigger.update()
    },
    startAnimation = () => {
        gsap.delayedCall(.1, smoothScrollInit)

        gsap.to(mainImage, {
            scale: 1,
            duration: 3
        })

        gsap.to(heroTitle, {
            opacity: 1,
            duration: 3,
            delay: .5
        })

        gsap.to(colorOverlay, {
            opacity: .3
        })

        gsap.to(hexagon, {
            x: 0,
            yPercent: -75,
            duration: 2.5,
            delay: .8,
            onComplete: () => {
                lenis.start()
                dynamicColorAnimation()
            }
        })

        gsap.to(hexagon, {
            xPercent: 100,
            scrollTrigger: {
                trigger: colorTriggers[0],
                start: 'top bottom',
                end: 'top center',
                scrub: true
            }
        })

        gsap.to(blurOverlay, {
            backdropFilter: 'blur(10px)',
            scrollTrigger: {
                trigger: colorTriggers[colorTriggers.length - 1],
                start: 'bottom bottom',
                end: '+=200px',
                scrub: true,
                once: false,
            }
        })

        gsap.to(mainImage, {
            scale: 1.1,
            scrollTrigger: {
                trigger: colorTriggers[colorTriggers.length - 1],
                start: 'top center',
                endTrigger: lastSection,
                end: 'bottom bottom',
                scrub: 2,
                once: false,
            }
        })

        ScrollTrigger.create({
            trigger: lastSection,
            start: 'top center',
            once: true,
            onEnter: () => gsap.to(discoverShapes, {
                opacity: 1,
                y: 0,
                stagger: .2,
                duration: .7
            })
        })
    },
    smoothScrollInit = () => {
        lenis = new Lenis({
            duration: 2,
            lerp: .1
        })
        lenis.scrollTo(0, {
            immediate: true
        })
        lenis.stop()

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.lagSmoothing(0)
    }


document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    startAnimation()
})