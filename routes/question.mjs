import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateCreateQuestion } from "../middlewares/question.validation.mjs";
import { validateUpdateQuestion } from "../middlewares/question.validation.mjs";
import { validateSearchQuestion } from "../middlewares/question.validation.mjs";

const questionRouter = Router();

questionRouter.post("/", validateCreateQuestion,async (req, res) => {
    const newQuestion = {
        ...req.body
    }

    try {
        await connectionPool.query(
            `insert into questions (title, description, category)
            values ($1, $2, $3)`,
            [
                newQuestion.title,
                newQuestion.description,
                newQuestion.category
            ]
        );

        return res.status(201).json({
            message: "Question created successfully.",
        })
    } catch {
        return res.status(500).json({
            message: "Unable to create question.",
        });
    };
});

questionRouter.get("/", async (req, res) => {
    try {
        const results = await connectionPool.query(`
            select * from questions
            `)
        
        return res.status(200).json({
            data: results.rows,
        })
    } catch {
        return res.status(500).json({
            message: "Unable to fetch questions.",
        })
    }
})

questionRouter.get("/search", validateSearchQuestion,async (req, res) => {
    const title = req.query.title;
    const category = req.query.category;

    try {
        const results = await connectionPool.query(`
            select * from questions
            where
            (title = $1 or $1 is null or $1 = '')
            and
            (category = $2 or $2 is null or $2 = '')
            `,[title, category])
        
        return res.status(200).json({
            data: results.rows,
        })
    } catch {
        return res.status(500).json({
            message: "Unable to fetch questions.",
        })
    }
})

questionRouter.get("/:questionId", async (req, res) => {
    const questionIdFromClient = req.params.questionId;
    try {
        const results = await connectionPool.query(`
            select * from questions
            where id = $1
            `,[questionIdFromClient])

        if (!results.rows[0]){
            return res.status(404).json({
                message: "Question not found.",
            })
        }

        return res.status(200).json({
            data: results.rows[0],
        })

    } catch {
        return res.status(500).json({
            message: "Unable to fetch questions.",
        })
    }
})

questionRouter.put("/:questionId", validateUpdateQuestion, async (req, res) => {
    const questionIdFromClient = req.params.questionId;
    const updatedQuestion = {...req.body}

    try {
        const results = await connectionPool.query(`
            update questions
            set title = $2,
                description = $3,
                category = $4
            where id = $1
            `, [
                questionIdFromClient,
                updatedQuestion.title,
                updatedQuestion.description,
                updatedQuestion.category,
            ]
        );

        if(results.rowCount === 0){
            return res.status(404).json({
                message: "Question not found.",
            })
        }

        return res.status(200).json({
            message: "Question updated successfully.",
        })

        
    } catch {
        return res.status(500).json({
            message: "Unable to fetch questions.",
        })
    };
});

questionRouter.delete("/:questionId", async (req, res) => {
    const questionIdFromClient = req.params.questionId;

    try {
        const results = await connectionPool.query(`
            delete from questions
            where id = $1
            `, [questionIdFromClient])
        
        if(results.rowCount === 0){
            return res.status(404).json({
                message: "Question not found.",
            })
        }
        
        return res.status(200).json({
            message: "Question post has been deleted successfully.",
        })

    }catch {
        return res.status(500).json({
            message: "Unable to delete question.",
        })
    }
})

export default questionRouter;