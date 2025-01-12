import { useEffect, useState } from "react";
import { useAuth } from "../../layout/AuthProvider";

const AllPosts = () => {
    // User Info
    const { user } = useAuth();

    // States
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [following, setFollowing] = useState(false);

    // Effect for getting all the posts
    useEffect(() => {
        const fetchposts = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/post`);
            const data = await response.json();

            setPosts(data);
        }

        fetchposts();
    }, [])

    // Method for getting post comments
    const getCommentsFollows = async (post_id, twitter_handle) => {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/comment/${post_id}`);
        const data = await response.json();
        setComments(data.comments);

        if (user) {
            const followresponse = await fetch(`${import.meta.env.VITE_API_LINK}/follow/${user?.twitter_handle}/${twitter_handle}`)
            const followingdata = await followresponse.json();

            if (followingdata.message === "following") {
                setFollowing(true);
            }
        }
    }

    // Follow a user
    const followUser = async (following_handle) => {
        const follower_handle = user.twitter_handle;
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/follow`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ follower_handle, following_handle })
        })

        const data = await response.json()
        if (data.status === "success") {
            setFollowing(true);
        }
        else {
            console.log(data.message);
        }
    }

    // Unfollow a user
    const unfollowUser = async (unfollowinghandle) => {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/follow/${user.twitter_handle}/${unfollowinghandle}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(null)
        })

        const data = await response.json();

        if (data.status === "success") {
            setFollowing(false);
        }
        else {
            console.log(data.message);
        }
    }

    // Add a comment
    const addComment = async (event) => {
        event.preventDefault();
        const form = event.target;
        const post_id = form.post_id.value;
        const user_name = form.user_name.value;
        const twitter_handle = form.twitter_handle.value;
        const comment_body = form.comment_body.value;

        console.log({
            post_id,
            user_name,
            twitter_handle,
            comment_body
        });

        const response = await fetch(`${import.meta.env.VITE_API_LINK}/comment`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ post_id, user_name, twitter_handle, comment_body })
        })

        const data = await response.json();

        if (data.status === "success") {
            const newComment = data.comment;
            setComments([...comments, newComment])
            form.reset();
        }
        else {
            console.log(data.message);
        }
    }

    // delete comment
    const deletecomment = async (id, post_id) => {
        const twitter_handle = user?.twitter_handle;

        const response = await fetch(`${import.meta.env.VITE_API_LINK}/comment/${id}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ post_id, twitter_handle })
        })

        const data = await response.json();

        if (data.status === "success") {
            const newCommentList = comments.filter(comment => comment.id !== id);
            setComments(newCommentList);
        }
        else {
            console.log(data.message);
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-3">
            {
                posts.map(post => (
                    <div key={post.id} className="card h-fit bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <div className="flex gap-3 justify-between">
                                <h2 className="card-title">{post.tweet_title}</h2>
                                <h2>{post.twitter_handle}</h2>
                            </div>
                            <p>{post.tweet_body}</p>
                            <div className="card-actions justify-end">
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <button
                                    className="btn"
                                    onClick={() => { document.getElementById(`${post.id}`).showModal(); getCommentsFollows(post.id, post.twitter_handle) }}>
                                    See Details
                                </button>
                                <dialog id={post.id} className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl">
                                        {/* Show post details */}
                                        <div>
                                            <div>
                                                <div className="flex justify-between">
                                                    <div className="mb-3">
                                                        <h2 className="text-sm font-bold text-gray-600">
                                                            {post.tweet_title}
                                                        </h2>
                                                        <p>
                                                            by {post.user_name} - {post.twitter_handle}
                                                        </p>
                                                    </div>
                                                    {
                                                        (user) && (user?.twitter_handle !== post.twitter_handle ? (
                                                            following ?
                                                                (
                                                                    (<button onClick={() => unfollowUser(post.twitter_handle)} className="btn">
                                                                        Unfollow
                                                                    </button>)
                                                                ) : (
                                                                    (<button onClick={() => followUser(post.twitter_handle)} className="btn">
                                                                        Follow
                                                                    </button>)
                                                                )
                                                        ) : (
                                                            <>
                                                            </>
                                                        ))

                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold">
                                                    {post.tweet_body}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="divider"></div>
                                        {/* Show Comments of a post */}
                                        <h3 className="font-bold text-lg">Comments</h3>
                                        {
                                            user &&
                                            <div className="mt-3">
                                                <form onSubmit={addComment}>
                                                    <input type="text" placeholder="Add Comment" id="comment_body" name="comment_body" className="input input-bordered w-full max-w-xs" />
                                                    <input type="hidden" name="post_id" value={post.id} />
                                                    <input type="hidden" name="user_name" value={user.user_name} />
                                                    <input type="hidden" name="twitter_handle" value={user.twitter_handle} />
                                                    <button type="submit" className="btn btn-ghost">Submit</button>
                                                </form>
                                            </div>
                                        }
                                        <div>
                                            {
                                                comments.length !== 0 ?
                                                    (
                                                        comments.map(comment => (
                                                            <div key={comment.id} className="py-2 flex justify-between">
                                                                <div>
                                                                    <p className="text-gray-800 text-base">{comment.comment_body}</p>
                                                                    <p className="text-gray-600 text-xs">by {comment.twitter_handle}</p>
                                                                </div>
                                                                {
                                                                    user && user.twitter_handle === comment.twitter_handle &&
                                                                    (
                                                                        <div>
                                                                            <button onClick={() => deletecomment(comment.id, post.id)} className="btn btn-error btn-sm">Delete</button>
                                                                        </div>
                                                                    )
                                                                }

                                                            </div>
                                                        ))
                                                    ) :
                                                    (
                                                        <p className="py-2">No comments</p>
                                                    )
                                            }
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button, it will close the modal */}
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div >
                ))
            }
        </div >
    );
};

export default AllPosts;