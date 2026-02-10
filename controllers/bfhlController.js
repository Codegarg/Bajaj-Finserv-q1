const {
    getFibonacci,
    getPrimes,
    getHCF,
    getLCM
} = require("../utils/mathUtils");

const EMAIL = process.env.EMAIL;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// Health API
exports.healthCheck = (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: EMAIL
    });
};

// Gemini AI call
async function getAIResponse(question) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Answer in one word only: ${question}`
                            }
                        ]
                    }
                ]
            })
        }
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Gemini error: ${text}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
}


// Main logic
exports.handleBFHL = async (req, res, next) => {
    try {
        const body = req.body;
        const key = Object.keys(body)[0];
        const value = body[key];

        let data;

        switch (key) {
            case "fibonacci":
                data = getFibonacci(value);
                break;

            case "prime":
                data = getPrimes(value);
                break;

            case "lcm":
                data = getLCM(value);
                break;

            case "hcf":
                data = getHCF(value);
                break;

            case "AI":
                data = await getAIResponse(value);
                break;
        }

        res.status(200).json({
            is_success: true,
            official_email: EMAIL,
            data
        });

    } catch (err) {
        next(err);
    }
};
