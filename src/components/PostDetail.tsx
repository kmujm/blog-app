import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { PostProps } from "./PostList";

import { getDoc, doc } from "firebase/firestore";
import { db } from "firebaseApp";

export default function PostDetail() {
  const params = useParams();

  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__utils-box">
              <div
                className="post__delete"
                role="presentation"
                onClick={handleDelete}
              >
                삭제
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/1`}>수정</Link>
              </div>
            </div>
            <div className="post__text post__text--pre-wrap">
              {post?.content}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
