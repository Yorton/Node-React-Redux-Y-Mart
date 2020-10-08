import React, { useState, useEffect } from 'react';

function PaypalButton(props) {


  return <button onClick={props.onSuccess.bind(this, "success")} 
          className="button primary full-width" >Pay Now</button>
}

export default PaypalButton;