import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../services/postService";
import PostForm from "./PostForm";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    getPosts()
      .then(res => setPosts(res.data))
      .catch(err => console.warn(err));
  }, []);

  const handleDelete = id => {
    deletePost(id)
      .then(res => setPosts(posts.filter(item => item.id !== id)))
      .catch(err => console.warn(err));
  };

  const handleUpdate = post => {
    setEditing(post);
  };
  return (
    <React.Fragment>
      <h1>Posts</h1>
      <PostForm
        posts={posts}
        setPosts={setPosts}
        editing={editing}
        setEditing={setEditing}
      ></PostForm>
      <ul>
        {posts.map((item, index) => (
          <li>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <button onClick={() => handleUpdate(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Posts;
