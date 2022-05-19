import React, { useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Header({ onBoard }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [isEditing, setEditing] = useState(false);
  const history = useHistory();
  const { AToken, axiosJWT, url } = useAuth();
  const boardId = history.location.state;

  const updateBoardTitle = async (title) => {
    setEditing(false);
    const response = await axiosJWT.put(
      `${url}/updateBoardTitle/${boardId.id}`,
      {
        title,
      }
    );
    if (response.message === "successfully updated Title") setLoading(true);
    else return;
  };

  useLayoutEffect(() => {
    getBoardTitle();
    return () => setTitle("");
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      getBoardTitle();
    }, 2000);
    if (!loading) clearTimeout(timer);

    return () => setLoading(true);
    // eslint-disable-next-line
  }, [loading]);

  const getBoardTitle = () => {
    if (!onBoard) {
      axiosJWT.get(`${url}/getBoardTitle/${boardId.id}`).then((res) => {
        setTitle(res.data.title);
      });
    }
  };

  const logout = () => {
    try {
      axiosJWT.post(`${url}/logout`, {
        token: AToken,
      });
      localStorage.clear();
      history.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="row">
        <div className="header">
          <button
            type="button"
            className="board-button"
            onClick={() => {
              history.replace("/boards");
            }}
          >
            <i className="fa fa-trello" aria-hidden="true"></i>
            Boards
          </button>
          <p className="name">Trello</p>
          <button
            type="button"
            onClick={logout}
            className="board-button logout-button"
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      {!onBoard && (
        <div className="row hero-container">
          {isEditing ? (
            <input
              type="text"
              className="changeTitleinput"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onMouseLeave={() => updateBoardTitle(title)}
            />
          ) : (
            <p className="title">{title}</p>
          )}
          <button
            type="button"
            className="changeTitleButton"
            onClick={() => setEditing(!isEditing)}
          >
            <i className="fas fa-pen changeTitleIcon" />
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
