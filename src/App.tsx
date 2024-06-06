
const products:Product[]= [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

interface Product {
  category: string
  price: string
  stocked : boolean
  name:string
}

function ProductCategoryRow({category}:Product){
  return(
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  )
}
function ProductRow({product}:{product:Product}){
  const name = product.stocked ? product.name:
    <span style={{color:'red'}}>
      {product.name}
    </span>


    return(
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
}


function ProductTable({products}:{products:Product[]}) {

  const rows :JSX.Element[] = []
  let lastCategory:null | string = null

  products.forEach((product) => {

  if(product.category !== lastCategory){
    rows.push(
      <ProductCategoryRow
      category={product.category}
      key={product.category}
      price={product.price}
      stocked ={product.stocked}
      name = {product.name}
      />
    )
  }
  rows.push(<ProductRow
            product={product}
            key={product.name}/>
  )
      lastCategory = product.category;
})

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )

}

function SearchBar(){
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label style={{ display: "block" }}>
        <input type="checkBox" /> Only show products in stock
      </label>
    </form>
  );
}
function FilterableProductTable({products}:{products:Product[]}){
  return(
    <div>
      <SearchBar/>
      <ProductTable products={products}/>
    </div>
  )
}

export default function App(){
  return <FilterableProductTable products={products}/>
}