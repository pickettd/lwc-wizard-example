import { LightningElement, api } from "lwc";

export default class WizardStep1 extends LightningElement {
  @api contactInputId;
  contactId;
  connectedCallback() {
    if (this.contactInputId) {
      this.contactId = this.contactInputId;
    }
  }
  get hasExistingContact() {
    return this.contactId === this.contactInputId;
  }

  handleSuccess(event) {
    const conId = event.detail.id;
    this.dispatchEvent(new CustomEvent("next", { detail: conId }));
  }
}
