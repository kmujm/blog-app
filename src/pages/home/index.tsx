import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

import Header from "../../components/Header";
import PostList from "../../components/PostList";
export default function Home() {
  return (
    <>
      <div>
        <Header />

        <PostList />
        <Footer />
      </div>
    </>
  );
}
