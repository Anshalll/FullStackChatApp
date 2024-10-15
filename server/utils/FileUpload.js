import path from 'path'
import fs from 'fs'
import { GenerateOtp } from './GenerateVals.js';

export const FileUpload = (size , img , res , req , model , img_field) => {
    if (!img) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const arr_extension = ["image/png", "image/jpeg"];
    const file_mimetype = img.mimetype;


    if (img.size > size) {
        return res.status(400).json({ error: "Profile image size exceeded 5 mb" });

    }
    if (!arr_extension.includes(file_mimetype)) {
        return res.status(400).json({ error: "Only jpg and png file formats are allowed." });
    }

    const filename = img.name;

    const newFilename = GenerateOtp(20);
    const filext = path.extname(filename);
    const upload_path = path.join(path.resolve(), `/uploads/${img_field}/${newFilename}${filext}`);


    img.mv(upload_path, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed. Please try again.' });
        }

        try {
            const id = req.id;
            const dp_prev = await model.findOne({ belongsto: id });

            if (dp_prev && dp_prev[img_field]) {
                const file_prev = dp_prev[img_field].split('/');
              

                if (!file_prev.includes("defaults")) {
                
                    const file_name = file_prev[file_prev.length - 1];
                   

                    const file_path = path.join(path.resolve(), `/uploads/${img_field}/${file_name}`);

               

                    fs.unlink(file_path, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error deleting old file:', unlinkErr);
                        }
                    });
                }
            }

            const updatedData = await model.findOneAndUpdate(
                { belongsto: id },
                { [img_field]: `${process.env.SERVER_URI}/${img_field}/${newFilename}${filext}` },
                { new: true } 
            );

            res.status(200).json({ filepath: updatedData[img_field] });

        } catch (updateErr) {
            console.error('Error updating database:', updateErr);
            res.status(500).json({ error: 'Database update failed. Please try again.' });
        }
    });
}