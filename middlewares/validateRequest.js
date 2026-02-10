module.exports = (req, res, next) => {
    const EMAIL = process.env.EMAIL;
    const body = req.body;

    if (!body || typeof body !== "object") {
        return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid JSON body"
        });
    }

    const keys = Object.keys(body);

    if (keys.length !== 1) {
        return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Exactly one key required"
        });
    }

    const key = keys[0];
    const value = body[key];

    switch (key) {
        case "fibonacci":
            if (typeof value !== "number" || value < 0 || value > 1000) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL,
                    error: "Invalid fibonacci input"
                });
            }
            break;

        case "prime":
        case "lcm":
        case "hcf":
            if (
                !Array.isArray(value) ||
                value.length === 0 ||
                !value.every(num => Number.isInteger(num))
            ) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL,
                    error: `Invalid ${key} input`
                });
            }
            break;

        case "AI":
            if (typeof value !== "string" || value.length === 0) {
                return res.status(400).json({
                    is_success: false,
                    official_email: EMAIL,
                    error: "Invalid AI input"
                });
            }
            break;

        default:
            return res.status(400).json({
                is_success: false,
                official_email: EMAIL,
                error: "Unknown key"
            });
    }

    next();
};
