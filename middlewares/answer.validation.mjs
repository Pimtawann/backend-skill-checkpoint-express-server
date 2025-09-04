export const validateCreateAnswer = (req, res, next) => {
    const {content} = req.body;

    if(!content){
        return res.status(400).json({
            message: "Invalid request data.",
        })
    }

    if(content.length > 300){
        return res.status(400).json({
            message: "Content must not exceed 300 characters.",
        })
    }

    next()
};