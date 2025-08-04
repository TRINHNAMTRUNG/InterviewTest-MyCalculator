import React from 'react'
import notFoundImage from '../assets/404-error-page-not-found.webp'

const NotFoundPage: React.FC = () => {
    const goHome = () => {
        window.location.href = '/'
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{
                backgroundImage: `url(${notFoundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 backdrop-blur-sm"></div>

            <div className="relative z-10 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white/30 backdrop-saturate-150 text-center" style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 8px 16px -8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}>
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-white/90 mb-2 drop-shadow-lg">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-white/80 mb-4 drop-shadow-md">
                        Trang không tìm thấy
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed drop-shadow-sm">
                        Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={goHome}
                        className="w-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 block"
                    >
                        🏠 Về trang chủ
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50"
                    >
                        ← Quay lại trang trước
                    </button>
                </div>

                <div className="mt-8 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>

            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/3 right-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
    )
}

export default NotFoundPage
