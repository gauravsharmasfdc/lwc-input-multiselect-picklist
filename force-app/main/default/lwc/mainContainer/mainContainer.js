import { LightningElement } from "lwc";

export default class MainContainer extends LightningElement {
  listItems = [
    {
      label: "Item1",
      value: "Item1",
      selected: false
    },
    {
      label: "Item2",
      value: "Item2",
      selected: false
    },
    {
      label: "Item3",
      value: "Item3",
      selected: true
    },
    {
      label: "Item4",
      value: "Item4",
      selected: false
    }
  ];

  handlePicklistChange(event) {
    console.log(JSON.parse(event.detail));
  }
}
