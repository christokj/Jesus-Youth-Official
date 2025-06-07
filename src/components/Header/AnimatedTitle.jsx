import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import "./Header.scss";

gsap.registerPlugin(SplitText);

const AnimatedTitle = () => {
    const textRef = useRef(null);
    const charsRef = useRef([]);
    const splitRef = useRef(null);
    const stateRef = useRef({
        weightInit: 600,
        weightTarget: 400,
        stretchInit: 150,
        stretchTarget: 80,
        weightDiff: 200,
        stretchDiff: 70,
        maxYScale: 2.5,
        elasticDropOff: 0.8,
        numChars: 0,
        isMouseDown: false,
        mouseInitialY: 0,
        mouseFinalY: 0,
        distY: 0,
        charIndexSelected: 0,
        charH: 0,
        dragYScale: 0,
    });

    useEffect(() => {
        if (!textRef.current) return;

        const style = getComputedStyle(document.body);
        const weightInit = parseInt(style.getPropertyValue("--fw")) || 600;
        const stretchInit = parseInt(style.getPropertyValue("--fs")) || 150;
        const weightTarget = 400;
        const stretchTarget = 80;
        const weightDiff = weightInit - weightTarget;
        const stretchDiff = stretchInit - stretchTarget;

        Object.assign(stateRef.current, {
            weightInit,
            weightTarget,
            stretchInit,
            stretchTarget,
            weightDiff,
            stretchDiff,
        });

        splitRef.current = new SplitText(textRef.current, {
            type: "chars",
            charsClass: "char",
        });

        charsRef.current = splitRef.current.chars;
        stateRef.current.numChars = charsRef.current.length;
        stateRef.current.charH = textRef.current.offsetHeight;

        animateText();

        const intervalId = setInterval(animateText, 10000);
        const resizeHandler = () => {
            stateRef.current.charH = textRef.current.offsetHeight;
        };

        window.addEventListener("resize", resizeHandler);
        initMouseEvents();

        return () => {
            splitRef.current?.revert();
            clearInterval(intervalId);
            window.removeEventListener("resize", resizeHandler);
            removeMouseEvents();
        };
    }, []);

    const animateText = () => {
        const chars = charsRef.current;
        const rect = chars?.[0]?.getBoundingClientRect();
        if (!rect) return;

        gsap.from(chars, {
            y: () => -1 * (rect.y + stateRef.current.charH + 500),
            fontWeight: stateRef.current.weightTarget,
            fontStretch: stateRef.current.stretchTarget,
            scaleY: 2,
            ease: "elastic(0.2, 0.1)",
            duration: 1.5,
            delay: 0.5,
            stagger: { each: 0.05, from: "random" },
        });
    };

    const initMouseEvents = () => {
        document.body.addEventListener("mouseup", onMouseUp);
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseleave", onMouseLeave);

        charsRef.current.forEach((char, index) => {
            char.addEventListener("mousedown", (e) => {
                stateRef.current.mouseInitialY = e.clientY;
                stateRef.current.charIndexSelected = index;
                stateRef.current.isMouseDown = true;
                document.body.classList.add("grab");
            });
        });
    };

    const removeMouseEvents = () => {
        document.body.removeEventListener("mouseup", onMouseUp);
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseleave", onMouseLeave);
        charsRef.current.forEach((char) =>
            char.removeEventListener("mousedown", () => { })
        );
    };

    const onMouseUp = () => {
        if (stateRef.current.isMouseDown) {
            stateRef.current.isMouseDown = false;
            resetText();
            document.body.classList.remove("grab");
        }
    };

    const onMouseMove = (e) => {
        if (!stateRef.current.isMouseDown) return;

        stateRef.current.mouseFinalY = e.clientY;
        const dist = stateRef.current.mouseInitialY - stateRef.current.mouseFinalY;
        const dragYScale = Math.max(-0.5, Math.min((dist / (stateRef.current.charH * 1.5)), 1.5));
        stateRef.current.dragYScale = dragYScale;

        gsap.to(charsRef.current, {
            y: (i) => (1 - Math.abs(i - stateRef.current.charIndexSelected) / 10) * dragYScale * -50,
            fontWeight: (i) => stateRef.current.weightInit - dragYScale * stateRef.current.weightDiff,
            fontStretch: (i) => stateRef.current.stretchInit - dragYScale * stateRef.current.stretchDiff,
            scaleY: (i) => Math.max(0.5, 1 + dragYScale),
            duration: 0.6,
            ease: "power4.out",
        });
    };

    const onMouseLeave = () => {
        if (stateRef.current.isMouseDown) {
            resetText();
            stateRef.current.isMouseDown = false;
            document.body.classList.remove("grab");
        }
    };

    const resetText = () => {
        gsap.to(charsRef.current, {
            y: 0,
            fontWeight: stateRef.current.weightInit,
            fontStretch: stateRef.current.stretchInit,
            scaleY: 1,
            ease: "elastic(0.35, 0.1)",
            duration: 1,
            stagger: {
                each: 0.02,
                from: stateRef.current.charIndexSelected,
            },
        });
    };

    return (
        <div className="stage ">
            <div className="content text-center sm:text-left">
                <h1 ref={textRef} className="sm:text-3xl text-md font-extrabold title">
                    Jesus Youth Chengaloor
                </h1>
            </div>
        </div>
    );
};

export default AnimatedTitle;
