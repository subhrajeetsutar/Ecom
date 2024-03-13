import React, { useEffect, useState } from "react";
import Layout from "@/Components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
function Categories({ swal }) {
  const [editCategory, setEditCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editCategory) {
      data._id = editCategory._id;
      await axios.put("/api/categories", data);
      setEditCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }
  function editedCategory(category) {
    setEditCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({name,values})=>({
      name,
      values: values.join(',')
    }))
    );
  }
  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you Sure?",
        text: `Do you want to delete ${category.name}`,
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        confirmButtonColor: "#d55",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }
  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValueChange(index, property, newValue) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editCategory ? `Edit Category: ${editCategory.name}` : "Category name"}
      </label>
      <div className="flex gap-1">
        <form onSubmit={saveCategory}>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder={"Category Name"}
              onChange={(ev) => setName(ev.target.value)}
              value={name}
            />
            <select
              onChange={(ev) => setParentCategory(ev.target.value)}
              value={parentCategory}
            >
              <option value="">No Parent Category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block">Properties</label>
            <button
              type="button"
              className="btn-default text-sm mb-2"
              onClick={addProperty}
            >
              Add new property
            </button>
            {properties.length > 0 &&
              properties.map((property, index) => (
                <div className="flex gap-1 mb-2">
                  <input
                    type="text"
                    className="mb-0"
                    value={property.name}
                    placeholder="Property name"
                    onChange={(ev) =>
                      handlePropertyNameChange(index, property, ev.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="mb-0"
                    value={property.values}
                    placeholder="Values"
                    onChange={(ev) =>
                      handlePropertyValueChange(
                        index,
                        property,
                        ev.target.value
                      )
                    }
                  />
                  <button
                    className="btn-default"
                    onClick={() => removeProperty(index)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <div className="flex gap-1">
            {editCategory && (
              <button
                className="btn-default py-1"
                type="button"
                onClick={() => {
                  setEditCategory(null);
                  setName("");
                  setParentCategory("");
                  setProperties([]);
                }}
              >
                Cancel
              </button>
            )}
            <button className="btn-primary py-1" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
      {!editCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <div className="flex">
                      <button
                        onClick={() => editedCategory(category)}
                        className="btn-primary mr-1"
                      >
                        Edit
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => deleteCategory(category)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
