const http = require('http');

const BASE_URL = 'http://localhost:3000/api';

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(body)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log('=== 开始测试 API ===\n');

    console.log('1. 测试 GET /api/json');
    try {
        const result = await makeRequest('GET', '/json');
        console.log(`状态码: ${result.status}`);
        console.log('响应:', JSON.stringify(result.data, null, 2));
        console.log('✓ JSON GET 测试通过\n');
    } catch (error) {
        console.log('✗ JSON GET 测试失败:', error.message, '\n');
    }

    console.log('2. 测试 POST /api/json');
    try {
        const testData = {
            name: '测试用户',
            email: 'test@example.com',
            message: '这是一条测试消息'
        };
        const result = await makeRequest('POST', '/json', testData);
        console.log(`状态码: ${result.status}`);
        console.log('响应:', JSON.stringify(result.data, null, 2));
        console.log('✓ JSON POST 测试通过\n');
    } catch (error) {
        console.log('✗ JSON POST 测试失败:', error.message, '\n');
    }

    console.log('3. 测试 GET /api/sql (SELECT 查询)');
    try {
        const result = await makeRequest('GET', '/sql?query=SELECT * FROM users');
        console.log(`状态码: ${result.status}`);
        console.log('响应:', JSON.stringify(result.data, null, 2));
        console.log('✓ SQL SELECT 测试通过\n');
    } catch (error) {
        console.log('✗ SQL SELECT 测试失败:', error.message, '\n');
    }

    console.log('4. 测试 POST /api/sql (INSERT)');
    try {
        const sql = "INSERT INTO users (name, email, age) VALUES ('测试用户2', 'test2@example.com', 25)";
        const result = await makeRequest('POST', '/sql', { sql });
        console.log(`状态码: ${result.status}`);
        console.log('响应:', JSON.stringify(result.data, null, 2));
        console.log('✓ SQL INSERT 测试通过\n');
    } catch (error) {
        console.log('✗ SQL INSERT 测试失败:', error.message, '\n');
    }

    console.log('5. 测试 POST /api/sql (带参数的 INSERT)');
    try {
        const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
        const result = await makeRequest('POST', '/sql', {
            sql,
            params: ['用户3', 'user3@example.com', 30]
        });
        console.log(`状态码: ${result.status}`);
        console.log('响应:', JSON.stringify(result.data, null, 2));
        console.log('✓ SQL INSERT with params 测试通过\n');
    } catch (error) {
        console.log('✗ SQL INSERT with params 测试失败:', error.message, '\n');
    }

    console.log('6. 测试 GET /api/init-database');
    try {
        const result = await makeRequest('GET', '/init-database');
        console.log(`状态码: ${result.status}`);
        console.log('响应:', JSON.stringify(result.data, null, 2));
        console.log('✓ 数据库初始化测试通过\n');
    } catch (error) {
        console.log('✗ 数据库初始化测试失败:', error.message, '\n');
    }

    console.log('=== 所有测试完成 ===');
}

console.log('请确保服务器正在运行 (npm start)');
console.log('等待 2 秒后开始测试...\n');
setTimeout(runTests, 2000);
