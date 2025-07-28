const Payment = require("../models/Payment");
const storePayment = async (req, res) => {
    let { payment_id, booking_id, payment_date, amount, method, status } = req.body;
    const payment = Payment.fill({ payment_id, booking_id, payment_date, amount, method, status });
    await payment.insert();
    res.json({
        status: "success",
        message: "Payment added successfully",
        data: payment,
    });
};

const getPayments = async (req, res) => {
    const payments = await Payment.fetch();
    res.json({
        status: "success",
        message: "Payments fetched successfully",
        data: payments,
    });
};

const getPaymentById = async (req, res) => {
    let { id } = req.params;
    const payment = await Payment.find(id);
    if (!payment) {
        return res.status(404).json({
            status: "error",
            message: "Payment not found",
        });
    }
    res.json({
        status: "success",
        message: "Payment fetched successfully",
        data: payment,
    });
};


const partialPaymentUpdate = async (req, res) => {
    let { id } = req.params;
    const payment = await Payment.find(id);
    if (!payment) {
        return res.status(404).json({
            status: "error",
            message: "Payment not found",
        });
    }
    payment.fill(req.body);

    await payment.update();

    res.json({
        status: "success",
        message: "Payment updated successfully",
        data: payment,
    });
};

const deletePayment = async (req, res) => {
    let { id } = req.params;
    const deleted = await Payment.delete(id);
    if (!deleted) {
        return res.status(404).json({
            status: "error",
            message: "Failed to delete payment",
        });
    }

    res.json({
        status: "success",
        message: "Payment deleted successfully",
    });
};

module.exports = {
    storePayment,
    getPayments,
    getPaymentById,
    partialPaymentUpdate,
    deletePayment,
};
