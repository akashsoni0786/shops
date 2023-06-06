import React, { useState } from "react";
import apicall from './db.js';
export const contxtname = React.createContext();
export const Context = (props) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cat_products, setCat_Products] = useState('');
  const [cat_productsarr, setCat_Productsarr] = useState([]);
  const [orders, setOrders] = useState([]);
  const [detailid, setDetailid] = useState('');
  const [cartcount, setCartCount] = useState(0);
  const [userID, setUserID] = useState('');
  const [addtocartstate, setAddtocartstate] = useState([]);
  const [searchtxtar,setSearchtxtar] = React.useState([]);
  React.useEffect(()=>{
    const ax = async ()=>
    {
      try
      {
        let allproducts = await apicall.get("/products");
        let allorders = await apicall.get("/orders");
        let addtocart = await apicall.get("/addtocart");
        setAddtocartstate(addtocart.data);
        setOrders(allorders.data);
        setProducts(allproducts.data);
        setCat_Products(allproducts.data);
        setCartCount(addtocart.data.length);
      }
      catch(e){
        console.log(e)
      }
    }
   ax();
  },[])

  return (
    <contxtname.Provider
      value=
      {{ 
        products: products, 
        setProducts: setProducts,
        cat_products:cat_products,
        setCat_Products: setCat_Products,
        detailid:detailid, 
        setDetailid:setDetailid,
        userID:userID, 
        setUserID:setUserID,
        users:users, 
        setUsers:setUsers,
        orders:orders, 
        setOrders:setOrders,
        addtocartstate:addtocartstate, 
        setAddtocartstate:setAddtocartstate,
        cartcount:cartcount, 
        setCartCount:setCartCount,
        searchtxtar:searchtxtar,
        setSearchtxtar:setSearchtxtar,
        cat_productsarr:cat_productsarr, 
        setCat_Productsarr:setCat_Productsarr
      }}
    >
      {props.children}
    </contxtname.Provider>
  );
};
