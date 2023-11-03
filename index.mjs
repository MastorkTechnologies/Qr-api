import express from 'express';
import { client } from "@gradio/client";
import { writeFile } from 'fs/promises';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/', async (req, res) => {
    try {
        const { url, prompt, negativePrompt, controlnetConditioningScale, strength, guidanceScale, seed} = req.body;
        const app = await client("https://huggingface-projects-qr-code-ai-art-generator.hf.space/");
        const result = await app.predict(0, [
            url,
            prompt,
            negativePrompt,
            controlnetConditioningScale,
            strength,
            guidanceScale,
            seed,
            ,
            ,
            true,
            "DPM++ Karras SDE"
        ]);

        
        // Code to write the result in qrcode.text
        if (result?.data) {
            const fileName = 'qrcode.txt';

            // Write the result.data to a file
            await writeFile(fileName, result.data, 'utf-8');
            console.log('Data has been written to the file successfully.');
        } else {
            console.log('Result data is null or undefined.');
        }
        
        console.log(result?.data);
        res.status(200).json({message: "Successful"});
    } catch (error) {
        console.error('Error loading data module:', error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
