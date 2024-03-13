import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../Components/Spinner";
import { ReactSortable } from "react-sortablejs";
// import {multiparty} from "multiparty"
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProduct] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isuploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (_id) {
      // update product
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create product
      await axios.post("/api/products", data);
    }
    setGoToProduct(true);
  }
  if (goToProduct) {
    router.push("/Products");
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("files", file);
      }
      const res = await axios.post("/api/upload", data);
      console.log(res.data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data];
      });
      setIsUploading(false);
    }
  }
  function updateImages(images) {
    setImages(images);
  }
  const propertiesToFill = [];
  if (category && categories.length > 0) {
    let CatInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...CatInfo.properties);
    while (CatInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === CatInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      CatInfo = parentCat;
    }
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }
  return (
    <form onSubmit={saveProduct}>
      <div className="flex flex-col">
        <label>Product Name</label>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Product Name"
        />
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => <option value={c._id}>{c.name}</option>)}
        </select>
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div className="">
              <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
              <div>
              <select
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
                value={productProperties[p.name]}
              >
                {p.values.map((v) => (
                  <option value={v}>{v}</option>
                ))}
              </select>
              </div>
              
            </div>
          ))}
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            className="flex flex-wrap gap-1"
            list={images}
            setList={updateImages}
          >
            {!!images?.length &&
              images.map((link) => (
                <div key={link} className="inline-block h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                  <img src={link} alt="" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>
          {isuploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label
            className="w-24 h-24 text-center flex items-center justify-center
           text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <input type="file" className="hidden" onChange={uploadImages} />
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="Desciption"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <label>Price (in RS)</label>
        <input
          type="number"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          placeholder="Price"
        />
      </div>

      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
}
