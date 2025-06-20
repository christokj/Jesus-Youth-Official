// RotatingText.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RotatingText.css";

gsap.registerPlugin(ScrollTrigger);

const RotatingText = () => {
    const stageRef = useRef(null);
    const tubeRef = useRef(null);
    const tubeInnerRef = useRef(null);

    useEffect(() => {
        const stage = stageRef.current;
        const tubeInner = tubeInnerRef.current;
        const clone = tubeInner.querySelector(".rotating-line");

        if (!clone) return;

        const numLines = 10;
        const fontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fontSize") || "20");
        const angle = 360 / numLines;
        let radius = 0;
        let origin = 0;

        const set3D = () => {
            let width = window.innerWidth;
            let fontSizePx = (width / 100) * fontSize;
            radius = (fontSizePx / 2) / Math.sin((180 / numLines) * (Math.PI / 180));
            origin = `50% 50% -${radius}px`;
        };

        const cloneNode = () => {
            for (let i = 0; i < numLines - 1; i++) {
                let newClone = clone.cloneNode(true);
                newClone.classList.add(`line--${i + 2}`);
                tubeInner.appendChild(newClone);
            }
            clone.classList.add("line--1");
        };

        const positionTxt = () => {
            gsap.set(tubeInner.querySelectorAll(".rotating-line"), {
                rotationX: (index) => -angle * (index - 1),
                z: radius,
                transformOrigin: origin,
            });
        };

        const setProps = (targets) => {
            targets.forEach((target) => {
                let paramSet = gsap.quickSetter(target, "css");
                let degrees = gsap.getProperty(target, "rotateX");
                let radians = degrees * (Math.PI / 180);
                let conversion = Math.abs(Math.cos(radians) / 2 + 0.5);
                let fontW = 200 + 700 * conversion;
                let fontS = `${100 + 700 * conversion}%`;
                paramSet({
                    opacity: conversion + 0.1,
                    fontWeight: fontW,
                    fontStretch: fontS,
                });
            });
        };

        const scrollRotate = () => {
            gsap.to(tubeInner.querySelectorAll(".rotating-line"), {
                scrollTrigger: {
                    trigger: stage,
                    scrub: 1,
                    start: "top top",
                },
                rotateX: "+=1080",
                onUpdate: function () {
                    setProps(this.targets());
                },
            });

            gsap.to(tubeRef.current, {
                scrollTrigger: {
                    trigger: stage,
                    scrub: 1,
                    start: "top top",
                },
                perspective: "1vw",
                ease: "expo.out",
            });
        };

        const init = () => {
            cloneNode();
            set3D();
            window.onresize = () => {
                set3D();
                positionTxt();
            };
            positionTxt();
            setProps(Array.from(tubeInner.querySelectorAll(".rotating-line")));
            scrollRotate();
            gsap.to(stage, { autoAlpha: 1, duration: 2, delay: 2 });
        };

        init();
    }, []);

    return (
        <div className="rotating-stage " ref={stageRef}>
            <div className="rotating-tube" ref={tubeRef}>
                <div className="rotating-tube__inner" ref={tubeInnerRef}>
                    <h1 className="rotating-line">Jesus Youth Chengaloor</h1>
                </div>
            </div>
        </div>
    );
};

export default RotatingText;
