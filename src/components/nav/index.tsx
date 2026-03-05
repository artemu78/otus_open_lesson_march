import { Link } from "react-router";

interface INavLinkProps {
    to: string;
    children: React.ReactNode;
}

const NavLink: React.FC<INavLinkProps> = ({ to, children }) => (
    <Link
        to={to}
        className="no-underline text-slate-100 text-[0.95rem] font-medium px-4 py-2 rounded-lg transition-all duration-200 ease-in-out flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0"
    >
        {children}
    </Link>
);

const LoginButton: React.FC = () => (
    <button
        className="px-8 py-2.5 rounded-full border-none bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white font-bold text-[0.95rem] tracking-wide cursor-pointer transition-all duration-300 ease-in-out shadow-[0_10px_25px_-10px_rgba(168,85,247,0.6)] hover:scale-[1.03] hover:shadow-[0_20px_40px_-12px_rgba(168,85,247,0.7)] hover:brightness-110 active:scale-[0.97] outline-none"
    >
        Login
    </button>
);

export const Nav: React.FC = () => {
    return (
        <nav
            className="w-full flex justify-between items-center px-8 py-4 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-[1000] box-border"
        >
            <div className="flex gap-4 items-center">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/add">Add Tool</NavLink>
            </div>
            <div>
                <LoginButton />
            </div>
        </nav>
    );
};
