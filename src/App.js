import MusicList from "../components/musicList";
import Header from "../components/header";
import Loading from "../components/loading";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles.css";

import { Helmet } from "react-helmet";

export default function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mt-5 mb-3">
      <Helmet>
        <meta charSet="utf-8" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Helmet>
      <Header />
      <MusicList />
    </div>
  );
}
