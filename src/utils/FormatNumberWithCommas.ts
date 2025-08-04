// Hàm format số với dấu phẩy phân cách
export const formatNumberWithCommas = (num: string): string => {
    if (!num || num === '0') return num

    // Tách phần nguyên và thập phân
    const [integerPart, decimalPart] = num.split('.')

    // Thêm dấu phẩy vào phần nguyên
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    // Trả về với phần thập phân nếu có
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger
}