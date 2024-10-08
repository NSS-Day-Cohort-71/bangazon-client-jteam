import CardLayout from '../card-layout'
import { Textarea, Select, Input } from '../form-elements'


export default function ProductForm({ categories, formEl, saveEvent, title, router }) {

  return (
    <CardLayout title={title}>
      <form ref={formEl}>
        <Input
          id="name"
          label="Name"
        />
        <Textarea
          id="description"
          label="Description"
        />
        <Select
          id="category"
          options={categories}
          label="Category"
          title="Select a Category"
        />
        <Input
          id="price"
          label="Price"
        />
        <Input
          id="location"
          label="Location"
        />
        <Input
          id="quantity"
          label="Quantity"
          type="number"
        />
      </form>
      <>
        <a className="card-footer-item" onClick={saveEvent}>Save</a>
        <a className="card-footer-item" onClick={() => router.back()}>Cancel</a>
      </>
    </CardLayout>
  )
}


