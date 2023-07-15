import FilterValue from "./FilterValue";

export default interface FilterName{
    id: string,
    name: string,
    publicName: string,
    values:FilterValue[]
}
