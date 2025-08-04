import React, { useState } from 'react'
import { evaluate } from 'mathjs'
import toast from 'react-hot-toast'
import Display from './Display'
import Button from './Button'

interface CalculatorState {
    expression: string
    result: string
    ansValue: string
}

const Calculator: React.FC = () => {
    const [state, setState] = useState<CalculatorState>({
        expression: "",
        result: "",
        ansValue: "",
    })

    const formatResult = (result: number): string => {
        const resultStr = result.toString()

        // Nếu kết quả >= 15 chữ số, chuyển về scientific notation
        if (resultStr.replace('.', '').replace('-', '').length >= 15) {
            return result.toExponential(6) // 6 chữ số sau dấu thập phân trong scientific notation
        }

        // Nếu có phần thập phân quá dài (> 9 chữ số sau phẩy), làm tròn
        if (resultStr.includes('.')) {
            const decimalPart = resultStr.split('.')[1]
            if (decimalPart && decimalPart.length > 9) {
                return parseFloat(result.toFixed(9)).toString()
            }
        }

        return resultStr
    }

    const calculateResult = (expr: string): string => {
        try {
            // Thay thế các ký hiệu để math.js hiểu
            const mathExpression = expr
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/√/g, 'sqrt')
                .replace(/abs/g, 'abs')
                .replace(/log/g, 'log10')
                .replace(/ln/g, 'log')
                .replace(/sin/g, 'sin')
                .replace(/cos/g, 'cos')
                .replace(/tan/g, 'tan')
                .replace(/exp/g, 'exp')
                .replace(/\^/g, '^')

            const result = evaluate(mathExpression)

            // Kiểm tra kết quả có phải Infinity không (chia cho 0)
            if (!isFinite(result)) {
                return ""
            }

            return formatResult(result)
        } catch (error) {
            return ""
        }
    }

    // Func cập nhật expression và tính result
    const updateExpression = (newExpression: string) => {
        const result = calculateResult(newExpression)
        setState({
            expression: newExpression,
            result: result,
            ansValue: state.ansValue
        })
    }

    const countDigitsInExpression = (expr: string): number => {
        const matches = expr.match(/(\d+\.?\d*)$/)
        if (matches) {
            return matches[1].replace('.', '').length
        }
        return 0
    }

    const inputNumber = (num: string) => {
        const expr = state.expression
        const lastChar = expr.slice(-1)

        if (lastChar === ')') {
            const newExpression = expr + ' × ' + num
            updateExpression(newExpression)
            return
        }

        if (num !== '.' && countDigitsInExpression(expr) >= 15) {
            toast.error('Giới hạn 15 chữ số cho một số!', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#f59e0b',
                    color: 'white',
                    borderRadius: '10px',
                    fontWeight: 'bold'
                }
            })
            return
        }

        const newExpression = expr + num
        updateExpression(newExpression)
    }

    const inputConstant = (constant: string) => {
        const expr = state.expression
        const lastChar = expr.slice(-1)

        let value = ""
        switch (constant) {
            case "π":
                value = "3.1415926536"
                break
            case "e":
                value = "2.7182818285"
                break
        }

        let newExpression = ""

        if (/[\d)]/.test(lastChar)) {
            newExpression = expr + ' × ' + value
        }
        else if (!expr || /[+\-×÷(^]/.test(lastChar) || /\s$/.test(expr)) {
            newExpression = expr + value
        }
        if (newExpression) {
            updateExpression(newExpression)
        }
    }

    const inputFunction = (func: string) => {
        const expr = state.expression
        const lastChar = expr.slice(-1)

        if (/[\d)]/.test(lastChar)) {
            const newExpression = expr + ' × ' + func + '('
            updateExpression(newExpression)
        }
        else if (!expr || /[+\-×÷(^]/.test(lastChar) || /\s$/.test(expr)) {
            const newExpression = expr + func + '('
            updateExpression(newExpression)
        }
    }

    const inputOperation = (operation: string) => {
        const expr = state.expression
        const lastChar = expr.slice(-1)

        if (expr && /[\d)]/.test(lastChar)) {
            let newExpression = ""
            if (operation === "^") {
                const lastPowerIndex = expr.lastIndexOf('^')
                if (lastPowerIndex !== -1) {
                    let startIndex = 0
                    let depth = 0
                    let found = false

                    for (let i = lastPowerIndex - 1; i >= 0; i--) {
                        const char = expr[i]

                        if (char === ')') {
                            depth++
                        } else if (char === '(') {
                            depth--
                            if (depth < 0) {
                                startIndex = i + 1
                                found = true
                                break
                            }
                        } else if (depth === 0 && /[+\-×÷]/.test(char)) {
                            startIndex = i + 1
                            found = true
                            break
                        }
                    }

                    if (found || depth === 0) {
                        const beforePart = expr.substring(0, startIndex).trim()
                        const powerPart = expr.substring(startIndex)
                        newExpression = beforePart + (beforePart ? ' ' : '') + '(' + powerPart + ')^'
                    } else {
                        newExpression = expr + '^'
                    }
                } else {
                    newExpression = expr + '^'
                }
            } else {
                newExpression = expr + ' ' + operation + ' '
            }
            updateExpression(newExpression)
        }
    }

    const inputSquare = () => {
        const expr = state.expression
        const lastChar = expr.slice(-1)

        if (expr && (/\d/.test(lastChar) || lastChar === ')')) {
            const lastPowerIndex = expr.lastIndexOf('^')
            if (lastPowerIndex !== -1) {
                let startIndex = 0
                let depth = 0
                let found = false

                for (let i = lastPowerIndex - 1; i >= 0; i--) {
                    const char = expr[i]

                    if (char === ')') {
                        depth++
                    } else if (char === '(') {
                        depth--
                        if (depth < 0) {
                            startIndex = i + 1
                            found = true
                            break
                        }
                    } else if (depth === 0 && /[+\-×÷]/.test(char)) {
                        startIndex = i + 1
                        found = true
                        break
                    }
                }

                if (found || depth === 0) {
                    const beforePart = expr.substring(0, startIndex).trim()
                    const powerPart = expr.substring(startIndex)
                    const newExpression = beforePart + (beforePart ? ' ' : '') + '(' + powerPart + ')^2'
                    updateExpression(newExpression)
                } else {
                    updateExpression(expr + "^2")
                }
            } else {
                updateExpression(expr + "^2")
            }
        }
    }

    const inputParenthesis = () => {
        const expr = state.expression
        const lastChar = expr.slice(-1)

        const openCount = (expr.match(/\(/g) || []).length
        const closeCount = (expr.match(/\)/g) || []).length

        let newExpression = expr

        if (/\d/.test(lastChar) && openCount > closeCount) {
            newExpression += ')'
        }
        else if (/\d/.test(lastChar)) {
            newExpression += ' × ('
        }
        else if (lastChar === ')' && openCount > closeCount) {
            newExpression += ')'
        }
        else if (lastChar === ')') {
            newExpression += ' × ('
        }
        else if (!expr || /[+\-×÷(\s^]/.test(lastChar)) {
            newExpression += '('
        }

        updateExpression(newExpression)
    }

    const clearAll = () => {
        setState({
            expression: "",
            result: "",
            ansValue: state.ansValue
        })
    }

    const backspace = () => {
        let newExpression = state.expression

        if (newExpression.length === 0) return

        const mathFunctions = ['sin', 'cos', 'tan', 'log', 'ln', '√', 'abs', 'exp']

        let foundFunction = false
        for (const func of mathFunctions) {
            if (newExpression.endsWith(func + '(')) {
                newExpression = newExpression.slice(0, -(func.length + 1))
                foundFunction = true
                break
            }
        }

        if (!foundFunction) {
            newExpression = newExpression.slice(0, -1)

            while (newExpression.length > 0 && newExpression.slice(-1) === ' ') {
                newExpression = newExpression.slice(0, -1)
            }
        }

        updateExpression(newExpression)
    }

    const inputAns = () => {
        if (!state.ansValue) return

        const expr = state.expression
        const lastChar = expr.slice(-1)

        if (/[\d)]/.test(lastChar)) {
            const newExpression = expr + ' × ' + state.ansValue
            updateExpression(newExpression)
        }
        else if (!expr || /[+\-×÷(^]/.test(lastChar) || /\s$/.test(expr)) {
            const newExpression = expr + state.ansValue
            updateExpression(newExpression)
        }
    }

    const performCalculation = () => {
        if (state.result) {
            let expr = state.result
            const openCount = (expr.match(/\(/g) || []).length
            const closeCount = (expr.match(/\)/g) || []).length
            const missingClose = openCount - closeCount

            for (let i = 0; i < missingClose; i++) {
                expr += ')'
            }

            setState({
                expression: expr,
                result: "",
                ansValue: expr
            })
        } else if (state.expression) {
            let expr = state.expression
            const openCount = (expr.match(/\(/g) || []).length
            const closeCount = (expr.match(/\)/g) || []).length
            const missingClose = openCount - closeCount

            for (let i = 0; i < missingClose; i++) {
                expr += ')'
            }

            const result = calculateResult(expr)
            if (result) {
                setState({
                    expression: result,
                    result: "",
                    ansValue: result
                })
            }
        }
    }

    return (
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-96 border border-white/30 backdrop-saturate-150" style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 8px 16px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}>
            <Display
                expression={state.expression}
                result={state.result}
            />

            <div className="grid grid-cols-4 gap-2">
                <Button onClick={() => inputFunction(" sin")} variant="divide" className="text-sm">sin</Button>
                <Button onClick={() => inputFunction(" cos")} variant="divide" className="text-sm">cos</Button>
                <Button onClick={() => inputFunction(" tan")} variant="divide" className="text-sm">tan</Button>
                <Button onClick={() => inputFunction(" log")} variant="divide" className="text-sm">log</Button>

                <Button onClick={() => inputFunction(" ln")} variant="divide" className="text-sm">ln</Button>
                <Button onClick={() => inputFunction(" √")} variant="divide" className="text-sm">√</Button>
                <Button onClick={() => inputFunction(" abs")} variant="divide" className="text-sm">|x|</Button>
                <Button onClick={() => inputFunction(" exp")} variant="divide" className="text-sm">e^x</Button>

                <Button onClick={() => inputConstant("π")} variant="divide" className="text-sm">π</Button>
                <Button onClick={() => inputConstant("e")} variant="divide" className="text-sm">e</Button>
                <Button onClick={() => inputOperation("^")} variant="divide" className="text-sm">x^y</Button>
                <Button onClick={inputSquare} variant="divide" className="text-sm">x²</Button>

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
                    onClick={inputParenthesis}
                    variant="warning"
                >
                    ( )
                </Button>
                <Button
                    onClick={() => inputOperation("÷")}
                    variant="divide"
                >
                    ÷
                </Button>

                <Button onClick={() => inputNumber("7")} variant="number">7</Button>
                <Button onClick={() => inputNumber("8")} variant="number">8</Button>
                <Button onClick={() => inputNumber("9")} variant="number">9</Button>
                <Button
                    onClick={() => inputOperation("×")}
                    variant="divide"
                >
                    ×
                </Button>

                <Button onClick={() => inputNumber("4")} variant="number">4</Button>
                <Button onClick={() => inputNumber("5")} variant="number">5</Button>
                <Button onClick={() => inputNumber("6")} variant="number">6</Button>
                <Button onClick={() => inputOperation("-")} variant="operator">-</Button>

                <Button onClick={() => inputNumber("1")} variant="number">1</Button>
                <Button onClick={() => inputNumber("2")} variant="number">2</Button>
                <Button onClick={() => inputNumber("3")} variant="number">3</Button>
                <Button onClick={() => inputOperation("+")} variant="operator">+</Button>

                {/* Row 8 - Numbers 0, ., ANS and = */}
                <Button onClick={() => inputNumber("0")} variant="number">0</Button>
                <Button onClick={() => inputNumber(".")} variant="number">.</Button>
                <Button onClick={inputAns} variant="warning">ANS</Button>
                <Button onClick={performCalculation} variant="equals">=</Button>
            </div>
        </div>
    )
}

export default Calculator
