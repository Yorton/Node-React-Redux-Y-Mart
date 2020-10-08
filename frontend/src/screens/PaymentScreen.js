import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {savePayment} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch= useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePayment({paymentMethod}));

        props.history.push('placeorder');
    }

    return  <div>
                <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Payment</h2>
                            </li>
                            <li>
                                <div className="payment">
                                    {
                                        /*
                                            <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="paymentMethod"
                                    value="paypal"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    ></input>
                                    <label htmlFor="paymentMethod">Paypal</label>
                                        */
                                    }
                                    <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="linePay"
                                    value="LinePay"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    ></input>
                                    <label htmlFor="linePay">LinePay</label>
                                    <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="applePay"
                                    value="ApplePay"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    ></input>
                                    <label htmlFor="applePay">ApplePay</label>
                                    <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="googlePay"
                                    value="GooglePay"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    ></input>
                                    <label htmlFor="googlePay">GooglePay</label>
                                </div>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Continue</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
              
}


export default PaymentScreen;
