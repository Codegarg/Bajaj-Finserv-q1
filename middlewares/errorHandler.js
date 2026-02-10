module.exports = (err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        is_success: false,
        official_email: process.env.EMAIL,
        error: "Internal server error"
    });
};
