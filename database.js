const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product TEXT NOT NULL,
        amount REAL NOT NULL,
        quantity INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

function initSampleData() {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    
    if (userCount.count === 0) {
        const insertUser = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
        insertUser.run('张三', 'zhangsan@example.com', 28);
        insertUser.run('李四', 'lisi@example.com', 34);
        insertUser.run('王五', 'wangwu@example.com', 25);
        insertUser.run('赵六', 'zhaoliu@example.com', 31);
        
        const insertOrder = db.prepare('INSERT INTO orders (user_id, product, amount, quantity) VALUES (?, ?, ?, ?)');
        insertOrder.run(1, '笔记本电脑', 5999.00, 1);
        insertOrder.run(1, '无线鼠标', 159.00, 2);
        insertOrder.run(2, '机械键盘', 899.00, 1);
        insertOrder.run(3, '显示器', 1299.00, 2);
        insertOrder.run(4, '耳机', 299.00, 1);
        
        console.log('示例数据初始化成功');
    }
}

function query(sql, params = []) {
    const stmt = db.prepare(sql);
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
        if (params.length > 0) {
            return stmt.all(...params);
        }
        return stmt.all();
    } else {
        if (params.length > 0) {
            return stmt.run(...params);
        }
        return stmt.run();
    }
}

function execute(sql, params = []) {
    const stmt = db.prepare(sql);
    if (params.length > 0) {
        return stmt.run(...params);
    }
    return stmt.run();
}

initSampleData();

module.exports = {
    query,
    execute,
    initSampleData,
    db
};
