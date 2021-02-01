import { LightningElement } from "lwc";

export default class ContainerCMP extends LightningElement {
  handleItemSelection(event) {
    console.log("item add :" + event.detail);
  }
  handleItemRemove(event) {
    console.log("item removed :" + event.detail);
  }
}
