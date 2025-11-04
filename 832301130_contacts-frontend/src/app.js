// 全局变量
let contacts = [];
let currentEditId = null;
let confirmModal = null;
let toast = null;
// API基础URL
const API_BASE_URL = 'http://localhost:5000/api';

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 初始化Bootstrap组件
    confirmModal = new bootstrap.Modal(document.getElementById('confirm-modal'));
    toast = new bootstrap.Toast(document.getElementById('toast-message'));
    
    // 加载联系人数据
    loadContacts();
    
    // 绑定表单提交事件
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
    
    // 绑定取消按钮事件
    document.getElementById('cancel-btn').addEventListener('click', resetForm);
    
    // 绑定确认删除按钮事件
    document.getElementById('confirm-delete-btn').addEventListener('click', handleDeleteConfirmation);
    
    // 绑定搜索按钮事件
    document.getElementById('search-btn').addEventListener('click', handleSearch);
    
    // 绑定搜索输入框回车事件
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});

// 加载联系人数据
function loadContacts() {
    fetch(`${API_BASE_URL}/contacts`)
        .then(response => {
            if (!response.ok) {
                throw new Error('获取联系人失败');
            }
            return response.json();
        })
        .then(data => {
            contacts = data;
            renderContactsTable(data);
        })
        .catch(error => {
            console.error('加载联系人失败:', error);
            showToast('加载联系人失败，请检查后端服务是否运行', 'error');
        });
}

// 渲染联系人表格
function renderContactsTable(contactsToRender) {
    const tableBody = document.getElementById('contacts-table-body');
    tableBody.innerHTML = '';
    
    if (contactsToRender.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">暂无联系人数据</td>
            </tr>
        `;
        return;
    }
    
    contactsToRender.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email || '-'}</td>
            <td>${contact.address || '-'}</td>
            <td>${formatDate(contact.created_at)}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-warning me-1" onclick="editContact(${contact.id})">编辑</button>
                <button class="btn btn-sm btn-danger" onclick="confirmDelete(${contact.id})">删除</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 处理表单提交
function handleFormSubmit(event) {
    event.preventDefault();
    
    const contactData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim() || null,
        address: document.getElementById('address').value.trim() || null
    };
    
    if (currentEditId) {
        // 更新联系人
        updateContact(currentEditId, contactData);
    } else {
        // 添加联系人
        addContact(contactData);
    }
}

// 添加联系人
function addContact(contactData) {
    fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err.error || '添加联系人失败'; });
        }
        return response.json();
    })
    .then(newContact => {
        showToast('联系人添加成功');
        resetForm();
        loadContacts(); // 重新加载所有联系人
    })
    .catch(error => {
        console.error('添加联系人失败:', error);
        showToast(error || '添加联系人失败', 'error');
    });
}

// 更新联系人
function updateContact(id, contactData) {
    fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err.error || '更新联系人失败'; });
        }
        return response.json();
    })
    .then(updatedContact => {
        showToast('联系人更新成功');
        resetForm();
        loadContacts(); // 重新加载所有联系人
    })
    .catch(error => {
        console.error('更新联系人失败:', error);
        showToast(error || '更新联系人失败', 'error');
    });
}

// 编辑联系人
function editContact(id) {
    // 从数据库重新获取联系人数据，避免使用缓存
    fetch(`${API_BASE_URL}/contacts/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('获取联系人详情失败');
            }
            return response.json();
        })
        .then(contact => {
            currentEditId = id;
            document.getElementById('contact-id').value = contact.id;
            document.getElementById('name').value = contact.name;
            document.getElementById('phone').value = contact.phone;
            document.getElementById('email').value = contact.email || '';
            document.getElementById('address').value = contact.address || '';
            
            document.getElementById('form-title').textContent = '编辑联系人';
            document.getElementById('cancel-btn').classList.remove('d-none');
            
            // 滚动到表单位置
            document.querySelector('.card-header h2').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('获取联系人详情失败:', error);
            showToast('获取联系人详情失败', 'error');
        });
}

// 确认删除
function confirmDelete(id) {
    currentEditId = id;
    confirmModal.show();
}

// 处理删除确认
function handleDeleteConfirmation() {
    deleteContact(currentEditId);
    confirmModal.hide();
}

// 删除联系人
function deleteContact(id) {
    fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err.error || '删除联系人失败'; });
        }
        return response.json();
    })
    .then(() => {
        showToast('联系人删除成功');
        loadContacts(); // 重新加载所有联系人
    })
    .catch(error => {
        console.error('删除联系人失败:', error);
        showToast(error || '删除联系人失败', 'error');
    });
}

// 重置表单
function resetForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('contact-id').value = '';
    currentEditId = null;
    document.getElementById('form-title').textContent = '添加联系人';
    document.getElementById('cancel-btn').classList.add('d-none');
}

// 处理搜索
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderContactsTable(contacts);
        return;
    }
    
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.phone.includes(searchTerm) ||
        (contact.email && contact.email.toLowerCase().includes(searchTerm)) ||
        (contact.address && contact.address.toLowerCase().includes(searchTerm))
    );
    
    renderContactsTable(filteredContacts);
}

// 显示提示消息
function showToast(message, type = 'success') {
    const toastBody = document.getElementById('toast-body');
    toastBody.textContent = message;
    
    // 设置不同类型的样式
    if (type === 'error') {
        toastBody.classList.add('text-danger');
    } else {
        toastBody.classList.remove('text-danger');
    }
    
    toast.show();
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}
