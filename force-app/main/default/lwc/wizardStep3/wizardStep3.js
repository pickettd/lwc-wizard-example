import { LightningElement, api } from "lwc";

export default class WizardStep3 extends LightningElement {
  @api contactId;

  clickPrev(event) {
    this.dispatchEvent(new CustomEvent("prev", { detail: this.contactId }));
  }

  handleSuccess(event) {
    const conId = event.detail.id;
    this.dispatchEvent(new CustomEvent("next", { detail: conId }));
  }
}
