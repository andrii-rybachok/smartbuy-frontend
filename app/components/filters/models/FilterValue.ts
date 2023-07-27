export default class FilterValue {
   minValue: number = 0;
   maxValue: number = 0;
   stringValue: string | undefined;
   publicValue: string = "";

   constructor(minValue: number, maxValue: number, stringValue: string | undefined, publicValue: string) {
      this.maxValue = maxValue;
      this.minValue = minValue;
      this.stringValue = stringValue;
      this.publicValue = publicValue;
   }

   IsNumeric(): boolean {
      if (this.maxValue - this.minValue >= 0 &&this.maxValue!=0) {
         return true;
      }
      return false;
   }
}
