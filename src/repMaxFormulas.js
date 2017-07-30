const epleyFormula = (set) => {
    if (set.repetitions === 1) {
        return set.weight;
    }

    return ((set.weight * set.repetitions * 0.0333) + set.weight).toFixed(2);
};

const brzyckiFormula = (set) => {
    if (set.repetitions === 1) {
        return set.weight;
    }

    return ((36 / (37 - set.repetitions)) * set.weight).toFixed(2);
};

const calculateAll = (set) => {
    return {
        epley: epleyFormula(set),
        brzycki: brzyckiFormula(set)
    };
};

export {epleyFormula, brzyckiFormula, calculateAll};