import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
  const navigate = useNavigate();

  //NUEVO STATE DE PRODUCTO
  const [producto, setProducto] = useState({
    nombre: "",
    precio: 0,
    id: 0,
  });

  //Producto a editar
  const productoEditar = useSelector((state) => state.productos.productoeditar);
  const dispatch = useDispatch();

  //llena el state
  useEffect(() => {
    setProducto(productoEditar);
  }, [productoEditar]);

  //leer los datos del formulario
  const onChangeFormulario = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, precio } = producto;

  const submitEditarProducto = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => onChangeFormulario(e)}
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
                  onChange={(e) => onChangeFormulario(e)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
