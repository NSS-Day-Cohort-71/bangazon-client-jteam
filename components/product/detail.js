import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { addProductToOrder, recommendProduct } from "../../data/products"; // Assuming getCustomerList is available
import Modal from "../modal";
import { Input } from "../form-elements";
import { getCustomerList } from "../../data/auth";

export function Detail({ product, like, unlike }) {
  const router = useRouter();
  const usernameEl = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [customerList, setCustomerList] = useState([]);

  // Fetch the customer list when the component mounts
  useEffect(() => {
    getCustomerList().then((data) => {
      setCustomerList(data);
    });
  }, []);

  const addToCart = () => {
    addProductToOrder(product.id).then(() => {
      router.push("/cart");
    });
  };

  const recommendProductEvent = () => {
    const username = usernameEl.current.value;

    // Find the customer by the entered username
    const recipient = customerList.find(
      (customer) => customer.username.toLowerCase() === username.toLowerCase()
    );

    if (recipient) {
      // If the recipient is found, call recommendProduct with product ID and customer ID
      recommendProduct(product.id, recipient.id).then((res) => {
        if (res) {
          setShowError(true);
        } else {
          setShowModal(false);
          setShowError(false);
          usernameEl.current.value = "";
        }
      });
    } else {
      // If no recipient is found, show an error
      setShowError(true);
    }
  };

  return (
    <>
      <Modal setShowModal={setShowModal} showModal={showModal} title="Recommend this product to a user">
        <Input id="username" label="Enter a username" refEl={usernameEl}>
          {showError ? <p className="help is-danger">This user doesn't exist</p> : <></>}
        </Input>
        <>
          <button className="button is-success" onClick={recommendProductEvent}>
            Recommend Product
          </button>
          <button className="button" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </>
      </Modal>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child">
            <figure className="image is-4by3">
              <img src={product.image_path}></img>
            </figure>
          </article>
        </div>
        <div className="tile is-parent is-vertical">
          <article className="tile is-child">
            <h1 className="title">
              {product.name} - ${product.price}
            </h1>
            <p className="subtitle">{product.store?.name}</p>
            <p>{product.description}</p>
            <p>Pick up available in: {product.location}</p>
          </article>
          <article className="tile is-child is-align-self-center">
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary" onClick={addToCart}>
                  Add to Cart
                </button>
              </p>
              <p className="control">
                <button className="button is-danger is-outlined" onClick={() => setShowModal(true)}>
                  Recommend this Product
                </button>
              </p>
              <p className="control">
                {product.is_liked ? (
                  <button className="button is-link is-outlined" onClick={unlike}>
                    <span className="icon is-small">
                      <i className="fas fa-heart-broken"></i>
                    </span>
                    <span>Unlike Product</span>
                  </button>
                ) : (
                  <button className="button is-link is-outlined" onClick={like}>
                    <span className="icon is-small">
                      <i className="fas fa-heart"></i>
                    </span>
                    <span>Like Product</span>
                  </button>
                )}
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
