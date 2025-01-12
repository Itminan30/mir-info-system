import { useEffect, useState } from "react";
import { useAuth } from "../../layout/AuthProvider";
import { useNavigate } from "react-router";

const MyPosts = () => {
    const { user } = useAuth()
    const navigate = useNavigate();

    const [userPosts, setUserPosts] = useState([]);
    const [formData, setFormData] = useState({
        tweet_title: "",
        tweet_body: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Update the specific field in the state
        });
    };

    const handleSubmit = async (post_id) => {
        const tweet_title = formData.tweet_title;
        const tweet_body = formData.tweet_body;
        const password = formData.password;
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/post/${user.twitter_handle}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ post_id, tweet_title, tweet_body, password })
        })

        const data = await response.json();

        if (data.status === 'success') {
            navigate(`/`)
        }
        else {
            console.log(data.message);
        }

        setFormData({
            tweet_title: "",
            tweet_body: "",
            password: "",
        });
    };

    // create post
    const createPost = async (event) => {
        event.preventDefault();
        const form = event.target;
        const tweet_title = form.tweet_title.value;
        const tweet_body = form.tweet_body.value;
        const user_name = user.user_name;
        const twitter_handle = user.twitter_handle;

        const response = await fetch(`${import.meta.env.VITE_API_LINK}/post`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ user_name, tweet_title, tweet_body, twitter_handle })
        })

        const data = await response.json();

        if (data.status === 'success') {
            setUserPosts([...userPosts, data.post])
        }
        else {
            console.log(data.message);
        }
    }

    useEffect(() => {
        const myposts = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/post/user/${user.twitter_handle}`)
            const data = await response.json();

            if (data.status === "success") {
                setUserPosts(data.data);
            }
            else {
                console.log(data.message);
            }
        }
        myposts();
    }, [user])

    if (!user) {
        navigate("/");
        return;
    }

    return (
        <div className="my-5 min-h-screen">
            <h1 className="text-2xl text-center font-bold">
                My posts
            </h1>

            <div className="bg-slate-200 my-3">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Make A Tweet</button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form onSubmit={createPost}>
                            <input type="text" placeholder="Tweet Title" name="tweet_title" className="input input-bordered my-2 w-full" />

                            <textarea
                                placeholder="Tweet Body"
                                className="textarea textarea-bordered textarea-lg w-full my-2"
                                name="tweet_body"
                            ></textarea>
                            <div>
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </form>

                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
                {
                    userPosts.map(post => (
                        <div key={post.id} className="card bg-base-100 w-96 shadow-xl">
                            <div className="card-body">
                                <div className="flex gap-3">
                                    <h2 className="card-title">{post.tweet_title}</h2>
                                    <h2>{post.twitter_handle}</h2>
                                </div>
                                <p>{post.tweet_body}</p>
                                <div className="card-actions justify-end">
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button
                                        className="btn"
                                        onClick={() => { document.getElementById(`${post.id}`).showModal(); setFormData({ tweet_title: post.tweet_title, tweet_body: post.tweet_body, password: "" }) }}>
                                        Edit Post
                                    </button>
                                    <dialog id={post.id} className="modal">
                                        <div className="modal-box w-11/12 max-w-5xl">
                                            {/* Show post details */}
                                            <div>
                                                <div>
                                                    <div className="flex justify-between">
                                                        <div className="mb-3 w-full">
                                                            <input type="text" onChange={handleChange} placeholder="Type here" name="tweet_title" value={formData.tweet_title} className="input input-bordered w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <textarea
                                                        placeholder="Bio"
                                                        className="textarea textarea-bordered textarea-lg w-full"
                                                        value={formData.tweet_body}
                                                        name="tweet_body"
                                                        onChange={handleChange}
                                                    >

                                                    </textarea>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between">
                                                        <div className="mb-3 w-full">
                                                            <input type="text" onChange={handleChange} value={formData.password} name="password" placeholder="Password" className="input input-bordered w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-3">
                                                <div>
                                                    <button onClick={() => handleSubmit(post.id)} className="btn btn-success">Save</button>
                                                </div>
                                                <div className="">
                                                    <form method="dialog">
                                                        {/* if there is a button, it will close the modal */}
                                                        <button className="btn btn-error">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                        </div >
                    ))
                }
            </div>
        </div>
    );
};

export default MyPosts;