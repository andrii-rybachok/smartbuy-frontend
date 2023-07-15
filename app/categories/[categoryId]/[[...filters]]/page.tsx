import Link from "next/link";
import CategoryDetail from "../../models/CategoryDetail";
import Filter from "@/app/components/filter";
import FilterNameDTO from "../../models/filters/DTO/FilterNameDTO";
import FilterValueDTO from "../../models/filters/DTO/FilterValueDTO";


function setFilterValue(value:string|undefined){
  if(value!=undefined){
  let numberIndex=value.search(new RegExp("(-)"));
  let minValue=0;
  let maxValue=0;
  let stringValue="";
  if(numberIndex!=-1){
    minValue=Number(value.slice(0,numberIndex));
    maxValue=Number(value.slice(numberIndex+1));
  }
  else{
    stringValue=value;
  }
  let filter:FilterValueDTO={
    maxValue:maxValue,
    minValue:minValue,
    stringValue:stringValue
  }
  return filter;
  }
  else{
    return {
      maxValue:0,
    minValue:0,
    stringValue:""
    };
  }
}

async function getCategory(categoryId: string,filterParam:string) {
  let params = new URLSearchParams({
    categoryId: categoryId,
  });
  let decodedFilters=decodeURIComponent(filterParam);
  let filtersInStr = decodedFilters.split(";");
  if(filtersInStr.length>0&&decodedFilters!="undefined"){
    let filters=new Array<FilterNameDTO>();
    filtersInStr.forEach(filterInStr=>{
      let partsOfFilter=filterInStr.split(",");
      let filter:FilterNameDTO={
        name:"",
        values:[]
      };
      for (let index = 0; index < partsOfFilter.length; index++) {
        const part = partsOfFilter[index];
        
        if(index==0){
          let filterName=part.split("=").at(0);
          filterName!=undefined?filter.name=filterName:filter.name="not found";
          filter.values.push(setFilterValue(part.split("=").at(1)));       
        }
        else{
          filter.values.push(setFilterValue(part));       
        }
      }
      if(filter.name!=""&&filter.name!=undefined)
      filters.push(filter);
    });

    const res = await fetch(
      "http://127.0.0.1:7196/api/shop/product-filter?" + params,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
       },
       cache:"no-cache",
      body:JSON.stringify(filters)
      }
    );
    return res.json();
  }
  // else{
    
    const res = await fetch(
      "http://127.0.0.1:7196/api/shop/get-category?" + params,
    );
    return res.json();
  // }
}


export default async function CategoryPage({
  params: { categoryId,filters },
}: {
  params: { categoryId: string,filters:string };
}) {
  const category: CategoryDetail = await getCategory(categoryId,filters);
  return (
    <section>
      <h2>{category.name}</h2>
      <div>
        {category.products.map((product) => {
          return (
            <div key={product.id}>
              <h4>
                {product.name} | Id:{product.id}
              </h4>
              <p>{product.price}</p>
            </div>
          );
        })}
        <hr />
        <div>
          {category.filters.map((filterName) => {
            return (
              <Filter filter={filterName} key={filterName.id}></Filter>
            );
          })}
        </div>
      </div>
    </section>
  );
}
