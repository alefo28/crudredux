import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Action de redux
import { crearNuevoProductoAction } from "../actions/productoActions";
import { useNavigate } from "react-router-dom";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  //state del componente
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);

  //componente para navegar entre paginas
  let navigate = useNavigate();

  //utilizar use dispatch y te devuelve una funcion
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  //mandar llamar el action de productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //Cuado el usuario hace submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    //Validar Formulario
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos Campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };

      dispatch(mostrarAlerta(alerta));
      return;
    }
    //si no hay errores
    dispatch(ocultarAlertaAction());

    //Crear el nuevo producto
    agregarProducto({ nombre, precio });

    //redicionar
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alerta && <p className={alerta.classes}>{alerta.msg}</p>}

            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Precio">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="precio del producto Producto"
                  id="Precio"
                  name="precio"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {cargando && <p>Cargando...</p>}
            {error && (
              <p className="alert alert-danger p-2 mt-4 text-center">
                Hubo un error
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
