import UpdateProduct from '../components/UpdateProduct.js';

export default function UpdatePage({ query }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
