import { useEffect, useState } from "react";

const AllPosts = () => {
    // User Info
    

    // States
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

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
    const getcomments = async (post_id) => {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/comment/${post_id}`);
        const data = await response.json();

        setComments(data.comments);
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
                                    onClick={() => { document.getElementById(`${post.id}`).showModal(); getcomments(post.id) }}>
                                    See Details
                                </button>
                                <dialog id={post.id} className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl">
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
                    </div>
                ))
            }
        </div>
    );
};

export default AllPosts;