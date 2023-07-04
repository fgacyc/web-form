import PubSub from 'pubsub-js';

export function updateSelectedDepartment(departmentName, boolValue) {
    // 从本地存储获取数组
    let selectedDepartments = JSON.parse(localStorage.getItem('cyc-department-selected')) || [];

    if (boolValue) {
        // 将部门名称添加到数组中（如果尚未存在）
        if (!selectedDepartments.includes(departmentName)) {
            selectedDepartments.push(departmentName);
        }
    } else {
        // 从数组中删除部门名称（如果存在）
        const index = selectedDepartments.indexOf(departmentName);
        if (index !== -1) {
            selectedDepartments.splice(index, 1);
        }
    }

    // 将更新后的数组存回本地存储
    localStorage.setItem('cyc-department-selected', JSON.stringify(selectedDepartments));
    sendDepartmentNumToLogo(selectedDepartments.length);
}

function sendDepartmentNumToLogo(num){
    PubSub.publish('departmentsNum', { message: num });
}