import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import Navbar from "../../../components/navbar";
import { Detail } from "../../../components/product/detail";
import { Ratings } from "../../../components/rating/detail";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductById,
  likeProduct,
  unLikeProduct,
} from "../../../data/products";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: product, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: likeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unLikeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const like = () => likeMutation.mutate(id);
  const unlike = () => unlikeMutation.mutate(id);

  if (!id || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="columns is-centered">
      <div className="column">
        <Detail product={product} like={like} unlike={unlike} />
        <Ratings
          productId={id}
          refresh={refetch}
          number_purchased={product.number_sold}
          ratingCount={product.rating_count}
          average_rating={product.average_rating}
          number_of_likes={product.number_of_likes}
        />
      </div>
    </div>
  );
}

ProductDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: "6rem" }}>{page}</section>
    </Layout>
  );
};
