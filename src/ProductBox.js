import React from 'react'

const ProductBox = (props) => {
  return (
    <div className='productcard'  >
        <div >
            <img id={props.id} onClick={props.showdetails} className='productpic' alt='' src={props.productpic}/>
        </div>
        <div className='pricename'>
            <p className='proname'>{props.productname}</p>
            <p className='pprice'>₹{props.productprice}</p>
        </div>
        <div onClick={props.addtocartbtn} id={props.id} className='addtocartbtn'>Add to cart</div>
    </div>
  )
}

export default ProductBox