const express = require('express');
const path = require('path');
const cors = require('cors');

const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executepy');
const { executeJava } = require('./executeJava');
const { executeC } = require('./executeC');

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ hello: "world" });
});

app.post('/run', async (req, res) => {
    const { language = "cpp", code } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code not allowed" });
    }

    try {
        const filepath = await generateFile(language, code);
        if (language === 'cpp') {
            const output = await executeCpp(filepath);
            console.log(output);

            return res.json({ filepath, output });
        }
        else if (language === 'python') {
            const output = await executePy(filepath);

            return res.json({ filepath, output });
        }
        else if (language === 'java') {
            const output = await executeJava(filepath);
            return res.json({ filepath, output });
        }

        else if(language === 'c'){
            const output = await executeC(filepath);
            return res.json({filepath,output});
        }
    } catch (error) {
        console.log('Err2:', error);
        return res.status(500).json({ success: false, output: error });
    }
});



app.listen(5000, () => {
    console.log("Listening at port 5000");
});