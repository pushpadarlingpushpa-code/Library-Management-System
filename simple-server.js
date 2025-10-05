const http = require('http');
const url = require('url');
const querystring = require('querystring');

// In-memory storage
let books = [
    { id: 1, title: "JavaScript Guide", author: "John Doe", category: "Programming", status: "available", addedDate: "2024-01-15" },
    { id: 2, title: "Node.js Basics", author: "Jane Smith", category: "Programming", status: "issued", addedDate: "2024-01-10" }
];

let members = [
    { id: 1, name: "Alice Johnson", email: "alice@email.com", phone: "123-456-7890", joinDate: "2024-01-01" },
    { id: 2, name: "Bob Wilson", email: "bob@email.com", phone: "098-765-4321", joinDate: "2024-01-05" }
];

let issues = [
    { id: 1, bookId: 2, memberId: 1, bookTitle: "Node.js Basics", memberName: "Alice Johnson", issueDate: "2024-01-20", dueDate: "2024-02-03" }
];

let bookIdCounter = 3;
let memberIdCounter = 3;
let issueIdCounter = 2;

// Admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password";

// Sessions (simple in-memory)
let sessions = {};

function generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function isAuthenticated(req) {
    const cookies = parseCookies(req.headers.cookie || '');
    const sessionId = cookies.sessionId;
    return sessions[sessionId] === true;
}

function parseCookies(cookieHeader) {
    const cookies = {};
    cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.trim().split('=');
        if (parts.length === 2) {
            cookies[parts[0]] = parts[1];
        }
    });
    return cookies;
}

function getMainHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Management System</title>
    <style>
        body {
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header h1 {
            color: #333;
            margin: 0;
            font-size: 2rem;
        }
        
        .logout-btn {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }
        
        .logout-btn:hover {
            background: #c0392b;
        }
        
        .nav-tabs {
            display: flex;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        .nav-tab {
            flex: 1;
            padding: 15px;
            text-align: center;
            background: #f8f9fa;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .nav-tab.active {
            background: #3498db;
            color: white;
        }
        
        .nav-tab:hover {
            background: #2980b9;
            color: white;
        }
        
        .content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            min-height: 500px;
        }
        
        .dashboard-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .stat-card h3 {
            margin: 0 0 10px 0;
            font-size: 2rem;
        }
        
        .stat-card p {
            margin: 0;
            opacity: 0.9;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            box-sizing: border-box;
        }
        
        .form-group input:focus, .form-group select:focus {
            border-color: #3498db;
            outline: none;
        }
        
        .btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        
        .btn:hover {
            background: #2980b9;
        }
        
        .btn-success {
            background: #27ae60;
        }
        
        .btn-success:hover {
            background: #229954;
        }
        
        .btn-danger {
            background: #e74c3c;
        }
        
        .btn-danger:hover {
            background: #c0392b;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .table th, .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .table th {
            background: #f8f9fa;
            font-weight: bold;
            color: #333;
        }
        
        .table tr:hover {
            background: #f8f9fa;
        }
        
        .status-available {
            color: #27ae60;
            font-weight: bold;
        }
        
        .status-issued {
            color: #e74c3c;
            font-weight: bold;
        }
        
        .hidden {
            display: none;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .nav-tabs {
                flex-direction: column;
            }
            
            .dashboard-stats {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Library Management System</h1>
            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
        
        <div class="nav-tabs">
            <button class="nav-tab active" onclick="showTab('dashboard')">Dashboard</button>
            <button class="nav-tab" onclick="showTab('books')">Books</button>
            <button class="nav-tab" onclick="showTab('members')">Members</button>
            <button class="nav-tab" onclick="showTab('issues')">Issue Books</button>
            <button class="nav-tab" onclick="showTab('returns')">Returns</button>
        </div>
        
        <div class="content">
            <!-- Dashboard Tab -->
            <div id="dashboard" class="tab-content">
                <h2>📊 Dashboard</h2>
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <h3 id="totalBooks">${books.length}</h3>
                        <p>Total Books</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="availableBooks">${books.filter(b => b.status === 'available').length}</h3>
                        <p>Available Books</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="issuedBooks">${books.filter(b => b.status === 'issued').length}</h3>
                        <p>Issued Books</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="totalMembers">${members.length}</h3>
                        <p>Total Members</p>
                    </div>
                </div>
                
                <h3>📈 Recent Activity</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Member</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${issues.map(issue => `
                            <tr>
                                <td>${issue.bookTitle}</td>
                                <td>${issue.memberName}</td>
                                <td>${new Date(issue.issueDate).toLocaleDateString()}</td>
                                <td>${new Date(issue.dueDate).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Books Tab -->
            <div id="books" class="tab-content hidden">
                <h2>📖 Books Management</h2>
                
                <form onsubmit="addBook(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Book Title</label>
                            <input type="text" id="bookTitle" required>
                        </div>
                        <div class="form-group">
                            <label>Author</label>
                            <input type="text" id="bookAuthor" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Category</label>
                            <select id="bookCategory" required>
                                <option value="">Select Category</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Programming">Programming</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="Biography">Biography</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>ISBN (Optional)</label>
                            <input type="text" id="bookISBN">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Add Book</button>
                </form>
                
                <h3>📚 All Books</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Added Date</th>
                        </tr>
                    </thead>
                    <tbody id="booksTable">
                        ${books.map(book => `
                            <tr>
                                <td>${book.id}</td>
                                <td>${book.title}</td>
                                <td>${book.author}</td>
                                <td>${book.category}</td>
                                <td class="status-${book.status}">${book.status.toUpperCase()}</td>
                                <td>${new Date(book.addedDate).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Members Tab -->
            <div id="members" class="tab-content hidden">
                <h2>👥 Members Management</h2>
                
                <form onsubmit="addMember(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="memberName" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="memberEmail" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="memberPhone" required>
                    </div>
                    <button type="submit" class="btn btn-success">Add Member</button>
                </form>
                
                <h3>👥 All Members</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Join Date</th>
                        </tr>
                    </thead>
                    <tbody id="membersTable">
                        ${members.map(member => `
                            <tr>
                                <td>${member.id}</td>
                                <td>${member.name}</td>
                                <td>${member.email}</td>
                                <td>${member.phone}</td>
                                <td>${new Date(member.joinDate).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Issues Tab -->
            <div id="issues" class="tab-content hidden">
                <h2>📤 Issue Books</h2>
                
                <form onsubmit="issueBook(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Select Book</label>
                            <select id="issueBookId" required>
                                <option value="">Select Available Book</option>
                                ${books.filter(book => book.status === 'available').map(book => `
                                    <option value="${book.id}">${book.title} - ${book.author}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Select Member</label>
                            <select id="issueMemberId" required>
                                <option value="">Select Member</option>
                                ${members.map(member => `
                                    <option value="${member.id}">${member.name} - ${member.email}</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Issue Book</button>
                </form>
                
                <h3>📋 Current Issues</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Issue ID</th>
                            <th>Book</th>
                            <th>Member</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody id="issuesTable">
                        ${issues.map(issue => `
                            <tr>
                                <td>${issue.id}</td>
                                <td>${issue.bookTitle}</td>
                                <td>${issue.memberName}</td>
                                <td>${new Date(issue.issueDate).toLocaleDateString()}</td>
                                <td>${new Date(issue.dueDate).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Returns Tab -->
            <div id="returns" class="tab-content hidden">
                <h2>📥 Return Books</h2>
                
                <form onsubmit="returnBook(event)">
                    <div class="form-group">
                        <label>Select Issue to Return</label>
                        <select id="returnIssueId" required>
                            <option value="">Select Book to Return</option>
                            ${issues.map(issue => `
                                <option value="${issue.id}">${issue.bookTitle} - ${issue.memberName}</option>
                            `).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success">Return Book</button>
                </form>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Remove active class from all nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.remove('hidden');
            
            // Add active class to clicked nav tab
            event.target.classList.add('active');
        }
        
        async function addBook(event) {
            event.preventDefault();
            
            const bookData = {
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                category: document.getElementById('bookCategory').value,
                isbn: document.getElementById('bookISBN').value
            };
            
            try {
                const response = await fetch('/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookData)
                });
                
                if (response.ok) {
                    alert('Book added successfully!');
                    location.reload();
                } else {
                    alert('Error adding book');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        async function addMember(event) {
            event.preventDefault();
            
            const memberData = {
                name: document.getElementById('memberName').value,
                email: document.getElementById('memberEmail').value,
                phone: document.getElementById('memberPhone').value
            };
            
            try {
                const response = await fetch('/api/members', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(memberData)
                });
                
                if (response.ok) {
                    alert('Member added successfully!');
                    location.reload();
                } else {
                    alert('Error adding member');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        async function issueBook(event) {
            event.preventDefault();
            
            const issueData = {
                bookId: document.getElementById('issueBookId').value,
                memberId: document.getElementById('issueMemberId').value
            };
            
            try {
                const response = await fetch('/api/issue', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(issueData)
                });
                
                if (response.ok) {
                    alert('Book issued successfully!');
                    location.reload();
                } else {
                    const error = await response.json();
                    alert('Error: ' + error.error);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        async function returnBook(event) {
            event.preventDefault();
            
            const returnData = {
                issueId: document.getElementById('returnIssueId').value
            };
            
            try {
                const response = await fetch('/api/return', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(returnData)
                });
                
                if (response.ok) {
                    alert('Book returned successfully!');
                    location.reload();
                } else {
                    alert('Error returning book');
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                fetch('/api/logout', { method: 'POST' })
                    .then(() => {
                        window.location.href = '/login';
                    });
            }
        }
    </script>
</body>
</html>
    `;
}

function getLoginHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Admin Login</title>
    <style>
        body {
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        
        .login-container h1 {
            color: #333;
            margin-bottom: 30px;
            font-size: 2rem;
        }
        
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus {
            border-color: #3498db;
            outline: none;
        }
        
        .login-btn {
            width: 100%;
            background: #3498db;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .login-btn:hover {
            background: #2980b9;
        }
        
        .error-message {
            color: #e74c3c;
            margin-top: 15px;
            padding: 10px;
            background: #fdf2f2;
            border-radius: 5px;
            display: none;
        }
        
        .demo-info {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            font-size: 0.9rem;
            color: #666;
        }
        
        .demo-info strong {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>📚 Library Admin</h1>
        <form onsubmit="login(event)">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="login-btn">Login</button>
        </form>
        
        <div class="error-message" id="errorMessage"></div>
        
        <div class="demo-info">
            <strong>Demo Credentials:</strong><br>
            Username: <strong>admin</strong><br>
            Password: <strong>password</strong>
        </div>
    </div>

    <script>
        async function login(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('errorMessage');
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password })
                });
                
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    errorDiv.textContent = 'Invalid username or password';
                    errorDiv.style.display = 'block';
                }
            } catch (error) {
                errorDiv.textContent = 'Login failed. Please try again.';
                errorDiv.style.display = 'block';
            }
        }
        
        // Auto-fill demo credentials for easy testing
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = 'password';
    </script>
</body>
</html>
    `;
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Helper function to get request body
    function getRequestBody(req) {
        return new Promise((resolve) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        });
    }

    try {
        // Routes
        if (pathname === '/login' && method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(getLoginHTML());
            
        } else if (pathname === '/api/login' && method === 'POST') {
            const body = await getRequestBody(req);
            const { username, password } = JSON.parse(body);
            
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                const sessionId = generateSessionId();
                sessions[sessionId] = true;
                
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/`
                });
                res.end(JSON.stringify({ message: 'Login successful' }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid credentials' }));
            }
            
        } else if (pathname === '/api/logout' && method === 'POST') {
            const cookies = parseCookies(req.headers.cookie || '');
            const sessionId = cookies.sessionId;
            if (sessionId) {
                delete sessions[sessionId];
            }
            
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Set-Cookie': 'sessionId=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
            });
            res.end(JSON.stringify({ message: 'Logged out' }));
            
        } else if (pathname === '/' && method === 'GET') {
            if (!isAuthenticated(req)) {
                res.writeHead(302, { 'Location': '/login' });
                res.end();
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(getMainHTML());
            
        } else if (pathname === '/api/books' && method === 'GET') {
            if (!isAuthenticated(req)) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(books));
            
        } else if (pathname === '/api/books' && method === 'POST') {
            if (!isAuthenticated(req)) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            const body = await getRequestBody(req);
            const { title, author, category, isbn } = JSON.parse(body);
            
            const book = {
                id: bookIdCounter++,
                title,
                author,
                category,
                isbn: isbn || '',
                status: 'available',
                addedDate: new Date().toISOString()
            };
            
            books.push(book);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book added successfully', book }));
            
        } else if (pathname === '/api/members' && method === 'GET') {
            if (!isAuthenticated(req)) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(members));
            
        } else if (pathname === '/api/members' && method === 'POST') {
            if (!isAuthenticated(req)) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            const body = await getRequestBody(req);
            const { name, email, phone } = JSON.parse(body);
            
            const member = {
                id: memberIdCounter++,
                name,
                email,
                phone,
                joinDate: new Date().toISOString()
            };
            
            members.push(member);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Member added successfully', member }));
            
        } else if (pathname === '/api/issue' && method === 'POST') {
            if (!isAuthenticated(req)) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            const body = await getRequestBody(req);
            const { bookId, memberId } = JSON.parse(body);
            
            const book = books.find(b => b.id === parseInt(bookId));
            const member = members.find(m => m.id === parseInt(memberId));
            
            if (!book || !member) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Book or member not found' }));
                return;
            }
            
            if (book.status !== 'available') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Book is not available' }));
                return;
            }
            
            book.status = 'issued';
            const issue = {
                id: issueIdCounter++,
                bookId: book.id,
                memberId: member.id,
                bookTitle: book.title,
                memberName: member.name,
                issueDate: new Date().toISOString(),
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
            };
            
            issues.push(issue);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book issued successfully', issue }));
            
        } else if (pathname === '/api/return' && method === 'POST') {
            if (!isAuthenticated(req)) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            const body = await getRequestBody(req);
            const { issueId } = JSON.parse(body);
            
            const issueIndex = issues.findIndex(i => i.id === parseInt(issueId));
            if (issueIndex === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Issue not found' }));
                return;
            }
            
            const issue = issues[issueIndex];
            const book = books.find(b => b.id === issue.bookId);
            
            if (book) {
                book.status = 'available';
            }
            
            issues.splice(issueIndex, 1);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book returned successfully' }));
            
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page Not Found</h1>');
        }
        
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
});

server.listen(3000, () => {
    console.log('🚀 Complete Library Management System running on http://localhost:3000');
    console.log('📚 Features: Admin Login, Dashboard, Books, Members, Issue/Return');
    console.log('👤 Login: username="admin", password="password"');
    console.log('🌐 Open http://localhost:3000 in your browser');
});
