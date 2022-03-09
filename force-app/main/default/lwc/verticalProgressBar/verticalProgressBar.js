// Adapted from example at https://github.com/pbattisson/lwc-wizard-example
/*
This code is granted for use under the MIT license.

Copyright 2020 Paul Battisson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { LightningElement, api } from "lwc";

export default class VerticalProgressBar extends LightningElement {
  @api steps;
  @api currentStep;

  get getClass() {
    let retClass = "slds-progress__item";
    // this.steps.forEach((step) => {
    //   if (step.value === this.currentStep) {
    //     retClass += " slds-is-active";
    //   } else if (parseInt(step.value, 10) < parseInt(this.currentStep, 10)) {
    //     retClass += " slds-is-completed";
    //   }
    // });
    return retClass;
  }
  get progress() {
    let position = 0;
    let i = 0;
    this.steps.forEach((step) => {
      if (step.value === this.currentStep) {
        position = i;
      }
      i++;
    });

    return (100 * position) / (this.steps.length - 1);
  }
}
