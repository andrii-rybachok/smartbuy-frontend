import FilterNameDTO from "../models/filterDTO/FilterNameDTO";
import FilterValueDTO from "../models/filterDTO/FilterValueDTO";

export function setFilterValue(value: string | undefined) {
   if (value != undefined) {
      let numberIndex = value.search(new RegExp("(-)"));
      let minValue = 0;
      let maxValue = 0;
      let stringValue = "";
      if (numberIndex != -1) {
         minValue = Number(value.slice(0, numberIndex));
         maxValue = Number(value.slice(numberIndex + 1));
         if(Number.isNaN(minValue)||Number.isNaN(maxValue)){
            stringValue = value;
            minValue=0;
            maxValue=0;
         }
      } else {
         stringValue = value;
      }
      let filter: FilterValueDTO = {
         maxValue: maxValue,
         minValue: minValue,
         stringValue: stringValue,
      };
      return filter;
   } else {
      return {
         maxValue: 0,
         minValue: 0,
         stringValue: "",
      };
   }
}

export default function getFiltersFromUriString(filterParam: string) {
   let decodedFilters = decodeURIComponent(filterParam);
   let filtersInStr = decodedFilters.split(";");
   if (filtersInStr.length > 0 && decodedFilters != "undefined") {
      let filters = new Array<FilterNameDTO>();
      filtersInStr.forEach((filterInStr) => {
         let partsOfFilter = filterInStr.split(",");
         let filter: FilterNameDTO = {
            name: "",
            values: [],
         };
         for (let index = 0; index < partsOfFilter.length; index++) {
            const part = partsOfFilter[index];
            if (index == 0) {
               let filterName = part.split("=").at(0);
               filterName != undefined ? (filter.name = filterName) : (filter.name = "not found");
               filter.values.push(setFilterValue(part.split("=").at(1)));
            } else {
               filter.values.push(setFilterValue(part));
            }
         }
         if (filter.name != "" && filter.name != undefined) filters.push(filter);
      });
      return filters;
   }
   return undefined;
}
