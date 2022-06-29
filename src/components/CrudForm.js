import React, { useState, useEffect } from "react";

/* Datos por defecto del formulario */
const inicialForm = {
  name: "",
  constellation: "",
  id: null,
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(inicialForm);

  /* useEffect se ejecuta cuando dataToEdit cambia */
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(inicialForm);
    }
  }, [dataToEdit]);
  /*Toma los datos en los inputs y los guarda en Form para pasarselos a la base de datos  */
  const handlerChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  /* Envio de los datos del form */
  const handlerSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.constellation) {
      alert("Datos Incompletor");
      return;
    }
    /* si el id del Form es Null, hace un create para subir la data y sino hace una actualizacion de los datos*/
    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handlerReset();
  };
  /* Resetea los datos de en los Inputs, con le InicialForm vacio */
  const handlerReset = (e) => {
    setForm(inicialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      {/* Cambio del titulo segun acción a tomar  */}
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handlerChange}
          value={form.name}
        />
        <input
          type="text"
          name="constellation"
          placeholder="Constellation"
          onChange={handlerChange}
          value={form.constellation}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handlerReset} />
      </form>
    </div>
  );
};

export default CrudForm;
