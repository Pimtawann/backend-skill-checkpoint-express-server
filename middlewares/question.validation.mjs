export const validateCreateQuestion = (req, res, next) => {
    const {title, description, category} = req.body;

    if(!title){
        return res.status(400).json({
            message: "Title is required."
        })
    }
    if(!description){
        return res.status(400).json({
            message: "Description is required."
        })
    }
    if(!category){
        return res.status(400).json({
            message: "Category is required."
        })
    }

    next()
};

export const validateUpdateQuestion = (req, res, next) => {
    const {title, description, category} = req.body;

    if(!title && !description && !category){
        return res.status(400).json({
            message: "Invalid request data."
        })
    }

    next()
}

export const validateSearchQuestion = (req, res, next) => {
    const title = req.query.title;
    const category = req.query.category;

    if(!title && !category){
        return res.status(400).json({
            message: "Invalid search parameters.",
        })
    }
    next()
}