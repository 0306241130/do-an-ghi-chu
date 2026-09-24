import { useState } from 'react';
import { useAppContext } from './context/AppContext';

function Private() {
    const { theme } = useAppContext();

    const isDark = theme === 'dark';

    const [password, setPassword] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!password) {
            setError('Vui lòng nhập mật khẩu.');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:5000/api/profile'
            );

            if (!response.ok) {
                throw new Error('Không thể lấy thông tin profile');
            }

            const data = await response.json();

            if (password === data.password) {
                setIsUnlocked(true);
                setError('');
            } else {
                setIsUnlocked(false);
                setError('Mật khẩu không chính xác.');
            }
        } catch (error) {
            console.error(error);
            setError('Không thể kết nối đến máy chủ.');
        }
    };

    if (isUnlocked) {
        return (
            <div className="mx-auto w-full max-w-3xl">

                <div
                    className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${
                        isDark
                            ? 'border-gray-800 bg-gray-900'
                            : 'border-gray-200 bg-white'
                    }`}
                >
                    {/* HEADER */}
                    <div className="mb-8 text-center">
                        <div className="mb-4 text-5xl">
                            🔓
                        </div>

                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Vùng riêng tư
                        </h1>

                        <p
                            className={`mt-2 text-sm sm:text-base ${
                                isDark
                                    ? 'text-gray-400'
                                    : 'text-gray-600'
                            }`}
                        >
                            Bạn đã mở khóa vùng thông tin riêng tư.
                        </p>
                    </div>

                    {/* PRIVATE CONTENT */}
                    <div
                        className={`rounded-xl border p-5 ${
                            isDark
                                ? 'border-gray-700 bg-gray-800'
                                : 'border-gray-200 bg-gray-50'
                        }`}
                    >
                        <h2 className="text-lg font-semibold">
                            🔐 Nội dung riêng tư
                        </h2>

                        <p
                            className={`mt-2 text-sm ${
                                isDark
                                    ? 'text-gray-400'
                                    : 'text-gray-600'
                            }`}
                        >
                            Đây là khu vực dành cho những thông tin
                            riêng tư của bạn.
                        </p>
                    </div>

                    {/* LOCK BUTTON */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsUnlocked(false);
                            setPassword('');
                        }}
                        className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
                    >
                        🔒 Khóa vùng riêng tư
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex min-h-[500px] w-full max-w-md items-center justify-center">

            <div
                className={`w-full rounded-2xl border p-6 shadow-sm sm:p-8 ${
                    isDark
                        ? 'border-gray-800 bg-gray-900'
                        : 'border-gray-200 bg-white'
                }`}
            >

                {/* ICON */}
                <div className="mb-6 text-center">
                    <div className="mb-4 text-5xl">
                        🔒
                    </div>

                    <h1 className="text-2xl font-bold">
                        Vùng riêng tư
                    </h1>

                    <p
                        className={`mt-2 text-sm ${
                            isDark
                                ? 'text-gray-400'
                                : 'text-gray-600'
                        }`}
                    >
                        Nhập mật khẩu để tiếp tục.
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>

                    <div className="mb-5">
                        <label
                            htmlFor="privatePassword"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Mật khẩu
                        </label>

                        <input
                            id="privatePassword"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Nhập mật khẩu"
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                                isDark
                                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500'
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                            }`}
                        />
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            ❌ {error}
                        </div>
                    )}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        🔓 Mở vùng riêng tư
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Private;