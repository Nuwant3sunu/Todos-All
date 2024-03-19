const express = require('express')
const {query} = require('../helpers/db.js')

const todoRouter = express.Router()

todoRouter.get("/",async (req,res)=>{
    
    try {
        const result = await query('SELECT * FROM TASK')
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
        
    } catch (error) {
        console.log(error);
        res.statusMessage = error
        res.status(500).json({error :error});
    }
});

todoRouter.post("/new",async (req,res) => {
    try {
        const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *',
        [req.body.description])
        res.status(200).json({id:result.rows[0].id});
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({error: error});
    } 
});

/*Start by implementing deletion functionality to the backend. Create delete method, that
receives id as query parameter (e.g., http://localhost:3001/delete/1).*/
todoRouter.delete("/delete/:id", async(req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await query('DELETE FROM task WHERE id = $1',
        [id]);
        res.status(200).json({id:id});
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({error: error});
    }
})
