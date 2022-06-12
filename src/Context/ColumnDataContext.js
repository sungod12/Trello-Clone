import React, { useContext, useState, useRef } from "react";
import { useAuth } from "./AuthContext";

const ColumnContext = React.createContext();

export const useColumnData = () => {
  return useContext(ColumnContext);
};

export function ColumnProvider({ children }) {
  const newColumn = useRef("");
  const [columns, setColumns] = useState([]);
  const [toggledColumnId, setToggledColumnId] = useState("");
  const newColumnName = useRef("");
  const [hidden, setHidden] = useState(true);
  const { axiosJWT, url } = useAuth();

  function toggleColumn(id) {
    setToggledColumnId(id);
  }

  const fetch = async (boardId) => {
    if (boardId) {
      const response = await axiosJWT.get(`${url}/getData/${boardId}`);
      setColumns(response.data.items);
    }
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
        .then((res) =>
          res.data === "column already exists" ? "" : fetch(boardId)
        );
    }
    newColumn.current = "";
  };

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
  };

  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  );
}
