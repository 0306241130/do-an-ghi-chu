const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());


app.use(express.json());

const profilePath = path.join(
    __dirname,
    'data',
    'profile.json'
);

app.get('/api/profile', (req, res) => {
    try {
        const data = fs.readFileSync(
            profilePath,
            'utf8'
        );

        const profile = JSON.parse(data);

        res.json(profile);

    } catch (error) {
        console.error('Lỗi đọc profile:', error);

        res.status(500).json({
            message: 'Không thể đọc file profile.json'
        });
    }
});

app.put('/api/profile', (req, res) => {
    try {
        const { displayName, theme, password } = req.body;

        const profile = {
            displayName: displayName,
            theme: theme,
            password: password
        };

        fs.writeFileSync(
            profilePath,
            JSON.stringify(profile, null, 2),
            'utf8'
        );

        res.json({
            message: 'Cập nhật profile thành công',
            profile: profile
        });

    } catch (error) {
        console.error('Lỗi cập nhật profile:', error);

        res.status(500).json({
            message: 'Không thể cập nhật profile.json'
        });
    }
});

app.listen(PORT, () => {
    console.log(
        `Backend đang chạy tại http://localhost:${PORT}`
    );
});