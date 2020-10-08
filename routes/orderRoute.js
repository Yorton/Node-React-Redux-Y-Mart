const express = require('express');
const Order = require('../models/orderModal');
const {isAuth, isAdmin} = require('../util');

const orderRoute = express.Router();

orderRoute.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});

orderRoute.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });//req.user is from isAuth
  res.send(orders);
});

orderRoute.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

orderRoute.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

orderRoute.post("/", isAuth, async (req, res) => {

    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,//req.user is from isAuth
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

orderRoute.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: req.body.paymentMethod,//'paypal',
      paymentResult: req.body.paymentResult//{

      //   payerID: req.body.payerID,
      //   orderID: req.body.orderID,
      //   paymentID: req.body.paymentID
      // }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

module.exports = orderRoute;