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

        if(data.status === "success") {
            setFollowing(false);
        }
        else {
            console.log(data.message);
        }
    }

    console.log(posts);
    console.log(comments);
    return (
        <div>
            {
                posts.map(post => (
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
                                        <div>
                                            {
                                                comments.length !== 0 ?
                                                    (
                                                        comments.map(comment => (
                                                            <p key={comment.id} className="py-2">{comment.comment_body}</p>
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