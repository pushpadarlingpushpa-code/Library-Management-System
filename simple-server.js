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
            background: rgba(255, 255, 255, 0.95);
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .header h1 {
            color: #333;
            margin: 0;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .login-container {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            margin: 50px auto;
        }

        .main-content {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .nav-buttons {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .btn-logout {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            margin-left: auto;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .stat-card h3 {
            margin: 0 0 10px 0;
            font-size: 2.5em;
        }

        .stat-card p {
            margin: 0;
            font-size: 1.1em;
            opacity: 0.9;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .data-table th {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: bold;
        }

        .data-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }

        .data-table tr:hover {
            background-color: #f8f9ff;
        }

        .action-btn {
            padding: 6px 12px;
            margin: 2px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        }

        .edit-btn {
            background: #4CAF50;
            color: white;
        }

        .delete-btn {
            background: #f44336;
            color: white;
        }

        .return-btn {
            background: #ff9800;
            color: white;
        }

        .action-btn:hover {
            transform: scale(1.05);
        }

        .search-box {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            background: white;
        }

        .search-box:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
        }

        .hidden {
            display: none;
        }

        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
        }

        .error-message {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
            .nav-buttons {
                flex-direction: column;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .data-table {
                font-size: 14px;
            }
            
            .data-table th, .data-table td {
                padding: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Library Management System</h1>
        </div>

        <!-- Login Screen -->
        <div id="loginScreen" class="login-container">
            <h2 style="text-align: center; color: #333; margin-bottom: 30px;">🔐 Admin Login</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn" style="width: 100%;">Login</button>
            </form>
            <div id="loginError" class="error-message hidden">
                Invalid username or password!
            </div>

        </div>

        <!-- Main Application -->
        <div id="mainApp" class="hidden">
            <!-- Navigation -->
            <div class="main-content">
                <div class="nav-buttons">
                    <button class="btn" onclick="showDashboard()">📊 Dashboard</button>
                    <button class="btn" onclick="showBooks()">📚 Books</button>
                    <button class="btn" onclick="showMembers()">👥 Members</button>
                    <button class="btn" onclick="showIssueReturn()">📖 Issue/Return</button>
                    <button class="btn btn-logout" onclick="logout()">🚪 Logout</button>
                </div>
            </div>

            <!-- Dashboard -->
            <div id="dashboard" class="main-content">
                <h2>📊 Library Dashboard</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3 id="totalBooks">0</h3>
                        <p>Total Books</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="totalMembers">0</h3>
                        <p>Total Members</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="issuedBooks">0</h3>
                        <p>Books Issued</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="availableBooks">0</h3>
                        <p>Available Books</p>
                    </div>
                </div>
                <div id="dashboardMessage" class="success-message">
                    Welcome to the Library Management System! 🎉<br>
                    <strong>Security Update:</strong> Login credentials have been changed for better security.
                </div>
            </div>

            <!-- Books Section -->
            <div id="booksSection" class="main-content hidden">
                <h2>📚 Book Management</h2>
                
                <!-- Add Book Form -->
                <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>➕ Add New Book</h3>
                    <form id="addBookForm">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <div class="form-group">
                                <label for="bookTitle">Title:</label>
                                <input type="text" id="bookTitle" required>
                            </div>
                            <div class="form-group">
                                <label for="bookAuthor">Author:</label>
                                <input type="text" id="bookAuthor" required>
                            </div>
                            <div class="form-group">
                                <label for="bookISBN">ISBN:</label>
                                <input type="text" id="bookISBN" required>
                            </div>
                            <div class="form-group">
                                <label for="bookCategory">Category:</label>
                                <select id="bookCategory" required>
                                    <option value="">Select Category</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-Fiction">Non-Fiction</option>
                                    <option value="Science">Science</option>
                                    <option value="Technology">Technology</option>
                                    <option value="History">History</option>
                                    <option value="Biography">Biography</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn" style="margin-top: 15px;">Add Book</button>
                    </form>
                </div>

                <!-- Search Books -->
                <input type="text" id="bookSearch" class="search-box" placeholder="🔍 Search books by title, author, or ISBN...">
                
                <!-- Books Table -->
                <table class="data-table" id="booksTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="booksTableBody">
                    </tbody>
                </table>
            </div>

            <!-- Members Section -->
            <div id="membersSection" class="main-content hidden">
                <h2>👥 Member Management</h2>
                
                <!-- Add Member Form -->
                <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>➕ Register New Member</h3>
                    <form id="addMemberForm">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            <div class="form-group">
                                <label for="memberName">Full Name:</label>
                                <input type="text" id="memberName" required>
                            </div>
                            <div class="form-group">
                                <label for="memberEmail">Email:</label>
                                <input type="email" id="memberEmail" required>
                            </div>
                            <div class="form-group">
                                <label for="memberPhone">Phone:</label>
                                <input type="tel" id="memberPhone" required>
                            </div>
                            <div class="form-group">
                                <label for="memberAddress">Address:</label>
                                <input type="text" id="memberAddress" required>
                            </div>
                        </div>
                        <button type="submit" class="btn" style="margin-top: 15px;">Register Member</button>
                    </form>
                </div>

                <!-- Search Members -->
                <input type="text" id="memberSearch" class="search-box" placeholder="🔍 Search members by name, email, or phone...">
                
                <!-- Members Table -->
                <table class="data-table" id="membersTable">
                    <thead>
                        <tr>
                            <th>Member ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Join Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="membersTableBody">
                    </tbody>
                </table>
            </div>

            <!-- Issue/Return Section -->
            <div id="issueReturnSection" class="main-content hidden">
                <h2>📖 Issue & Return Books</h2>
                
                <!-- Issue Book Form -->
                <div style="background: #f8f9ff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3>📤 Issue Book</h3>
                    <form id="issueBookForm">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                            <div class="form-group">
                                <label for="issueBookSelect">Select Book:</label>
                                <select id="issueBookSelect" required>
                                    <option value="">Choose a book...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="issueMemberSelect">Select Member:</label>
                                <select id="issueMemberSelect" required>
                                    <option value="">Choose a member...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="issueDate">Issue Date:</label>
                                <input type="date" id="issueDate" required>
                            </div>
                            <div class="form-group">
                                <label for="returnDate">Expected Return Date:</label>
                                <input type="date" id="returnDate" required>
                            </div>
                        </div>
                        <button type="submit" class="btn" style="margin-top: 15px;">Issue Book</button>
                    </form>
                </div>

                <!-- Search Issued Books -->
                <input type="text" id="issuedSearch" class="search-box" placeholder="🔍 Search issued books...">
                
                <!-- Issued Books Table -->
                <table class="data-table" id="issuedBooksTable">
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Member Name</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="issuedBooksTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script>
        // Data Storage
        let books = [
            { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", category: "Fiction", status: "Available" },
            { id: 2, title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", category: "Fiction", status: "Available" },
            { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", category: "Fiction", status: "Available" }
        ];

        let members = [
            { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St", joinDate: "2024-01-15" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", address: "456 Oak Ave", joinDate: "2024-02-20" }
        ];

        let issuedBooks = [];
        let currentView = 'dashboard';

        // Authentication
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Updated authentication with new credentials
            if (username === 'librarian' && password === 'LibraryAdmin2025!') {
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('mainApp').classList.remove('hidden');
                showDashboard();
            } else {
                document.getElementById('loginError').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('loginError').classList.add('hidden');
                }, 3000);
            }
        });

        function logout() {
            document.getElementById('mainApp').classList.add('hidden');
            document.getElementById('loginScreen').classList.remove('hidden');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }

        // Navigation Functions
        function hideAllSections() {
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('booksSection').classList.add('hidden');
            document.getElementById('membersSection').classList.add('hidden');
            document.getElementById('issueReturnSection').classList.add('hidden');
        }

        function showDashboard() {
            hideAllSections();
            document.getElementById('dashboard').classList.remove('hidden');
            updateDashboardStats();
            currentView = 'dashboard';
        }

        function showBooks() {
            hideAllSections();
            document.getElementById('booksSection').classList.remove('hidden');
            renderBooksTable();
            currentView = 'books';
        }

        function showMembers() {
            hideAllSections();
            document.getElementById('membersSection').classList.remove('hidden');
            renderMembersTable();
            currentView = 'members';
        }

        function showIssueReturn() {
            hideAllSections();
            document.getElementById('issueReturnSection').classList.remove('hidden');
            updateBookAndMemberSelects();
            renderIssuedBooksTable();
            setDefaultDates();
            currentView = 'issueReturn';
        }

        // Dashboard Functions
        function updateDashboardStats() {
            document.getElementById('totalBooks').textContent = books.length;
            document.getElementById('totalMembers').textContent = members.length;
            document.getElementById('issuedBooks').textContent = issuedBooks.length;
            document.getElementById('availableBooks').textContent = books.filter(book => book.status === 'Available').length;
        }

        // Book Management
        document.getElementById('addBookForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const newBook = {
                id: books.length + 1,
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                isbn: document.getElementById('bookISBN').value,
                category: document.getElementById('bookCategory').value,
                status: 'Available'
            };
            
            books.push(newBook);
            renderBooksTable();
            this.reset();
            showSuccessMessage('Book added successfully! 📚');
        });

        function renderBooksTable() {
            const tbody = document.getElementById('booksTableBody');
            tbody.innerHTML = '';
            
            books.forEach(book => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${book.category}</td>
                    <td><span style="color: ${book.status === 'Available' ? 'green' : 'red'};">${book.status}</span></td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editBook(${book.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteBook(${book.id})">Delete</button>
                    </td>
                `;
            });
        }

        function deleteBook(id) {
            if (confirm('Are you sure you want to delete this book?')) {
                books = books.filter(book => book.id !== id);
                renderBooksTable();
                showSuccessMessage('Book deleted successfully! 🗑️');
            }
        }

        // Member Management
        document.getElementById('addMemberForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const newMember = {
                id: members.length + 1,
                name: document.getElementById('memberName').value,
                email: document.getElementById('memberEmail').value,
                phone: document.getElementById('memberPhone').value,
                address: document.getElementById('memberAddress').value,
                joinDate: new Date().toISOString().split('T')[0]
            };
            
            members.push(newMember);
            renderMembersTable();
            this.reset();
            showSuccessMessage('Member registered successfully! 👥');
        });

        function renderMembersTable() {
            const tbody = document.getElementById('membersTableBody');
            tbody.innerHTML = '';
            
            members.forEach(member => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>M${member.id.toString().padStart(3, '0')}</td>
                    <td>${member.name}</td>
                    <td>${member.email}</td>
                    <td>${member.phone}</td>
                    <td>${member.address}</td>
                    <td>${member.joinDate}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editMember(${member.id})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteMember(${member.id})">Delete</button>
                    </td>
                `;
            });
        }

        function deleteMember(id) {
            if (confirm('Are you sure you want to delete this member?')) {
                members = members.filter(member => member.id !== id);
                renderMembersTable();
                showSuccessMessage('Member deleted successfully! 🗑️');
            }
        }

        // Issue/Return Management
        function updateBookAndMemberSelects() {
            const bookSelect = document.getElementById('issueBookSelect');
            const memberSelect = document.getElementById('issueMemberSelect');
            
            bookSelect.innerHTML = '<option value="">Choose a book...</option>';
            memberSelect.innerHTML = '<option value="">Choose a member...</option>';
            
            books.filter(book => book.status === 'Available').forEach(book => {
                bookSelect.innerHTML += `<option value="${book.id}">${book.title} - ${book.author}</option>`;
            });
            
            members.forEach(member => {
                memberSelect.innerHTML += `<option value="${member.id}">${member.name}</option>`;
            });
        }

        function setDefaultDates() {
            const today = new Date();
            const returnDate = new Date(today);
            returnDate.setDate(today.getDate() + 14); // 2 weeks from today
            
            document.getElementById('issueDate').value = today.toISOString().split('T')[0];
            document.getElementById('returnDate').value = returnDate.toISOString().split('T')[0];
        }

        document.getElementById('issueBookForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const bookId = parseInt(document.getElementById('issueBookSelect').value);
            const memberId = parseInt(document.getElementById('issueMemberSelect').value);
            const issueDate = document.getElementById('issueDate').value;
            const returnDate = document.getElementById('returnDate').value;
            
            const book = books.find(b => b.id === bookId);
            const member = members.find(m => m.id === memberId);
            
            if (book && member) {
                const issuedBook = {
                    id: issuedBooks.length + 1,
                    bookId: bookId,
                    bookTitle: book.title,
                    memberId: memberId,
                    memberName: member.name,
                    issueDate: issueDate,
                    returnDate: returnDate,
                    status: 'Issued'
                };
                
                issuedBooks.push(issuedBook);
                book.status = 'Issued';
                
                renderIssuedBooksTable();
                updateBookAndMemberSelects();
                this.reset();
                setDefaultDates();
                showSuccessMessage('Book issued successfully! 📤');
            }
        });

        function renderIssuedBooksTable() {
            const tbody = document.getElementById('issuedBooksTableBody');
            tbody.innerHTML = '';
            
            issuedBooks.forEach(issued => {
                const row = tbody.insertRow();
                const today = new Date();
                const returnDate = new Date(issued.returnDate);
                const isOverdue = today > returnDate && issued.status === 'Issued';
                
                row.innerHTML = `
                    <td>${issued.bookTitle}</td>
                    <td>${issued.memberName}</td>
                    <td>${issued.issueDate}</td>
                    <td>${issued.returnDate}</td>
                    <td><span style="color: ${isOverdue ? 'red' : (issued.status === 'Returned' ? 'green' : 'orange')};">
                        ${isOverdue ? 'Overdue' : issued.status}
                    </span></td>
                    <td>
                        ${issued.status === 'Issued' ? 
                            `<button class="action-btn return-btn" onclick="returnBook(${issued.id})">Return</button>` : 
                            'Returned'
                        }
                    </td>
                `;
            });
        }

        function returnBook(issuedId) {
            const issuedBook = issuedBooks.find(ib => ib.id === issuedId);
            if (issuedBook) {
                issuedBook.status = 'Returned';
                const book = books.find(b => b.id === issuedBook.bookId);
                if (book) {
                    book.status = 'Available';
                }
                renderIssuedBooksTable();
                updateBookAndMemberSelects();
                showSuccessMessage('Book returned successfully! 📥');
            }
        }

        // Search Functions
        document.getElementById('bookSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#booksTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        document.getElementById('memberSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#membersTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        document.getElementById('issuedSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#issuedBooksTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        // Utility Functions
        function showSuccessMessage(message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'success-message';
            messageDiv.textContent = message;
            messageDiv.style.position = 'fixed';
            messageDiv.style.top = '20px';
            messageDiv.style.right = '20px';
            messageDiv.style.zIndex = '1000';
            messageDiv.style.maxWidth = '300px';
            
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 3000);
        }

        // Initialize the application
        showDashboard();
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'989bab6704681daf',t:'MTc1OTY1NDIwNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
