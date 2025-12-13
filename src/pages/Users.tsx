import { useState } from "react";
import Button from "../components/ui/Button2";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";

type Role = "admin" | "member";

type User = {
  id: string;
  name: string;
  role: Role;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    { id: "u1", name: "Sama", role: "admin" },
    { id: "u2", name: "Ali Reza", role: "member" },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "member" as Role }); // ✅ فقط یکبار تعریف
  const [deleteCandidate, setDeleteCandidate] = useState<User | null>(null);

  // Modal handlers
  const openAddModal = () => {
    setForm({ name: "", role: "member" });
    setIsEditMode(false);
    setEditingUserId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setForm({ name: user.name, role: user.role });
    setIsEditMode(true);
    setEditingUserId(user.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUserId(null);
  };

  // Form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Add/Edit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (isEditMode && editingUserId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUserId ? { ...u, name: form.name, role: form.role } : u))
      );
    } else {
      const newUser: User = { id: String(Date.now()), name: form.name, role: form.role };
      setUsers((prev) => [newUser, ...prev]);
    }

    closeModal();
  };

  // Delete handlers
  const confirmDelete = (user: User) => setDeleteCandidate(user);
  const handleDelete = () => {
    if (!deleteCandidate) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteCandidate.id));
    setDeleteCandidate(null);
  };

  // Table columns
  const columns = [
    { header: "Name", accessor: "name" as const },
    { header: "Role", accessor: "role" as const },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Button onClick={openAddModal}>+ Add New User</Button>

      <Table
        columns={columns}
        data={users}
        renderActions={(user: User) => (
          <div className="flex gap-2">
            <Button onClick={() => openEditModal(user)}>Edit</Button>
            <Button color="red" onClick={() => confirmDelete(user)}>
              Delete
            </Button>
          </div>
        )}
      />

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block mb-1">Role:</label>
            <select
              name="role"
              value={form.role}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button color="gray" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteCandidate} onClose={() => setDeleteCandidate(null)}>
        <h2 className="text-xl font-semibold mb-2">Delete User?</h2>
        <p className="mb-4">
          Are you sure you want to delete <strong>{deleteCandidate?.name}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <Button color="gray" onClick={() => setDeleteCandidate(null)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
