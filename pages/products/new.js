import { useRouter } from "next/router";
import { useRef, useState } from "react";
import cookie from "cookie";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { addProduct } from "../../data/products";
import ProductForm from "../../components/product/form";

export async function getServerSideProps(context) {
  const cookies = cookie.parse(
    context.req ? context.req.headers.cookie || "" : ""
  );

  // Retrieve the token from the cookies
  const token = cookies.token;

  const response = await fetch(`http://localhost:8000/productcategories`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const categories = await response.json();
  return { props: { categories } };
}

export default function NewProduct({ categories }) {
  const formEl = useRef();
  const router = useRouter();
  const [error, setError] = useState(null);

  const saveProduct = async () => {
    const { name, description, price, category, location, quantity } =
      formEl.current;
    const product = {
      name: name.value,
      description: description.value,
      price: price.value,
      category_id: category.value,
      location: location.value,
      quantity: quantity.value,
    };

    try {
      const response = await addProduct(product);

      if (response.id) {
        router.push(`/products/${response.id}`);
      } else {
        setError(
          "Product creation failed. Please check your input and try again."
        );
      }
    } catch (err) {
      console.error("Error caught in saveProduct:", err);
      // Use the error message from the caught error
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {error} {/* Display error message */}
        </div>
      )}
      <ProductForm
        formEl={formEl}
        saveEvent={saveProduct}
        title="Add a new product"
        router={router}
        categories={categories}
      />
    </>
  );
}

NewProduct.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
