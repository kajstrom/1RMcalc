import R from "ramda";

const ifSingleRepReturnWeight = R.curry((formula, set) => {
    if (set.repetitions === 1) {
        return set.weight;
    }

    let result = formula(set);
    return result.toFixed(2);
});

const epleyFormula = ifSingleRepReturnWeight((set) => {
    return (set.weight * set.repetitions * 0.0333) + set.weight;
});

const brzyckiFormula = ifSingleRepReturnWeight((set) => {
    return (36 / (37 - set.repetitions)) * set.weight;
});

const mcGlothinFormula = ifSingleRepReturnWeight((set) => {
    let weightMultiplied = 100 * set.weight;
    let divider = 101.3 - 2.67123 * set.repetitions;

    return weightMultiplied / divider;
});

const lombardiFormula = ifSingleRepReturnWeight((set) => {
    return set.weight * (set.repetitions ** 0.10);
});

const oConnerFormula = ifSingleRepReturnWeight((set) => {
    return set.weight * (1 + (set.repetitions / 40));
});

const meanFormula = (set) => {
    let maximums = [];

    maximums.push(epleyFormula(set));
    maximums.push(brzyckiFormula(set));
    maximums.push(mcGlothinFormula(set));
    maximums.push(lombardiFormula(set));
    maximums.push(oConnerFormula(set));

    return (R.sum(maximums) / maximums.length).toFixed(2);
};

const calculateAll = (set) => {
    return {
        epley: epleyFormula(set),
        brzycki: brzyckiFormula(set),
        mcglothin: mcGlothinFormula(set),
        lombardi: lombardiFormula(set),
        oconner: oConnerFormula(set),
        mean: meanFormula(set)
    };
};

export {epleyFormula, brzyckiFormula, mcGlothinFormula, lombardiFormula, oConnerFormula, meanFormula, calculateAll};