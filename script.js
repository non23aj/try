document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById(button.dataset.modal).style.display = "block";
    });
});

document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        closeBtn.parentElement.parentElement.style.display = "none";
    });
});

function addIncome() {
    let amount = parseFloat(document.getElementById("incomeInput").value);
    if (!isNaN(amount) && amount > 0) {
        let currentIncome = parseFloat(document.getElementById("income").textContent.replace("$", ""));
        document.getElementById("income").textContent = '$${(currentIncome + amount).toFixed(2)}';
    }
}

function addExpense() {
    let amount = parseFloat(document.getElementById("expenseInput").value);
    if (!isNaN(amount) && amount > 0) {
        let currentExpenses = parseFloat(document.getElementById("expenses").textContent.replace("$", ""));
        document.getElementById("expenses").textContent =' $${(currentExpenses + amount).toFixed(2)}';
    }
}
function addGoal() {
    let name = document.getElementById("goalName").value;
    let amount = document.getElementById("goalAmount").value;
    
    if (name && amount > 0) {
        let goalList = document.getElementById("goalList");
        let li = document.createElement("li");
        li.textContent = '${name} - $${amount}';
        goalList.appendChild(li);

        document.getElementById("goalName").value = "";
        document.getElementById("goalAmount").value = "";
    }
}
// تحديد الحد الأقصى للنفقات
const expenseLimit = 1000; // يمكن تغييره حسب الحاجة

function checkExpenses() {
    let totalExpenses = calculateTotalExpenses();
    if (totalExpenses > expenseLimit) {
        'showNotification(Warning: You have exceeded your expense limit of $${expenseLimit}!)';
    }
}

// دالة لحساب إجمالي النفقات (يتم استدعاؤها بعد كل إضافة)
function calculateTotalExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// دالة عرض الإشعار داخل الموقع
function showNotification(message) {
    let notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000); // يختفي بعد 5 ثوانٍ
}

// استدعاء الفحص عند إضافة مصروف جديد
function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = parseFloat(document.getElementById("expenseAmount").value);
    
    if (name && amount > 0) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({ name, amount });
        localStorage.setItem("expenses", JSON.stringify(expenses));

        document.getElementById("expenseName").value = "";
        document.getElementById("expenseAmount").value = "";

        checkExpenses(); // التحقق بعد كل إضافة
    }
}
function updateExpenseLimit() {
    let newLimit = document.getElementById("newExpenseLimit").value;
    if (newLimit > 0) {
        localStorage.setItem("expenseLimit", newLimit);
        alert("Expense limit updated successfully!");
    }
}
function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem("expenses")) || [];
    let list = document.getElementById("transactionList");
    list.innerHTML = "";
    transactions.forEach((tx) => {
        let li = document.createElement("li");
        li.textContent = '${tx.name}: $${tx.amount}';
        list.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadTransactions);