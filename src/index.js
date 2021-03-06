import Rx from "rxjs/Rx";
import R from "ramda";

require("bootstrap-loader");

import {calculateAll} from "./repMaxFormulas";

const display1RM = R.curry((element, maximums) => {
    element.querySelector("#epley").innerHTML = maximums.epley;
    element.querySelector("#brzycki").innerHTML = maximums.brzycki;
    element.querySelector("#mcglothin").innerHTML = maximums.mcglothin;
    element.querySelector("#lombardi").innerHTML = maximums.lombardi;
    element.querySelector("#oconner").innerHTML = maximums.oconner;
    element.querySelector("#mean").innerHTML = maximums.mean;
});

const clear1RM = (element) => {
    element.querySelectorAll("tbody td").forEach((td) => td.innerHTML = "");
};

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
    .map(calculateAll);

const display1RMInTable = display1RM(repMaxDisplayElement);

set.subscribe(display1RMInTable);

repetitions
    .filter(hasTooMuchReps)
    .subscribe(() => {
        clear1RM(repMaxDisplayElement);
        addErrorClass(repetitionsInput);
        alert("Too many repetitions to calculate 1 rep max");
    });

validRepetitions.subscribe(() => removeErrorClass(repetitionsInput));