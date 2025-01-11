import { Link, useNavigate } from "react-router";
import authImg from "../../assets/authenticationImg.png";
import { useState } from "react";
import { useAuth } from "../../layout/AuthProvider";

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [regError, setRegError] = useState(null);

    const handleRegister = async (event) => {
        event.preventDefault();
        setRegError(null);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const user_name = form.user_name.value;
        const twitter_handle = form.twitter_handle.value;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/xusers`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ user_name, twitter_handle, email, password })
            })

            if (!response.ok) {
                if (response.status === 422) {
                    // Parse validation errors
                    console.log(response);
                } else {
                    throw new Error('An unexpected error occurred');
                }
            } else {
                const data = await response.json();
                console.log('Registration successful:', data);
                login(data.user);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
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
                        <h1 className="text-3xl font-bold mb-2">Register!</h1>
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" placeholder="user name" name="user_name" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">X handle</span>
                                </label>
                                <input type="text" placeholder="X Handle" name="twitter_handle" required className="input input-bordered" />
                            </div>
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
                                <span className="label-text-alt p-1 text-error">{regError}</span>
                            </div>
                            <div className="form-control mt-1 p-1">
                                <small>Already have an account!? <Link className="text-[#799eb0] font-bold" to="/login">Login</Link></small>
                            </div>
                            <div className="form-control mt-5">
                                <input className="btn bg-[#799eb0]" value="Register" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;