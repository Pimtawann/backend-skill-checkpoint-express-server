import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateCreateAnswer } from "../middlewares/answer.validation.mjs";

const answerRouter = Router();

answerRouter.post("/:questionId/answers", validateCreateAnswer, async (req, res) => {
    const newAnswer = {
        ...req.body
    }

    try {
        const results = await connectionPool.query(
            `insert into answers (question_id, content)
            values ($1, $2)`,
            [
                202,
                newAnswer.content,
            ]
        );

        if(results.rowCount === 0){
            return res.status(404).json({
                message: "Question not found.",
            })
        }

        return res.status(201).json({
            message: "Answer created successfully.",
        })
    } catch {
        return res.status(500).json({
            message: "Unable to create answer.",
        });
    };
})

answerRouter.get("/:questionId/answers", async (req, res) => {
    const questionIdFromClient = req.params.questionId;

    try {
        const results = await connectionPool.query(`
            select * from answers
            where question_id = $1
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
            message: "Unable to fetch answers.",
        })
    }
})

answerRouter.delete("/:questionId/answers", async (req, res) => {
    const questionIdFromClient = req.params.questionId;

    try {
        const results = await connectionPool.query(`
            delete from answers
            where question_id = $1
            `, [questionIdFromClient])
        
        if(results.rowCount === 0){
            return res.status(404).json({
                message: "Question not found.",
            })
        }
        
        return res.status(200).json({
            message: "All answers for the question have been deleted successfully.",
        })

    }catch {
        return res.status(500).json({
            message: "Unable to delete answers.",
        })
    }

})

export default answerRouter;