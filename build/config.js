"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const app = express();
const port = 8822;
// 后续请求转发用到
const request = require('request');
const mockData = require('./mockData');
app.use(express.static(path.join(__dirname, 'build')));
// app.use((req, res) => {
//     res.status(404).redirect('/');
// });
app.get('/api/table/articles', (req, res) => {
    res.json({
        errno: 0,
        data: mockData.articlesTableData,
        total: 100
    });
});
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => console.log(`server is listening on port ${port}!`));
