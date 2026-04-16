const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/json', (req, res) => {
    const jsonData = req.body;
    console.log('收到JSON数据:', jsonData);
    res.json({
        success: true,
        message: 'JSON数据接收成功',
        data: jsonData,
        timestamp: new Date().toISOString()
    });
});

app.get('/api/json', (req, res) => {
    const responseData = {
        success: true,
        message: '这是返回的JSON数据',
        data: {
            users: [
                { id: 1, name: '张三', email: 'zhangsan@example.com' },
                { id: 2, name: '李四', email: 'lisi@example.com' },
                { id: 3, name: '王五', email: 'wangwu@example.com' }
            ],
            orders: [
                { id: 101, userId: 1, product: '产品A', amount: 299.99 },
                { id: 102, userId: 2, product: '产品B', amount: 199.99 },
                { id: 103, userId: 1, product: '产品C', amount: 399.99 }
            ]
        },
        timestamp: new Date().toISOString()
    };
    res.json(responseData);
});

app.post('/api/sql', (req, res) => {
    const { sql, params } = req.body;
    
    if (!sql) {
        return res.status(400).json({
            success: false,
            error: 'SQL语句不能为空'
        });
    }
    
    try {
        const result = database.execute(sql, params || []);
        res.json({
            success: true,
            message: 'SQL执行成功',
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/sql', (req, res) => {
    const { query } = req.query;
    
    if (!query) {
        return res.status(400).json({
            success: false,
            error: '查询参数不能为空'
        });
    }
    
    try {
        const result = database.query(query);
        res.json({
            success: true,
            message: '查询成功',
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.get('/api/init-database', (req, res) => {
    try {
        database.initSampleData();
        res.json({
            success: true,
            message: '数据库初始化成功',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('API端点:');
    console.log('  POST /api/json - 接收JSON数据');
    console.log('  GET /api/json - 获取JSON数据');
    console.log('  POST /api/sql - 执行SQL语句');
    console.log('  GET /api/sql - 查询SQL数据');
    console.log('  GET /api/init-database - 初始化示例数据');
});
