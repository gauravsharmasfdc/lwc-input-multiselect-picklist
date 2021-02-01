import { LightningElement, track, api } from "lwc";

export default class LightningInputMultiselectPicklist extends LightningElement {
  @api label;

  @track listItems = [
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

  @track selectedItems = [];

  connectedCallback() {
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
          // Creates the event with the contact ID data.
          const selectedEvent = new CustomEvent("remove", {
            detail: element.value
          });

          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
        } else {
          element.selected = true;

          this.loadSelectedItems();
          const selectedEvent = new CustomEvent("selected", {
            detail: element.value
          });

          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
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
    for (let index = 0; index < this.selectedItems.length; index++) {
      const element = this.selectedItems[index];
      if (element.name === item) {
        this.selectedItems.splice(index, 1);
      }
    }
  }
  handleItemRemove(event) {
    //removing from pill
    const index = event.detail.index;
    this.selectedItems.splice(index, 1);

    //Unchecking from list
    const value = event.detail.item.name;
    this.listItems.forEach((element) => {
      if (element.value === value) {
        element.selected = false;
        // Creates the event with the contact ID data.
        const selectedEvent = new CustomEvent("remove", {
          detail: element.value
        });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
      }
    });
  }
}
