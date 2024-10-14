import CardLayout from "../components/card-layout";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { ProductCard } from "../components/product/card";
import { StoreCard } from "../components/store/card";
import { useUserQuery } from "../context/userQueries";

export default function Profile() {
  const { user: profile } = useUserQuery();

  return (
    <>
      <CardLayout title="Favorite Stores" width="is-full">
        <div className="columns is-multiline">
          {profile?.favorites && profile.favorites.length > 0 ? (
            profile.favorites.map((favorite) => (
              <StoreCard
                store={favorite.store}
                key={favorite.id}
                width="is-one-third"
              />
            ))
          ) : (
            <div className="column">No favorite stores found.</div>
          )}
        </div>
      </CardLayout>
      <CardLayout title="Products you've recommended" width="is-full">
        <div className="columns is-multiline">
          {profile?.recommends && profile.recommends.length > 0 ? (
            profile?.recommends?.map((recommendation) => (
              <div
                key={`${recommendation.product.id}`}
                className="column is-one-third"
              >
                <ProductCard
                  product={recommendation.product}
                  key={recommendation.product.id}
                  width="is-full"
                />
                <p className="has-text-grey mt-2">
                  Recommended to: {recommendation.customer.user.first_name}{" "}
                  {recommendation.customer.user.last_name}
                </p>
              </div>
            ))
          ) : (
            <div className="column">You have not recommended any products.</div>
          )}
        </div>
      </CardLayout>
      <CardLayout title="Products recommended to you" width="is-full">
        <div className="columns is-multiline">
          {profile?.received_recommendations &&
          profile.received_recommendations.length > 0 ? (
            profile.received_recommendations.map((recommendation) => (
              <div
                key={`${recommendation.product.id}-${recommendation.recommender.id}`}
                className="column is-one-third"
              >
                <ProductCard product={recommendation.product} width="is-full" />
                <p className="has-text-grey mt-2">
                  Recommended by: {recommendation.recommender.user.first_name}{" "}
                  {recommendation.recommender.user.last_name}
                </p>
              </div>
            ))
          ) : (
            <div className="column">
              No products have been recommended to you.
            </div>
          )}
        </div>
      </CardLayout>
      <CardLayout title="Products you've liked" width="is-full">
        <div className="columns is-multiline">
          {profile?.likes && profile.likes.length > 0 ? (
            profile.likes.map((like) => (
              <ProductCard
                product={like.product}
                key={like.id}
                width="is-one-third"
              />
            ))
          ) : (
            <div className="column">You have not liked any products.</div>
          )}
        </div>
        <></>
      </CardLayout>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: "4rem" }}>{page}</section>
    </Layout>
  );
};
