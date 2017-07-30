import Rx from "rxjs/Rx";
import R from "ramda";

require("bootstrap-loader");

const calculate1RM = (set) => {
    if (set.repetitions === 1) {
        return set.weight;
    }

    return ((set.weight * set.repetitions * 0.0333) + set.weight).toFixed(2);
};

const display1RM = R.curry((element, maximum) => {
    element.innerHTML = "Estimated 1RM: " + maximum;
});

const isNotNan = R.complement(Number.isNaN);
const getEventTargetValue = (event) => event.target.value;
const parseToInteger = (value) => Number.parseInt(value, 10);
const maxAllowedReps = (repetitions) => repetitions <= 10;
const hasTooMuchReps = R.complement(maxAllowedReps);
const addErrorClass = (element) => element.closest(".form-group").classList.add("has-error");
const removeErrorClass = (element) => element.closest(".form-group").classList.remove("has-error");

const weightInput = document.querySelector("#weight");
const repetitionsInput = document.querySelector("#repetitions");
const repMaxDisplayElement = document.querySelector("#rep-max");

const weight = Rx.Observable.fromEvent(weightInput, "keyup")
    .map(getEventTargetValue)
    .map(parseToInteger)
    .filter(isNotNan);

const repetitions = Rx.Observable.fromEvent(repetitionsInput, "keyup")
    .map(getEventTargetValue)
    .map(parseToInteger)
    .filter(isNotNan);

const validRepetitions = repetitions.filter(maxAllowedReps);

const set = weight.combineLatest(
        validRepetitions,
        (weight, repetitions) => {return {weight, repetitions}}
    )
    .distinctUntilChanged()
    .map(calculate1RM);

const display1RMInH1 = display1RM(repMaxDisplayElement);

set.subscribe(display1RMInH1);

repetitions
    .filter(hasTooMuchReps)
    .subscribe(() => {
        repMaxDisplayElement.innerHTML = "";
        addErrorClass(repetitionsInput);
        alert("Too many repetitions to calculate 1 rep max");
    });

validRepetitions.subscribe(() => removeErrorClass(repetitionsInput));