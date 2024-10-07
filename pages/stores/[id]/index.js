import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { ProductCard } from "../../../components/product/card";
import Detail from "../../../components/store/detail";
import { useAppContext } from "../../../context/state";
import { deleteProduct } from "../../../data/products";
import {
  favoriteStore,
  getStoreById,
  unfavoriteStore,
} from "../../../data/stores";
import CardLayout from "../../../components/card-layout";

export default function StoreDetail() {
  const { profile } = useAppContext();
  const router = useRouter();
  const { id } = router.query;
  const [store, setStore] = useState({});
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (id) {
      refresh();
    }
    if (parseInt(id) === profile.store?.id) {
      setIsOwner(true);
    }
  }, [id, profile]);

  const refresh = () =>
    getStoreById(id).then((storeData) => {
      if (storeData) {
        setStore(storeData);
      }
    });

  const removeProduct = (productId) => {
    deleteProduct(productId).then(refresh);
  };

  const favorite = () => {
    favoriteStore(id).then(refresh);
  };

  const unfavorite = () => {
    unfavoriteStore(id).then(refresh);
  };

  return (
    <>
      <Detail
        store={store}
        isOwner={isOwner}
        favorite={favorite}
        unfavorite={unfavorite}
      />
      <CardLayout title="Selling" width="is-full">
        <div className="columns is-multiline">
          {store.products?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              isOwner={isOwner}
              removeProduct={removeProduct}
            />
          ))}
          {store.products?.length === 0 ? (
            <p>There's no products yet</p>
          ) : (
            <></>
          )}
        </div>
      </CardLayout>
      <CardLayout title="Sold" width="is-full">
        <div className="columns is-multiline">
          {store.products_sold?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              isOwner={isOwner}
              removeProduct={removeProduct}
            />
          ))}
          {store.products_sold?.length === 0 ? (
            <p>No products have sold yet</p>
          ) : (
            <></>
          )}
        </div>
      </CardLayout>
    </>
  );
}

StoreDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: "4rem" }}>{page}</section>
    </Layout>
  );
};
