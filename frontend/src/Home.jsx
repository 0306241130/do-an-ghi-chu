import { Link } from 'react-router-dom';
import { useAppContext } from './context/AppContext';

function Home() {
    const { displayName, theme } = useAppContext();

    const isDark = theme === 'dark';

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div>
                <p
                    className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                >
                    Trang chủ
                </p>

                <h1 className="mt-1 text-2xl sm:text-3xl font-bold">
                    Xin chào, {displayName || 'Sinh viên'} 👋
                </h1>

                <p
                    className={`mt-2 text-sm sm:text-base ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    Chào mừng bạn đến với hệ thống quản lý ghi chú và
                    thông tin riêng tư.
                </p>
            </div>

            {/* THẺ GIỚI THIỆU */}
            <div
                className={`rounded-2xl p-6 sm:p-8 shadow-sm ${
                    isDark
                        ? 'bg-gray-900 border border-gray-800'
                        : 'bg-white border border-gray-200'
                }`}
            >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <div className="mb-3 text-4xl">
                            📝
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold">
                            Quản lý ghi chú dễ dàng
                        </h2>

                        <p
                            className={`mt-2 max-w-2xl text-sm sm:text-base ${
                                isDark
                                    ? 'text-gray-400'
                                    : 'text-gray-600'
                            }`}
                        >
                            Lưu trữ thông tin cá nhân và quản lý
                            vùng riêng tư của bạn một cách thuận tiện.
                        </p>
                    </div>

                    <Link
                        to="/settings"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        ⚙️ Cài đặt
                    </Link>

                </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {/* CARD 1 */}
                <Link
                    to="/settings"
                    className={`rounded-xl p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                        isDark
                            ? 'bg-gray-900 border border-gray-800'
                            : 'bg-white border border-gray-200'
                    }`}
                >
                    <div className="mb-4 text-3xl">
                        ⚙️
                    </div>

                    <h3 className="text-lg font-semibold">
                        Cài đặt
                    </h3>

                    <p
                        className={`mt-2 text-sm ${
                            isDark
                                ? 'text-gray-400'
                                : 'text-gray-600'
                        }`}
                    >
                        Thay đổi tên hiển thị, giao diện và mật khẩu.
                    </p>
                </Link>

                {/* CARD 2 */}
                <Link
                    to="/private"
                    className={`rounded-xl p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                        isDark
                            ? 'bg-gray-900 border border-gray-800'
                            : 'bg-white border border-gray-200'
                    }`}
                >
                    <div className="mb-4 text-3xl">
                        🔒
                    </div>

                    <h3 className="text-lg font-semibold">
                        Vùng riêng tư
                    </h3>

                    <p
                        className={`mt-2 text-sm ${
                            isDark
                                ? 'text-gray-400'
                                : 'text-gray-600'
                        }`}
                    >
                        Truy cập khu vực chứa thông tin riêng tư.
                    </p>
                </Link>

                {/* CARD 3 */}
                <div
                    className={`rounded-xl p-5 shadow-sm sm:col-span-2 lg:col-span-1 ${
                        isDark
                            ? 'bg-gray-900 border border-gray-800'
                            : 'bg-white border border-gray-200'
                    }`}
                >
                    <div className="mb-4 text-3xl">
                        💡
                    </div>

                    <h3 className="text-lg font-semibold">
                        Giao diện
                    </h3>

                    <p
                        className={`mt-2 text-sm ${
                            isDark
                                ? 'text-gray-400'
                                : 'text-gray-600'
                        }`}
                    >
                        Chế độ hiện tại:
                    </p>

                    <span
                        className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                            isDark
                                ? 'bg-gray-800 text-gray-200'
                                : 'bg-blue-100 text-blue-700'
                        }`}
                    >
                        {isDark ? '🌙 Tối' : '☀️ Sáng'}
                    </span>
                </div>

            </div>

            {/* FOOTER INFO */}
            <div
                className={`rounded-xl p-4 text-center text-sm ${
                    isDark
                        ? 'bg-gray-900 text-gray-400 border border-gray-800'
                        : 'bg-white text-gray-500 border border-gray-200'
                }`}
            >
                Hệ thống quản lý ghi chú và thông tin riêng tư
            </div>

        </div>
    );
}

export default Home;