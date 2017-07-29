import Rx from "rxjs/Rx";

require("bootstrap-loader");

const Observable = Rx.Observable;
const weightInput = document.querySelector("#weight");
const repetitionInput = document.querySelector("#repetitions");

const weight = Observable.fromEvent(weightInput, "keyup")
    .map(() => Number.parseInt(weightInput.value))
    .filter((weight) => !Number.isNaN(weight));

const repetitions = Observable.fromEvent(repetitionInput, "keyup")
    .map(() => Number.parseInt(repetitionInput.value))
    .filter((repetitions) => !Number.isNaN(repetitions));

weight.subscribe((value) => {
    console.log(value);
});

const calculations = weight.combineLatest(
        repetitions,
        (weight, repetitions) => {return {weight, repetitions}}
    )
    .distinctUntilChanged();

calculations.subscribe(function (x) {
    console.log(x);
});