import Rx from "rxjs/Rx";
import R from "ramda";

require("bootstrap-loader");

const calculate1RM = (set) => {
    if (set.repetitions === 1) {
        return set.weight;
    }

    return (set.weight * set.repetitions * 0.0333) + set.weight;
};

const display1RM = R.curry((element, maximum) => {
    element.innerHTML = "Estimated 1RM: " + maximum;
});

const isNotNan = (number) => !Number.isNaN(number);
const getEventTargetValue = (event) => event.target.value;
const parseToInteger = (value) => Number.parseInt(value, 10);

const weight = Rx.Observable.fromEvent(document.querySelector("#weight"), "keyup")
    .map(getEventTargetValue)
    .map(parseToInteger)
    .filter(isNotNan);

const repetitions = Rx.Observable.fromEvent(document.querySelector("#repetitions"), "keyup")
    .map(getEventTargetValue)
    .map(parseToInteger)
    .filter(isNotNan);

const set = weight.combineLatest(
        repetitions,
        (weight, repetitions) => {return {weight, repetitions}}
    )
    .distinctUntilChanged()
    .map(calculate1RM);

const display1RMInH1 = display1RM(document.querySelector("#rep-max"));

set.subscribe(display1RMInH1);