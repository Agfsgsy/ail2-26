const defaultPermissions = [
  {
    id: "perm-analytics",
    name: "الوصول للتقارير التحليلية",
    description: "السماح بعرض لوحات الأداء والتقارير الشهرية.",
  },
  {
    id: "perm-users",
    name: "إدارة المستخدمين",
    description: "إضافة وتحديث وحذف حسابات المستخدمين.",
  },
];

const renderPermissionItem = (permission) => `
  <li class="permissions-item" data-id="${permission.id}">
    <div class="permissions-item__meta">
      <strong>${permission.name}</strong>
      <span>${permission.description}</span>
    </div>
    <div class="permissions-item__actions">
      <button class="secondary" data-action="edit">تعديل</button>
      <button class="secondary" data-action="delete">حذف</button>
    </div>
  </li>
`;

export default class PermissionsManager {
  constructor(container) {
    this.container = container;
    this.permissions = [...defaultPermissions];
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="grid grid--two">
        <form id="permission-form">
          <div class="form-group">
            <label for="permission-name">اسم الصلاحية</label>
            <input id="permission-name" name="permission-name" type="text" required />
          </div>
          <div class="form-group">
            <label for="permission-description">الوصف</label>
            <textarea id="permission-description" name="permission-description" rows="3" required></textarea>
          </div>
          <button class="primary" type="submit">إضافة الصلاحية</button>
        </form>
        <div>
          <h4>قائمة الصلاحيات</h4>
          <ul class="permissions-list" id="permissions-list"></ul>
        </div>
      </div>
    `;

    this.listElement = this.container.querySelector("#permissions-list");
    this.form = this.container.querySelector("#permission-form");
    this.nameInput = this.container.querySelector("#permission-name");
    this.descriptionInput = this.container.querySelector("#permission-description");

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addPermission({
        name: this.nameInput.value.trim(),
        description: this.descriptionInput.value.trim(),
      });
      this.form.reset();
    });

    this.listElement.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      const item = event.target.closest(".permissions-item");
      if (!item) return;

      const permissionId = item.dataset.id;
      if (button.dataset.action === "delete") {
        this.deletePermission(permissionId);
      }

      if (button.dataset.action === "edit") {
        this.editPermission(permissionId);
      }
    });

    this.syncList();
  }

  syncList() {
    this.listElement.innerHTML = this.permissions.map(renderPermissionItem).join("");
  }

  addPermission({ name, description }) {
    if (!name || !description) return;

    this.permissions.unshift({
      id: `perm-${Date.now()}`,
      name,
      description,
    });
    this.syncList();
  }

  deletePermission(id) {
    this.permissions = this.permissions.filter((perm) => perm.id !== id);
    this.syncList();
  }

  editPermission(id) {
    const permission = this.permissions.find((perm) => perm.id === id);
    if (!permission) return;

    const updatedName = window.prompt("تحديث اسم الصلاحية", permission.name);
    if (!updatedName) return;
    const updatedDescription = window.prompt("تحديث وصف الصلاحية", permission.description);
    if (!updatedDescription) return;

    permission.name = updatedName;
    permission.description = updatedDescription;
    this.syncList();
  }
}
