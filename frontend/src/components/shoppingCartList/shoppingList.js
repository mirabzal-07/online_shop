
import {useState} from "react";

function ShoppingList({title, image, model, price}) {
  const [total, setTotal] =useState(1)
  return (
      <tr>
        <td className="text-center" >
          <a href="#">
            <img
                width="70px"
                src={`http://localhost:8000/${image}`}
                alt="Aspire Ultrabook Laptop"
                title="Aspire Ultrabook Laptop"
                className="img-thumbnail"
            />
          </a>
        </td>
        <td className="text-left">
          <a href="#">{title}</a>
          <br />
        </td>
        <td className="text-left">{model}</td>
        <td className="text-left" width="200px">
          <div className="input-group btn-block quantity">
            <input
                type="text"
                name="quantity"
                defaultValue={total}
                onChange={({target}) => setTotal(target.value)}
                size="1"
                className="form-control"
                style={{ width: "100px" }}
            />
            <span className="input-group-btn">
              <button
                  type="submit"
                  data-toggle="tooltip"
                  title="Update"
                  className="btn btn-primary"
              >
              <i className="fa fa-clone"></i>
              </button>
              <button
                  type="button"
                  data-toggle="tooltip"
                  title="Remove"
                  className="btn btn-danger"
              >
              <i className="fa fa-times-circle"></i>
              </button>
            </span>
          </div>
        </td>
        <td className="text-right">$ {price}</td>
        <td className="text-right">$ {(price * total).toFixed(2)}</td>
      </tr>
  );
}

export default ShoppingList;