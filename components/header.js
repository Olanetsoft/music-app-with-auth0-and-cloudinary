import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../components/login-button";
import Logout from "../components/logout-button";
import { Button } from "react-bootstrap";
import { supabase } from "../client";

export default function Header() {
  const { isAuthenticated, user } = useAuth0();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "olanetsoft",
        uploadPreset: "w42epls6"
      },
      (error, result) => {
        if (result.event === "success") {
          if (result.info.is_audio === true) {
            setUrl(result.info.secure_url);
            setTitle(result.info.original_filename);
            setName(user.name);
          }
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const createSong = async () => {
    await supabase
      .from("songs")
      .insert([
        {
          url,
          title,
          name
        }
      ])
      .single();
  };

  if (url && title && name) {
    createSong();
    window.location.reload(false);
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        Music Streaming App with Auth0 and Cloudinary
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-success" href="/">
          Home
        </a>
        <a className="p-2 text-danger" href="/">
          Trending
        </a>
        <a className="p-2 text-info" href="/">
          Top Songs
        </a>
      </nav>
      {isAuthenticated ? (
        <>
          <div>
            <Button
              id="btnUpload"
              className="btn margin"
              onClick={() => openWidget()}
              variant="primary"
            >
              Upload Song
            </Button>
            &nbsp;&nbsp;
            <Logout />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
