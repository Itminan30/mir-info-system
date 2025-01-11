import { Link, useNavigate } from "react-router";
import authImg from "../../assets/authenticationImg.png";
import { useState } from "react";
import { useAuth } from "../../layout/AuthProvider";

const Login = () => {
    const [logError, setLogError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLogError(null);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/xusers/user`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                throw new Error("Invalid Credentials");
            }

            const userData = await response.json();
            login(userData);
            navigate("/");

        } catch (error) {
            setLogError(error.message);
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content grid grid-cols-1 gap-14 lg:grid-cols-2">
                <div className="">
                    <img src={authImg} alt="" />
                </div>
                <div className="card w-full shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold mb-2">Login!</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" required className="input input-bordered" />
                                <span className="label-text-alt p-1 text-error">{logError}</span>
                            </div>
                            <div className="form-control mt-1 p-1">
                                <small>New to Mini X? <Link className="text-[#799eb0] font-bold" to="/register">Register</Link></small>
                            </div>
                            <div className="form-control mt-5">
                                <input className="btn bg-[#799eb0]" value="Login" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;