import React, { useContext, useEffect, useState } from "react";

import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";

import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { CATEGIRES, CategoryType, PostProps } from "./PostList";

export default function PostForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);

  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType | string>("Frontend");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 수정 페이지 logic start
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

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
      setCategory(post?.category as CategoryType);
    }
  }, [post]);
  // 수정 페이지 logic end

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 수정 페이지 logic
      if (post && post.id) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          category: category,
        });

        toast.success("게시글을 수정했습니다");
        navigate(`/posts/${post.id}`);
      } else {
        // 새로운 게시글 등록
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
          category: category,
        });

        navigate("/");
        toast.success("게시글을 생성했습니다");
      }
    } catch (e: any) {
      console.log(e);
      toast?.error(e?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
    if (name === "category") {
      setCategory(value as CategoryType);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="form__block">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={onChange}
            value={title}
            required
          />
        </div>
        <div className="form__block">
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            onChange={onChange}
            defaultValue={category}
          >
            <option value="">카테고리를 선택해주세요</option>
            {CATEGIRES?.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form__block">
          <label htmlFor="summary">요약</label>
          <input
            type="text"
            name="summary"
            id="summary"
            onChange={onChange}
            value={summary}
            required
          />
        </div>
        <div className="form__block">
          <label htmlFor="content">내용</label>
          <textarea
            name="content"
            id="content"
            onChange={onChange}
            value={content}
            required
          />
        </div>
        <div className="form__block">
          <input
            type="submit"
            value={post ? "수정" : "제출"}
            className="form__btn--submit"
          />
        </div>
      </form>
    </>
  );
}
