'use client'
import Link from "next/link";
import FilterName from "../categories/models/filters/FilterName";
import { usePathname } from "next/navigation";
import FilterValue from "../categories/models/filters/FilterValue";
import styles from '../../app/page.module.css'
export default function Filter({ filter }: { filter: FilterName }) {
  const pathname = usePathname();
  let decaodedPathName=decodeURIComponent(pathname);
  let urlParts = decaodedPathName.split("/");
  let activeLink=false;
  let filterPart="";
  if(urlParts.length>3){
    filterPart=urlParts.at(urlParts.length-1);
  }
  let linkUrl="";
  function insertAtIndex(str:string, substring:string, index:number) {
    let first_part=str.slice(0, index);
    let fds=str.slice(index);
    return first_part+substring+fds;
  }

  function addFilter(filterValue:FilterValue){
    if(filterPart!=""){
        let filterParts=filterPart.split(";");
        let filterNames:Array<string> = [];
        filterParts.forEach(element => {
            let filterName=element.split("=").at(0);
            if(filterName){
                filterNames.push(filterName);
            }
        });
        if(filterNames.includes(filter.name)){
            let regex=new RegExp("("+filter.name+'=.+?.{2,}?;)');
            let endIndex=linkUrl.search(regex);
            if(endIndex!=-1)
            endIndex+=filter.name.length+1;
            let inserValue="";
            if(!filterValue.IsNumeric()){
                inserValue+=filterValue.stringValue+",";
            }
            else{
                inserValue+=filterValue.minValue+"-"+filterValue.maxValue+",";
            }
            linkUrl=insertAtIndex(linkUrl,inserValue,endIndex);
        }
        else{
            if(!filterValue.IsNumeric()){
                linkUrl+=filter.name+"="+filterValue.stringValue+";";
            }
            else{
                linkUrl+=filter.name+"="+filterValue.minValue+"-"+filterValue.maxValue+";";
            }
        }
    }
    else{
        if(!filterValue.IsNumeric()){
            linkUrl+="/"+filter.name+"="+filterValue.stringValue+";";
        }
        else{
            linkUrl+="/"+filter.name+"="+filterValue.minValue+"-"+filterValue.maxValue+";";
        }
    }
  }
  function deleteFilter(filterValue:FilterValue){
    let filtersInStr=filterPart.split(";");
    let regexForValue=new RegExp("");
    let regexForFilter=new RegExp("");
    let regexForFirstFilter=new RegExp("");
    let countOfValues=0;
    if(!filterValue.IsNumeric())
    {
        regexForValue=new RegExp('(,?'+filterValue.stringValue+')');
        regexForFilter=new RegExp('('+filter.name+"="+filterValue.stringValue+'.?)');
        regexForFirstFilter=new RegExp('('+filterValue.stringValue+',?)');
    }
    else
    {
        regexForValue=new RegExp('(,?'+filterValue.minValue+'-'+filterValue.maxValue+')');
        regexForFilter=new RegExp('('+filter.name+"="+filterValue.minValue+'-'+filterValue.maxValue+'.?)');
        regexForFirstFilter= new RegExp('('+filterValue.minValue+'-'+filterValue.maxValue+',?)')       
    }
      for (let index = 0; index < filtersInStr.length; index++) {
        const filterInStr = filtersInStr[index];
        if(filterInStr.search(regexForValue)!=-1){
          countOfValues=filterInStr.split(",").length;
         let values=filterInStr.split(",");
         for (let y = 0; y < values.length; y++) {
          const value = values[y];
          if(value.search(regexForValue)!=-1&&y===0)
          regexForValue=regexForFirstFilter;
         }
        }
        if(filterInStr.search(regexForValue)!=-1){
          countOfValues=filterInStr.split(",").length;
        }
      }
    if(countOfValues>1){
      linkUrl=linkUrl.replace(regexForValue,"");
    }
     else if(countOfValues==1){
       linkUrl=linkUrl.replace(regexForFilter,"");
    }
  }
  return (
    <div>
      <h5>
        {filter.publicName} | Id:{filter.id}
      </h5>
      <ul>
        {filter.values.map((filterValue) => {
        filterValue=new FilterValue(filterValue.minValue,filterValue.maxValue,filterValue.stringValue,filterValue.publicValue);
        linkUrl=decaodedPathName;
        if(decaodedPathName.search(new RegExp('('+filterValue.stringValue+')'))!=-1 ||decaodedPathName.search(new RegExp('('+filterValue.minValue+'-'+filterValue.maxValue+')'))!=-1){
          deleteFilter(filterValue);
          activeLink=true;
        }
        else{
         addFilter(filterValue);   
         activeLink=false;   
        }
          return (
            <Link href={linkUrl} key={filterValue.publicValue} prefetch={false} className={activeLink?styles.activeLink:styles.inactiveLink}>
              <li>
                <div>{filterValue.publicValue}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
