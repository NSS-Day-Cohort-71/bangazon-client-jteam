import { useEffect } from "react";
import CardLayout from "../components/card-layout";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { ProductCard } from "../components/product/card";
import { StoreCard } from "../components/store/card";
import { useAppContext } from "../context/state";
import { getUserProfile } from "../data/auth";

export default function Profile() {
  const { profile, setProfile } = useAppContext();

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData);
      }
    });
  }, []);

  return (
    <>
      <CardLayout title="Favorite Stores" width="is-full">
        <div className="columns is-multiline">
          {profile.favorites && profile.favorites.length > 0 ? (
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
          {profile.recommends?.map((recommendation) => (
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
          ))}
        </div>
      </CardLayout>
      <CardLayout title="Products recommended to you" width="is-full">
        <div className="columns is-multiline">
          {profile.received_recommendations &&
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
              No products have been recommended to you yet.
            </div>
          )}
        </div>
      </CardLayout>
      <CardLayout title="Products you've liked" width="is-full">
        <div className="columns is-multiline">
          {profile.likes?.map((like) => (
            <ProductCard
              product={like.product}
              key={like.id}
              width="is-one-third"
            />
          ))}
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
      <section style={{ paddingTop: '4rem' }}>
        {page}
      </section>
    </Layout>
  );
};
