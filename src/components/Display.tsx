import React from 'react'

interface DisplayProps {
    expression: string
    result: string
}

const Display: React.FC<DisplayProps> = ({ expression, result }) => {
    const formatNumberWithCommas = (num: string): string => {
        if (!num) return num

        // Tách phần nguyên và thập phân
        const [integerPart, decimalPart] = num.split('.')

        // Thêm dấu phẩy vào phần nguyên
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        // Trả về với phần thập phân nếu có
        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger
    }

    // Hàm format expression với dấu phẩy
    const formatExpression = (expr: string): string => {
        if (!expr) return expr

        return expr.replace(/\b\d+(\.\d+)?\b/g, (match) => {
            return formatNumberWithCommas(match)
        })
    }

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
            {/* Phép toán */}
            <div className="text-right text-lg text-gray-700 min-h-[24px] mb-2 font-mono">
                {formatExpression(expression) || "0"}
            </div>

            {/* Kết quả */}
            <div className="text-right text-3xl font-light text-gray-900 min-h-[40px] flex items-center justify-end font-mono">
                {formatNumberWithCommas(result)}
            </div>
        </div>
    )
}

export default Display
