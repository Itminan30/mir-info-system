import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../layout/AuthProvider";

const Navigation = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NavLink to="/">All Posts</NavLink></li>
                        {
                            user &&
                            (
                                <li><NavLink to={`/myposts/${user.twitter_handle}`}>My Posts</NavLink></li>
                            )
                        }
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-xl">Mini X</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/">All Posts</NavLink></li>
                    {
                        user &&
                        (
                            <li><NavLink to={`/myposts/${user.twitter_handle}`}>My Posts</NavLink></li>
                        )
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    {
                        user ?
                            (
                                <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                                    <div tabIndex={0} role="button" className="btn m-1">{user?.twitter_handle}</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                </div>
                            ) :
                            (
                                <li><NavLink to="/login">Login</NavLink></li>
                            )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navigation;