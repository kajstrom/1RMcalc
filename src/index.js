import Rx from "rxjs/Rx";

require("bootstrap-loader");

const calculate1RM = (set) => {
    if (set.repetitions == 1) {
        return set.weight;
    }

    return (set.weight * set.repetitions * 0.0333) + set.weight;
};

const display1RM = (maximum) => {
    document.querySelector("#rep-max").innerHTML = "Estimated 1RM: " + maximum;
};

const Observable = Rx.Observable;
const weightInput = document.querySelector("#weight");
const repetitionInput = document.querySelector("#repetitions");

const weight = Observable.fromEvent(weightInput, "keyup")
    .map(() => Number.parseInt(weightInput.value))
    .filter((weight) => !Number.isNaN(weight));

const repetitions = Observable.fromEvent(repetitionInput, "keyup")
    .map(() => Number.parseInt(repetitionInput.value))
    .filter((repetitions) => !Number.isNaN(repetitions));

const set = weight.combineLatest(
        repetitions,
        (weight, repetitions) => {return {weight, repetitions}}
    )
    .distinctUntilChanged()
    .map(calculate1RM);

set.subscribe(display1RM);