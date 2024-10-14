import { useRouter } from "next/router";
import { useRef } from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { addStore } from "../../data/stores";
import StoreForm from "../../components/store/form";
import { useQueryClient } from "@tanstack/react-query";

export default function NewStore() {
  const queryClient = useQueryClient();

  const nameEl = useRef();
  const descriptionEl = useRef();
  const router = useRouter();

  const saveStore = () => {
    addStore({
      name: nameEl.current.value,
      description: descriptionEl.current.value,
    }).then((res) => {
      queryClient.setQueryData(["user"], (oldData) => ({
        ...oldData,
        store: res,
      }));
      router.push(`/stores/${res.id}`);
    });
  };

  return (
    <StoreForm
      nameEl={nameEl}
      descriptionEl={descriptionEl}
      saveEvent={saveStore}
      router={router}
      title="Create your store"
    >
      <p>
        Give your new store a name and description. Then add products on the
        next page
      </p>
    </StoreForm>
  );
}

NewStore.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: "4rem" }}>{page}</section>
    </Layout>
  );
};
