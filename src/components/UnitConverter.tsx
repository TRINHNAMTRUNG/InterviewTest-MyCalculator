import React, { useState } from 'react'
import Button from './Button'
import { formatNumberWithCommas } from '../utils/FormatNumberWithCommas'

interface UnitConverterState {
    activeCategory: string
    inputValue: string
    outputValue: string
    fromUnit: string
    toUnit: string
}

interface UnitCategory {
    name: string
    icon: string
    units: {
        [key: string]: {
            name: string
            factor: number
        }
    }
}

const UnitConverter: React.FC = () => {
    const [state, setState] = useState<UnitConverterState>({
        activeCategory: 'area',
        inputValue: '',
        outputValue: '',
        fromUnit: 'acre',
        toUnit: 'hectare'
    })

    const categories: { [key: string]: UnitCategory } = {
        area: {
            name: 'Diện tích',
            icon: '📐',
            units: {
                acre: { name: 'ac', factor: 4046.8564224 },
                hectare: { name: 'ha', factor: 10000 },
                sqmeter: { name: 'm²', factor: 1 },
                sqkilometer: { name: 'km²', factor: 1000000 },
                sqfoot: { name: 'ft²', factor: 0.092903 },
                sqyard: { name: 'yd²', factor: 0.836127 }
            }
        },
        length: {
            name: 'Độ dài',
            icon: '📏',
            units: {
                meter: { name: 'm', factor: 1 },
                kilometer: { name: 'km', factor: 1000 },
                centimeter: { name: 'cm', factor: 0.01 },
                millimeter: { name: 'mm', factor: 0.001 },
                inch: { name: 'in', factor: 0.0254 },
                foot: { name: 'ft', factor: 0.3048 },
                yard: { name: 'yd', factor: 0.9144 },
                mile: { name: 'mi', factor: 1609.344 }
            }
        },
        weight: {
            name: 'Khối lượng',
            icon: '⚖️',
            units: {
                gram: { name: 'g', factor: 1 },
                kilogram: { name: 'kg', factor: 1000 },
                pound: { name: 'lb', factor: 453.592 },
                ounce: { name: 'oz', factor: 28.3495 },
                ton: { name: 't', factor: 1000000 }
            }
        },
        temperature: {
            name: 'Nhiệt độ',
            icon: '🌡️',
            units: {
                celsius: { name: '°C', factor: 1 },
                fahrenheit: { name: '°F', factor: 1 },
                kelvin: { name: 'K', factor: 1 }
            }
        },
        volume: {
            name: 'Thể tích',
            icon: '🥤',
            units: {
                liter: { name: 'L', factor: 1 },
                milliliter: { name: 'ml', factor: 0.001 },
                gallon: { name: 'gal', factor: 3.78541 },
                quart: { name: 'qt', factor: 0.946353 },
                pint: { name: 'pt', factor: 0.473176 },
                cup: { name: 'cup', factor: 0.236588 }
            }
        },
        time: {
            name: 'Thời gian',
            icon: '⏰',
            units: {
                second: { name: 's', factor: 1 },
                minute: { name: 'min', factor: 60 },
                hour: { name: 'h', factor: 3600 },
                day: { name: 'ngày', factor: 86400 },
                week: { name: 'tuần', factor: 604800 },
                month: { name: 'tháng', factor: 2629746 },
                year: { name: 'năm', factor: 31556952 }
            }
        }
    }

    const convertValue = (value: string, fromUnit: string, toUnit: string, category: string): string => {
        if (!value || isNaN(parseFloat(value))) return ''

        const num = parseFloat(value)

        if (category === 'temperature') {
            return convertTemperature(num, fromUnit, toUnit).toString()
        }

        const fromFactor = categories[category].units[fromUnit].factor
        const toFactor = categories[category].units[toUnit].factor

        const result = (num * fromFactor) / toFactor

        if (result >= 1000000 || (result < 0.001 && result !== 0)) {
            return result.toExponential(6)
        }

        return parseFloat(result.toFixed(8)).toString()
    }

    const convertTemperature = (value: number, from: string, to: string): number => {
        let celsius = value

        if (from === 'fahrenheit') {
            celsius = (value - 32) * 5 / 9
        } else if (from === 'kelvin') {
            celsius = value - 273.15
        }

        if (to === 'fahrenheit') {
            return celsius * 9 / 5 + 32
        } else if (to === 'kelvin') {
            return celsius + 273.15
        }

        return celsius
    }

    const updateConversion = (newValue: string) => {
        const converted = convertValue(newValue, state.fromUnit, state.toUnit, state.activeCategory)
        setState(prev => ({
            ...prev,
            inputValue: newValue,
            outputValue: converted
        }))
    }

    const inputNumber = (num: string) => {
        if (num === '.' && state.inputValue.includes('.')) return

        const newValue = state.inputValue + num
        updateConversion(newValue)
    }

    const clearAll = () => {
        setState(prev => ({
            ...prev,
            inputValue: '',
            outputValue: ''
        }))
    }

    const backspace = () => {
        const newValue = state.inputValue.slice(0, -1)
        updateConversion(newValue)
    }

    const swapUnits = () => {
        const newFromUnit = state.toUnit
        const newToUnit = state.fromUnit
        const converted = convertValue(state.inputValue, newFromUnit, newToUnit, state.activeCategory)

        setState(prev => ({
            ...prev,
            fromUnit: newFromUnit,
            toUnit: newToUnit,
            outputValue: converted
        }))
    }

    const changeCategory = (category: string) => {
        const units = Object.keys(categories[category].units)
        setState(prev => ({
            ...prev,
            activeCategory: category,
            fromUnit: units[0],
            toUnit: units[1],
            inputValue: '',
            outputValue: ''
        }))
    }

    const nextCategory = () => {
        const categoryKeys = Object.keys(categories)
        const currentIndex = categoryKeys.indexOf(state.activeCategory)
        const nextIndex = (currentIndex + 1) % categoryKeys.length
        changeCategory(categoryKeys[nextIndex])
    }

    const prevCategory = () => {
        const categoryKeys = Object.keys(categories)
        const currentIndex = categoryKeys.indexOf(state.activeCategory)
        const prevIndex = currentIndex === 0 ? categoryKeys.length - 1 : currentIndex - 1
        changeCategory(categoryKeys[prevIndex])
    }

    const changeUnit = (unitType: 'from' | 'to', unit: string) => {
        const newState = {
            ...state,
            [unitType === 'from' ? 'fromUnit' : 'toUnit']: unit
        }

        if (state.inputValue) {
            const converted = convertValue(
                state.inputValue,
                newState.fromUnit,
                newState.toUnit,
                state.activeCategory
            )
            newState.outputValue = converted
        }

        setState(newState)
    }

    const currentCategory = categories[state.activeCategory]
    const fromUnitName = currentCategory.units[state.fromUnit]?.name || ''
    const toUnitName = currentCategory.units[state.toUnit]?.name || ''

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-96 border border-white/40 backdrop-saturate-150" style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 8px 16px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}>

            {/* button prev vs next */}
            <div className="mb-4 bg-white/10 rounded-xl p-3 backdrop-blur-sm ">
                <div className="flex items-center justify-between">
                    <button
                        onClick={prevCategory}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
                    >
                        ◀
                    </button>

                    <div className="flex flex-col items-center space-y-1 flex-1 mx-4">
                        <span className="text-lg font-semibold text-white">{currentCategory.name}</span>
                    </div>

                    <button
                        onClick={nextCategory}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
                    >
                        ▶
                    </button>
                </div>
            </div>

            {/* Frame option lựa chọn */}
            <div className="mb-4 space-y-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <select
                            value={state.fromUnit}
                            onChange={(e) => changeUnit('from', e.target.value)}
                            className="bg-white/20 text-gray-700 font-bold rounded-lg px-3 py-1 text-sm border border-white/20 backdrop-blur-sm"
                        >
                            {Object.entries(currentCategory.units).map(([key, unit]) => (
                                <option key={key} value={key} className="bg-gray-800 text-white font-bold">
                                    {unit.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={swapUnits}
                            className="mx-3 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            <span className="text-gray-700">⇄</span>
                        </button>

                        <select
                            value={state.toUnit}
                            onChange={(e) => changeUnit('to', e.target.value)}
                            className="bg-white/20 text-gray-700 font-bold rounded-lg px-3 py-1 text-sm border border-white/20 backdrop-blur-sm"
                        >
                            {Object.entries(currentCategory.units).map(([key, unit]) => (
                                <option key={key} value={key} className="bg-gray-800 text-white font-bold">
                                    {unit.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 min-h-[80px]">
                    <div className="text-white text-base mb-1 font-bold">{fromUnitName}</div>
                    <div className="text-white text-3xl font-extralight mb-2 min-h-[32px]">
                        {formatNumberWithCommas(state.inputValue) || "0"}
                    </div>
                    <div className="text-white text-base mb-1 font-bold">{toUnitName}</div>
                    <div className="text-white text-3xl font-extralight">
                        {formatNumberWithCommas(state.outputValue) || "0"}
                    </div>
                </div>
            </div>

            {/* button grid */}
            <div className="grid grid-cols-4 gap-2">
                <Button
                    onClick={clearAll}
                    variant="danger"
                >
                    AC
                </Button>
                <Button
                    onClick={backspace}
                    variant="warning"
                >
                    ⌫
                </Button>
                <Button
                    onClick={swapUnits}
                    variant="divide"
                    className="col-span-2"
                >
                    ⇄ Đổi đơn vị
                </Button>

                <Button onClick={() => inputNumber("7")} variant="number">7</Button>
                <Button onClick={() => inputNumber("8")} variant="number">8</Button>
                <Button onClick={() => inputNumber("9")} variant="number">9</Button>

                <Button onClick={() => inputNumber("4")} variant="number">4</Button>
                <Button onClick={() => inputNumber("5")} variant="number">5</Button>
                <Button onClick={() => inputNumber("6")} variant="number">6</Button>

                <Button onClick={() => inputNumber("1")} variant="number">1</Button>
                <Button onClick={() => inputNumber("2")} variant="number">2</Button>
                <Button onClick={() => inputNumber("3")} variant="number">3</Button>

                <Button onClick={() => inputNumber("0")} variant="number" className="col-span-2">0</Button>
                <Button onClick={() => inputNumber(".")} variant="number">.</Button>
            </div>
        </div>
    )
}

export default UnitConverter
