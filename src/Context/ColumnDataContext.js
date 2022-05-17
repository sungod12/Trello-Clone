import React, { useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const ColumnContext = React.createContext();

export const useColumnData = () => {
  return useContext(ColumnContext);
};

export function ColumnProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const newColumn = useRef("");
  const [columns, setColumns] = useState([]);
  const [toggledColumnId, setToggledColumnId] = useState("");
  const newColumnName = useRef("");
  const [hidden, setHidden] = useState(true);
  const { axiosJWT, url } = useAuth();

  function toggleColumn(id) {
    setToggledColumnId(id);
  }

  // console.log(boardId);

  const fetch = (boardId) => {
    if (boardId) {
      axiosJWT.get(`${url}/getData/${boardId}`).then((res) => {
        setColumns(res.data.items);
      });
    }

    setLoading(false);
  };

  const updateColumns = async (newColumns, boardId) => {
    await axiosJWT.put(`${url}/updateColumns/${boardId}`, {
      columns: newColumns,
    });
  };

  const updateColumnName = (val) => {
    toggleColumn("");
    if (newColumnName.current)
      axiosJWT
        .put(`${url}/updateColumnName`, {
          oldColumnName: val,
          newColumnName: newColumnName.current,
        })
        .then((res) => (res.data === "title exists" ? "" : fetch()));
    newColumnName.current = "";
  };

  const addColumn = (boardId) => {
    setHidden(true);

    if (newColumn.current) {
      axiosJWT
        .post(`${url}/addColumn/${boardId}`, {
          column: newColumn.current,
        })
        .then((res) => (res.data === "title exists" ? "" : fetch()));
    }
    newColumn.current = "";
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch();
    }, 500);
    if (!loading) clearTimeout(timer);

    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, [loading]);

  const value = {
    columns,
    newColumn,
    updateColumnName,
    toggledColumnId,
    setToggledColumnId,
    newColumnName,
    addColumn,
    setHidden,
    hidden,
    fetch,
    setColumns,
    updateColumns,
    setLoading,
  };

  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  );
}
