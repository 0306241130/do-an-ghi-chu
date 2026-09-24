import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Layout() {
    const { displayName, theme } = useAppContext();
    const location = useLocation();

    const isDark = theme === 'dark';

    const menuItems = [
        {
            name: 'Trang chủ',
            path: '/',
            icon: '🏠',
        },
        {
            name: 'Cài đặt',
            path: '/settings',
            icon: '⚙️',
        },
        {
            name: 'Vùng riêng tư',
            path: '/private',
            icon: '🔒',
        },
    ];

    return (
        <div
            className={`min-h-screen ${
                isDark
                    ? 'bg-gray-950 text-white'
                    : 'bg-gray-100 text-gray-900'
            }`}
        >
            <div className="flex min-h-screen flex-col md:flex-row">

                {/* SIDEBAR */}
                <aside
                    className={`w-full md:w-64 md:min-h-screen ${
                        isDark
                            ? 'bg-gray-900 border-gray-800'
                            : 'bg-white border-gray-200'
                    } border-b md:border-b-0 md:border-r`}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-between p-5 border-b border-inherit">
                        <div>
                            <h1 className="text-xl font-bold">
                                📝 Ghi Chú
                            </h1>

                            <p
                                className={`mt-1 text-sm ${
                                    isDark
                                        ? 'text-gray-400'
                                        : 'text-gray-500'
                                }`}
                            >
                                Xin chào, {displayName || 'Sinh viên'}
                            </p>
                        </div>
                    </div>

                    {/* MENU */}
                    <nav className="p-3">
                        <div className="grid grid-cols-3 gap-2 md:block md:space-y-2">
                            {menuItems.map((item) => {
                                const active =
                                    location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 rounded-lg px-3 py-3 text-center md:text-left text-sm md:text-base font-medium transition ${
                                            active
                                                ? 'bg-blue-600 text-white'
                                                : isDark
                                                ? 'text-gray-300 hover:bg-gray-800'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="text-lg">
                                            {item.icon}
                                        </span>

                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </aside>

                {/* CONTENT */}
                <main className="flex-1">
                    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default Layout;