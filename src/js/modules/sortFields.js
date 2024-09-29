export default function sortFields(year) {
  const rangeInput = document.querySelectorAll(".range-input input");
  const progress = document.querySelector(".year-input--progress");
  const yearInput = document.querySelectorAll(".year-input input");

  const yearGap = 2;
  const rangeInputGap = 1924;

  yearInput.forEach((input) => {
    input.addEventListener("change", (e) => {
      let minVal = parseInt(yearInput[0].value);
      let maxVal = parseInt(yearInput[1].value);

      if (minVal < 1924) {
        minVal = 1924;
        yearInput[0].value = minVal;
      } else if (minVal > 2023) {
        minVal = 2023 - rangeInputGap;
        yearInput[0].value = minVal;
      }
      if (maxVal < 1925) {
        maxVal = 1925;
        yearInput[1].value = maxVal;
      } else if (maxVal > 2024) {
        maxVal = 2024;
        yearInput[1].value = maxVal;
      }

      if (maxVal - minVal < yearGap) {
        if (e.target.className == "input__min") {
          minVal = maxVal - yearGap;
          yearInput[0].value = minVal;
        } else {
          maxVal = minVal + yearGap;
          yearInput[1].value = maxVal;
        }
      }

      if (maxVal - minVal >= yearGap && maxVal <= 2024) {
        if (e.target.className == "input-min") {
          rangeInput[0].value = minVal - rangeInputGap;
          progress.style.left =
            ((minVal - rangeInputGap) / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxVal - rangeInputGap;
          progress.style.right =
            100 - ((maxVal - rangeInputGap) / rangeInput[1].max) * 100 + "%";
        }
      }
      year.min = minVal;
      year.max = maxVal;
      return year;
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value);
      let maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < yearGap) {
        if (e.target.className == "range-input__min") {
          minVal = maxVal - yearGap;
          rangeInput[0].value = minVal;
        } else {
          maxVal = minVal + yearGap;
          rangeInput[1].value = maxVal;
        }
      } else {
        yearInput[0].value = minVal + rangeInputGap;
        yearInput[1].value = maxVal + rangeInputGap;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
      year.min = minVal + rangeInputGap;
      year.max = maxVal + rangeInputGap;
      return year;
    });
  });
}
