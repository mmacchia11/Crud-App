import React, { useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
/* base de datos  */
const initalDB = [
  {
    id: 1,
    name: "Seiya",
    constellation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constellation: "Dragón",
  },
  {
    id: 3,
    name: "Hyoga",
    constellation: "Cisne",
  },
  {
    id: 4,
    name: "Shun",
    constellation: "Andromeda",
  },
  {
    id: 5,
    name: "Ikki",
    constellation: "Fenix",
  },
];

const CrudApp = () => {
  /* seteo base de datos y los modificadores de la misma */
  const [db, setDb] = useState(initalDB);
  /* dataToEdit => si esrta null hago creacion y cuando esta llega actualizo */
  const [dataToEdit, setDataToEdit] = useState(null);

  /* Genera id por la fecha y le pega a la base de datos para subir la data */
  const createData = (data) => {
    data.id = Date().now;
    setDb([...db, data]);
  };
  /* actualización de los datos de la base de datos */
  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };
  /* eliminar regustro */
  const deleteData = (id) => {
    let isDelete = window.confirm(
      `Estas seguro de eliminar el registo con el ID:${id}`
    );
    /* si el confirm es true filtra y elimina el registo */
    if (isDelete) {
      let newData = db.filter((el) => el.id != id);
      setDb(newData);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Crud App</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />

        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </article>
    </div>
  );
};

export default CrudApp;
