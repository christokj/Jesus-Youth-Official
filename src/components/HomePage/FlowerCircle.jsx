import React from "react";

const FlowerCircle = () => {
    const totalLeaves = 50;
    const radius = 160; // Distance from center
    const center = 200; // Half of container size (400x400)
    const dummyIcon = "https://randomuser.me/api/portraits/thumb/men/1.jpg"; // Change this to your icons

    const leaves = Array.from({ length: totalLeaves }).map((_, i) => {
        const angle = (360 / totalLeaves) * i;
        const x = center + radius * Math.cos((angle * Math.PI) / 180) - 20;
        const y = center + radius * Math.sin((angle * Math.PI) / 180) - 20;
        return (
            <img
                key={i}
                src={dummyIcon}
                alt={`User ${i}`}
                className="w-10 h-10 rounded-full absolute"
                style={{ top: y, left: x }}
            />
        );
    });

    return (
        <div className="relative w-[400px] h-[400px] mx-auto my-10">
            {/* Center Circle */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold shadow-lg">
                You
            </div>
            {/* Leaves */}
            {leaves}
        </div>
    );
};

export default FlowerCircle;
