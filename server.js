const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');
const app = express();

// 環境変数からポート番号を取得（デフォルト: 8080）
const PORT = process.env.PORT || 8080;

// CORSの設定
const corsOptions = {
    origin: '*', // 本番環境では適切なオリジンに制限することを推奨
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, '/')));

// セキュリティヘッダーの設定
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// C言語プログラムを実行するエンドポイント
app.get('/run-test', (req, res) => {
    // Windows環境での実行ファイルパス
    const execPath = path.join(__dirname, 'test.exe');
    
    exec(execPath, (error, stdout, stderr) => {
        if (error) {
            console.error(`実行エラー: ${error}`);
            return res.status(500).send(`Error executing program: ${error.message}`);
        }
        if (stderr) {
            console.error(`標準エラー: ${stderr}`);
        }
        // プログラムの出力をクライアントに送信
        res.send(stdout);
    });
});

// エラーハンドリング
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// サーバーを起動
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});