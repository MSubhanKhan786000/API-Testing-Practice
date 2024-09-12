import React, { useEffect, useState } from "react";
import { addPosts, updatePost } from "../services/postService";

const PostForm = ({ posts, setPosts, editing, setEditing }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editing) {
      setBody(editing.body);
      setTitle(editing.title);
    } else {
      setBody("");
      setTitle("");
    }
  }, [editing]);

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      editPost();
      setBody("");
      setTitle("");
      setEditing(null);
    } else {
      addPosts1();
      setBody("");
      setTitle("");
      setEditing(null);
    }
  };

  const addPosts1 = () => {
    addPosts({ title, body })
      .then(res => setPosts([...posts, res.data]))
      .catch(err => console.warn(err));
  };

  const editPost = () => {
    updatePost(editing.id, { title, body }).then(res =>
      setPosts(posts.map(item => (item.id === editing.id ? res.data : item)))
    );
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>Title</div>
        <input
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div>Body</div>
        <textarea
          name=""
          id=""
          cols="20"
          rows="10"
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea>
        <div>
          <button>{editing ? "Edit Post" : "Add Post"}</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
