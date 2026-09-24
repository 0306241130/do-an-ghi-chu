import { useState, useEffect } from 'react';
import { useAppContext } from './context/AppContext';

function Settings() {
    const {
        displayName,
        setDisplayName,
        theme,
        setTheme,
    } = useAppContext();

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const isDark = theme === 'dark';

    // Lấy thông tin profile từ Backend
    useEffect(() => {
        fetch('http://localhost:5000/api/profile')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Không thể lấy thông tin profile');
                }

                return response.json();
            })
            .then((data) => {
                setDisplayName(data.displayName || '');
                setTheme(data.theme || 'light');
                setPassword(data.password || '');
            })
            .catch((error) => {
                console.error('Lỗi khi lấy profile:', error);
                setMessage('Không thể tải thông tin cài đặt.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setDisplayName, setTheme]);

    // Lưu profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setMessage('');

        try {
            const response = await fetch(
                'http://localhost:5000/api/profile',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        displayName,
                        theme,
                        password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Lưu profile thất bại');
            }

            setMessage('Lưu thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu profile:', error);
            setMessage('Lưu thất bại!');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mb-3 text-4xl">⏳</div>
                    <p
                        className={
                            isDark
                                ? 'text-gray-400'
                                : 'text-gray-600'
                        }
                    >
                        Đang tải cài đặt...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-3xl">

            {/* HEADER */}
            <div className="mb-6">
                <p
                    className={`text-sm ${
                        isDark
                            ? 'text-gray-400'
                            : 'text-gray-500'
                    }`}
                >
                    Thiết lập hệ thống
                </p>

                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    ⚙️ Cài đặt
                </h1>

                <p
                    className={`mt-2 text-sm sm:text-base ${
                        isDark
                            ? 'text-gray-400'
                            : 'text-gray-600'
                    }`}
                >
                    Quản lý thông tin cá nhân và giao diện của bạn.
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

                <div
                    className={`rounded-2xl border p-5 shadow-sm sm:p-8 ${
                        isDark
                            ? 'border-gray-800 bg-gray-900'
                            : 'border-gray-200 bg-white'
                    }`}
                >

                    {/* TÊN HIỂN THỊ */}
                    <div className="mb-7">
                        <label
                            htmlFor="displayName"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Tên hiển thị
                        </label>

                        <input
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) =>
                                setDisplayName(e.target.value)
                            }
                            placeholder="Nhập tên hiển thị"
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                                isDark
                                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500'
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                            }`}
                        />

                        <p
                            className={`mt-2 text-xs ${
                                isDark
                                    ? 'text-gray-500'
                                    : 'text-gray-500'
                            }`}
                        >
                            Tên này sẽ được hiển thị trên trang chủ.
                        </p>
                    </div>

                    {/* THEME */}
                    <div className="mb-7">
                        <label className="mb-3 block text-sm font-semibold">
                            Giao diện
                        </label>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* LIGHT */}
                            <label
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                                    theme === 'light'
                                        ? 'border-blue-500 bg-blue-50'
                                        : isDark
                                        ? 'border-gray-700 bg-gray-800'
                                        : 'border-gray-200 bg-gray-50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    value="light"
                                    checked={theme === 'light'}
                                    onChange={() =>
                                        setTheme('light')
                                    }
                                    className="h-4 w-4"
                                />

                                <div>
                                    <p className="font-medium">
                                        ☀️ Giao diện sáng
                                    </p>

                                    <p
                                        className={`mt-1 text-xs ${
                                            isDark
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        Nền sáng, dễ sử dụng ban ngày.
                                    </p>
                                </div>
                            </label>

                            {/* DARK */}
                            <label
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                                    theme === 'dark'
                                        ? 'border-blue-500 bg-blue-950'
                                        : isDark
                                        ? 'border-gray-700 bg-gray-800'
                                        : 'border-gray-200 bg-gray-50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    value="dark"
                                    checked={theme === 'dark'}
                                    onChange={() =>
                                        setTheme('dark')
                                    }
                                    className="h-4 w-4"
                                />

                                <div>
                                    <p className="font-medium">
                                        🌙 Giao diện tối
                                    </p>

                                    <p
                                        className={`mt-1 text-xs ${
                                            isDark
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        Nền tối, phù hợp sử dụng ban đêm.
                                    </p>
                                </div>
                            </label>

                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-7">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold"
                        >
                            🔒 Mật khẩu vùng riêng tư
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Nhập mật khẩu"
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                                isDark
                                    ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-500'
                                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                            }`}
                        />

                        <p
                            className={`mt-2 text-xs ${
                                isDark
                                    ? 'text-gray-500'
                                    : 'text-gray-500'
                            }`}
                        >
                            Mật khẩu dùng để truy cập vùng riêng tư.
                        </p>
                    </div>

                    {/* THÔNG BÁO */}
                    {message && (
                        <div
                            className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
                                message.includes('thành công')
                                    ? isDark
                                        ? 'border-green-800 bg-green-950 text-green-300'
                                        : 'border-green-200 bg-green-50 text-green-700'
                                    : isDark
                                    ? 'border-red-800 bg-red-950 text-red-300'
                                    : 'border-red-200 bg-red-50 text-red-700'
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* BUTTON */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {saving
                                ? '⏳ Đang lưu...'
                                : '💾 Lưu thay đổi'}
                        </button>

                    </div>

                </div>

            </form>
        </div>
    );
}

export default Settings;