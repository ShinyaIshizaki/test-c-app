'use strict';

// EC2インスタンスのパブリックDNSまたはIPアドレスを設定
// const SERVER_URL = 'http://YOUR_EC2_PUBLIC_DNS:8080'; // デプロイ時に実際のURLに変更

const SERVER_URL = 'http://localhost:8080'; // ローカルテスト用

async function callCProgram() {
    try {
        const response = await fetch(`${SERVER_URL}/run-test`);
        const data = await response.text();
        document.getElementById('result').textContent = data;
    } catch (error) {
        document.getElementById('result').textContent = 'Error: ' + error.message;
    }
}