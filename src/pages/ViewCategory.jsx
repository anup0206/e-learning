import React, { useState } from 'react';
import useCategories from '../hooks/useCategories';
import { FaSpinner } from 'react-icons/fa'; // Spinner icon

const ViewCategory = () => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const {
    data: categories = [],
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description) return;

    if (editingId) {
      updateCategory.mutate(
        { id: editingId, categoryData: form },
        {
          onSuccess: () => {
            setForm({ title: '', description: '' });
            setEditingId(null);
          },
        }
      );
    } else {
      createCategory.mutate(form, {
        onSuccess: () => setForm({ title: '', description: '' }),
      });
    }
  };

  const handleEdit = (cat) => {
    setForm({ title: cat.title, description: cat.description });
    setEditingId(cat._id);
  };

  const handleCancelEdit = () => {
    setForm({ title: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pt-20">
      <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Category' : 'Create Category'}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({
            ...form, description: e.target.value
          })}
          className="w-full p-2 border rounded"
        ></textarea>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
            disabled={createCategory.isPending || updateCategory.isPending}
          >
            {(createCategory.isPending || updateCategory.isPending) ? (
              <FaSpinner className="animate-spin" />
            ) : null}
            {editingId ? 'Update Category' : 'Create Category'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Display */}
      {isLoading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="p-6 bg-gray-100 rounded-lg shadow-md flex justify-between items-center flex-wrap w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] gap-2"
            >
              <div className=" flex-1">
                <h3 className="text-lg font-semibold">{cat.title}</h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>

              <div className="flex gap-3 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory.mutate(cat._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-2"
                  disabled={deleteCategory.isPending}
                >
                  {deleteCategory.isPending ? <FaSpinner className="animate-spin" /> : null}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCategory;