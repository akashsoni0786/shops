import React from "react";
import { contxtname } from "./Context";
import apicall from "./db.js";

const ProductDetailPage = (props) => {
  const contxt = React.useContext(contxtname);
  const addtocart = (e) => {
    contxt.products.map(async (i) => {
      if (i.id == e) {
        if (contxt.addtocartstate.length != 0) {
          contxt.addtocartstate.map(async (j) => {
            if (e == j.id) {
              let items = {
                id: j.id,
                pcategory: j.pcategory,
                pname: j.pname,
                quantity: j.quantity + 1,
                price: j.price,
                img: j.img,
              };
              console.log(contxt.addtocartstate);
              try {
                await apicall.put(`/addtocart/${i.id}`, items);
                let addtocart = await apicall.get("/addtocart");
                contxt.setAddtocartstate(addtocart.data);
              } catch (e) {
                console.log(e);
              }
            } else {
              let item = {
                id: i.id,
                pcategory: i.pcategory,
                pname: i.pname,
                quantity: 1,
                price: i.price,
                img: i.img,
              };
              console.log(item);
              console.log(contxt.addtocartstate);
              try {
                await apicall.post("/addtocart", item);
                let addtocart = await apicall.get("/addtocart");
                contxt.setAddtocartstate(addtocart.data);
                contxt.setCartCount(addtocart.data.length);
              } catch (e) {
                console.log(e);
              }
            }
          });
        } else {
          let item = {
            id: i.id,
            pcategory: i.pcategory,
            pname: i.pname,
            quantity: 1,
            price: i.price,
            img: i.img,
          };
          console.log(item);
          console.log(contxt.addtocartstate);
          try {
            await apicall.post("/addtocart", item);
            let addtocart = await apicall.get("/addtocart");
            contxt.setAddtocartstate(addtocart.data);
            contxt.setCartCount(addtocart.data.length);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  };

  return (
    <div style={{marginTop:"100px"}}>
      {contxt.products.map((i) => {
        if (contxt.detailid == i.id) {
          return (
            <div className="productdetailspage">
              <div className="detailpropicdiv">
                <img alt="" className="detailpropic" src={i.img} />
              </div>
              <hr />
              <div className="detailprocartdiv">
                <p className="detailproname">{i.pname}</p>
                <hr />
                <div className="cartbox">
                  <div
                    id={i.id}
                    onClick={() => {
                      addtocart(i.id);
                    }}
                    className="addtocartbtndetails"
                  >
                    Add to Cart
                  </div>
                </div>
                <hr />
                <p className="detailproname">
                  <u>Specifications</u>
                </p>
                <div className="specicationdetails">
                  <p>Speciality : </p>
                  <p> &nbsp;&nbsp; Premium</p>
                </div>
                <div className="specicationdetails">
                  <p>Category : </p>
                  <p> &nbsp;&nbsp; {i.pcategory}</p>
                </div>
                <div className="specicationdetails">
                  <p>Price : </p>
                  <p> &nbsp;&nbsp; ₹{i.price}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProductDetailPage;
