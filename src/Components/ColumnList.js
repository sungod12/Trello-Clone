import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useColumnData } from "../Context/ColumnDataContext";
import CardList from "./CardList";
import { useAuth } from "../Context/AuthContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import Header from "./Header";

const Columns = () => {
  const [toggledCardId, setToggledCardId] = useState("");
  const { columns, toggledColumnId } = useColumnData();

  return columns.map((val, index) => {
    const isToggledColumn = index === toggledColumnId;
    const isToggledCard = index === toggledCardId;
    const { column: columnName } = val ? val : [];
    const cards = val && val.cards ? val.cards : [];
    return (
      <Draggable draggableId={`${index}`} index={index} key={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            className="column"
          >
            <Droppable droppableId="droppable_column" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {columnName !== "" ? (
                    <Column
                      isToggledColumn={isToggledColumn}
                      isToggledCard={isToggledCard}
                      name={columnName}
                      cards={cards}
                      index={index}
                      setToggledCardId={setToggledCardId}
                      toggledCardId={toggledCardId}
                    />
                  ) : (
                    ""
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  });
};

const Column = ({
  isToggledColumn,
  isToggledCard,
  name,
  cards,
  index,
  setToggledCardId,
  toggledCardId,
}) => {
  const {
    setToggledColumnId,
    newColumnName,
    updateColumnName,
    fetch,
    columns,
  } = useColumnData();

  const { axiosJWT } = useAuth();
  const cardName = useRef("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    cardName.current = "";
    if (added) fetch();

    setAdded(false);
    // eslint-disable-next-line
  }, [added]);

  const AddCard = async () => {
    setToggledCardId("");
    if (cardName.current !== "")
      await axiosJWT.post("http://localhost:3001/addCard", {
        card: cardName.current,
        column: columns[toggledCardId].column,
      });

    setAdded(true);
    // console.log(newColumns[clickedColumnId]);
  };

  return (
    <>
      <h2
        className="columnTitle"
        hidden={isToggledColumn}
        onClick={() => setToggledColumnId(index)}
      >
        {name}
      </h2>

      <input
        type="text"
        className="editTitle"
        onMouseLeave={() => updateColumnName(name)}
        defaultValue={name}
        onChange={(e) => {
          newColumnName.current = e.target.value;
        }}
        hidden={!isToggledColumn}
      />
      <CardList cardName={cardName.current} cards={cards} />

      <input
        type="text"
        hidden={!isToggledCard}
        onMouseLeave={AddCard}
        onChange={(e) => {
          cardName.current = e.target.value;
        }}
      />

      <button
        type="button"
        className="AddCardButton"
        onClick={() => setToggledCardId(index)}
      >
        + Add Card
      </button>
    </>
  );
};

const ColumnList = () => {
  const history = useHistory();

  const {
    fetch,
    addColumn,
    hidden,
    setHidden,
    newColumn,
    columns,
    updateColumns,
  } = useColumnData();

  const { id, color } = history.location.state;

  const onDragEnd = (e) => {
    // console.log(e);
    const { source, destination } = e;
    const draggedColumn = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, ...draggedColumn);
    updateColumns(columns, id);
  };

  const setBoardColor = () => {
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
  };

  useLayoutEffect(() => {
    fetch(id);
    setBoardColor();
    return () =>
      (document.getElementsByTagName("body")[0].style.backgroundColor =
        "initial");
    // eslint-disable-next-line
  }, []);

  const handleLeave = () => {
    addColumn(id);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable_area" direction="horizontal">
        {(provided) => (
          <>
            <Header />
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable"
            >
              <Columns />
              {provided.placeholder}
              {hidden ? (
                ""
              ) : (
                <input
                  type="text"
                  onChange={(e) => {
                    newColumn.current = e.target.value;
                  }}
                  onMouseLeave={handleLeave}
                  required
                />
              )}
              <button
                type="button"
                className="addbutton"
                onClick={() => setHidden(!hidden)}
              >
                + Add
              </button>
            </div>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnList;

// eslint-disable-next-line
