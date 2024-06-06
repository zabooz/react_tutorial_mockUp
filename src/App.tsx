import {useState} from 'react'



const products:Product[]= [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
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


function ProductTable({products,inStockOnly,filterText}:{products:Product[],inStockOnly:boolean,filterText:string}) {

  const rows :JSX.Element[] = []
  let lastCategory:null | string = null
  console.log(products)
  products.forEach((product) => {


    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }


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

interface SearchBarProps{
  filterText:string,
  inStockOnly: boolean,
  onInStockOnlyChange:Function,
  onFilterTextChange: Function
}


function SearchBar({filterText,inStockOnly,onInStockOnlyChange,onFilterTextChange}:SearchBarProps){
  return (
    <form>
      <input  type="text" 
              placeholder="Search..." 
              value={filterText}
              onChange={(e) => onFilterTextChange(e.target.value)} />
      <label style={{ display: "block" }}>
      <input type="checkBox"
              checked= {inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)} /> Only show products in stock
      </label>
    </form>
  );
}
function FilterableProductTable({products}:{products:Product[]}){

  const [filterText,setFilterText] = useState<string>('')
  const [inStockOnly,setInStockOnly] = useState<boolean>(false)



  return(
    <div>
      <SearchBar
      filterText = {filterText}
      inStockOnly = {inStockOnly}
      onFilterTextChange = {setFilterText}
      onInStockOnlyChange = {setInStockOnly}      
      />
      <ProductTable 
      products={products}
      filterText = {filterText}
      inStockOnly = {inStockOnly} 
      />
    </div>
  )
}

export default function App(){
  return <FilterableProductTable products={products}/>
}