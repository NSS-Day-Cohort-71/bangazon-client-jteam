import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { ProductCard } from "../../../components/product/card";
import Detail from "../../../components/store/detail";
import CardLayout from "../../../components/card-layout";
import { useUserQuery } from "../../../context/userQueries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../data/products";
import {
  favoriteStore,
  getStoreById,
  unfavoriteStore,
} from "../../../data/stores";

export default function StoreDetail() {
  const { user: profile } = useUserQuery();
  const router = useRouter();
  const { id } = router.query;
  const [isOwner, setIsOwner] = useState(false);
  const queryClient = useQueryClient();

  const { data: store } = useQuery({
    queryKey: ["store", id],
    queryFn: () => getStoreById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (profile && store) {
      setIsOwner(parseInt(id) === profile.store?.id);
    }
  }, [id, profile, store]);

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store", id] });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: favoriteStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store", id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const unfavoriteMutation = useMutation({
    mutationFn: unfavoriteStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store", id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const removeProduct = (productId) => deleteMutation.mutate(productId);
  const favorite = () => favoriteMutation.mutate(id);
  const unfavorite = () => unfavoriteMutation.mutate(id);

  if (!store) {
    return <div>Loading...</div>;
  }

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
