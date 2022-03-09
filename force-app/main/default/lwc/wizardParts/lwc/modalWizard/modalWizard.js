// Example from https://github.com/pbattisson/lwc-wizard-example
/*
This code is granted for use under the MIT license.

Copyright 2020 Paul Battisson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

export default class ModalWizard extends LightningElement {
  property;
  contactId;
  //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded
  isModalOpen = false;
  setupTypeOptions = [
    {
      value: "type1",
      label: "type1 Agreement",
    },
    { value: "type2", label: "type2 Agreement" },
  ];
  @api selectedSetupTypeValue = "type2";
  // selectedSetupTypeIndex = 1;

  agreementTypeOptions = [
    {
      value: "agree1",
      label: "agree1 Agreement",
    },
    {
      value: "agree2",
      label: "agree2 Agreement",
    },
  ];
  selectedAgreementTypeValue = "agree2";
  // selectedAgreementTypeIndex = 0;

  steps = [
    { label: "Setup Type", value: "1" },
    { label: "Setup thing", value: "2" },
    { label: "P Information", value: "3" },
    { label: "O Information", value: "4" },
    { label: "Agreement", value: "5" },
    { label: "Deal", value: "6" },
    { label: "Review", value: "7" },
  ];
  current = "1";
  currentIndex = 0;
  proposalId;
  contactId;
  openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
  }
  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
  }
  submitDetails() {
    // to close modal set isModalOpen tarck value as false
    //Add your code to call apex method or do some processing
    this.isModalOpen = false;
  }

  get propertyOwnerId() {
    if (this.contactId) {
      return this.contactId;
    }
    return this.property.data.fields.Property_Owner_Contact__c.value;
  }

  get step1() {
    return this.current === this.steps[0].value;
  }
  get notStep1() {
    return this.current !== this.steps[0].value;
  }

  get step2() {
    return this.current === this.steps[1].value;
  }

  get step3() {
    return this.current === this.steps[2].value;
  }
  get step4() {
    return this.current === this.steps[3].value;
  }
  get step5() {
    return this.current === this.steps[4].value;
  }
  get step6() {
    return this.current === this.steps[5].value;
  }
  get step7() {
    return this.current === this.steps[6].value;
  }

  handleNext(event) {
    this.proposalId = event.detail;
    if (this.currentIndex + 1 === this.steps.length) {
      console.log(this.proposalId);
      this.isModalOpen = false;
    } else {
      this.currentIndex++;
      this.current = this.steps[this.currentIndex].value;
    }
  }
  handlePrev(event) {
    this.proposalId = event.detail;
    const conId = event.detail.id;
    this.contactId = conId;
    if (this.currentIndex - 1 < 0) {
      console.log(this.proposalId);
      this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
          recordId: this.proposalId,
          actionName: "view",
        },
      });
    } else {
      this.currentIndex--;
      this.current = this.steps[this.currentIndex].value;
    }
  }
  handleSuccess(event) {
    const conId = event.detail.id;
    this.contactId = conId;
    // this.dispatchEvent(new CustomEvent("next", { detail: conId }));
    if (this.currentIndex + 1 === this.steps.length) {
      console.log(conId);
      this.isModalOpen = false;
    } else {
      this.currentIndex++;
      this.current = this.steps[this.currentIndex].value;
    }
  }
}
