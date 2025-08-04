import React, { useState } from 'react'
import { Calculator } from "../components";
import UnitConverter from "../components/UnitConverter";
import backgroundImage from "../assets/IMG_2436.jpg";

const HomePage: React.FC = () => {
    const [isCalculatorMode, setIsCalculatorMode] = useState(true)

    const toggleMode = () => {
        setIsCalculatorMode(!isCalculatorMode)
    }

    return (
        <div
            className="w-full h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >
            {/* Toggle Button */}
            <div className="absolute top-6 right-6 z-10">
                <button
                    onClick={toggleMode}
                    className="bg-white/20 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/30 backdrop-saturate-150 transition-all duration-300 hover:bg-white/30 hover:scale-105"
                    style={{
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <div className="flex items-center space-x-2 text-white font-medium">
                        <span className="text-lg">
                            {isCalculatorMode ? '📐' : '🧮'}
                        </span>
                        <span className="text-sm">
                            {isCalculatorMode ? 'Chuyển đổi đơn vị' : 'Máy tính'}
                        </span>
                    </div>
                </button>
            </div>

            {/* Main Content */}
            <div className="transition-all duration-500 ease-in-out">
                {isCalculatorMode ? <Calculator /> : <UnitConverter />}
            </div>
        </div>
    );
}

export default HomePage;
