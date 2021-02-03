import { LightningElement, track, api } from "lwc";

export default class LightningInputMultiselectPicklist extends LightningElement {
  @api label;
  @api items;
  @track listItems;
  @track selectedItems = [];

  connectedCallback() {
    this.listItems = JSON.parse(JSON.stringify(this.items));
    this.loadSelectedItems();
  }

  get selectedValueCount() {
    return ` ${this.selectedItems.length} ${this.label} selected`;
  }

  get selectedItemsPillVibibilty() {
    return this.selectedItems.length > 0 ? "slds-show" : "slds-hide";
  }

  showListItems() {
    this.template
      .querySelector(".slds-dropdown-trigger ")
      .classList.add("slds-is-open");
  }
  hideListItems() {
    this.template
      .querySelector(".slds-dropdown-trigger ")
      .classList.remove("slds-is-open");
  }

  handleItemSelection(event) {
    console.log("Item Selected");
    let selectedItemValue = event.currentTarget.dataset.value;

    //Updaing selected / unselected Item in listItems
    this.listItems.forEach((element) => {
      if (element.value === selectedItemValue) {
        let selectedItem = element;
        if (selectedItem.selected) {
          element.selected = false;
          this.removeSelectedItems(element.value);
          this.sendSelecteditems();
        } else {
          element.selected = true;
          this.loadSelectedItems();
          this.sendSelecteditems();
        }
      }
    });
  }

  loadSelectedItems() {
    this.selectedItems = [];
    this.listItems.forEach((element) => {
      if (element.selected === true) {
        this.selectedItems.push({
          label: element.label,
          name: element.value
        });
      }
    });
  }
  removeSelectedItems(item) {
    let itemIndex = this.getIndexOfItem(this.selectedItems, item);
    if (itemIndex) {
      this.selectedItems.splice(itemIndex, 1);
    }
  }
  handleItemRemove(event) {
    //removing from pill
    const index = event.detail.index;

    //Unchecking from list
    const value = event.detail.item.name;
    this.listItems.forEach((element) => {
      if (element.value === value) {
        element.selected = false;
      }
    });
    this.selectedItems.splice(index, 1);
    this.sendSelecteditems();
  }
  getIndexOfItem(array, item) {
    const itemMap = array.map(function (item) {
      item.value;
    });
    return itemMap.indexOf(item);
  }

  sendSelecteditems() {
    const customEvent = new CustomEvent("change", {
      detail: JSON.stringify(this.selectedItems)
    });

    this.dispatchEvent(customEvent);
  }
}
