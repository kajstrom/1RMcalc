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

const mcGlothinFormula = (set) => {
    if (set.repetitions === 1) {
        return set.weight;
    }

    let weightMultiplied = 100 * set.weight;
    let divider = 101.3 - 2.67123 * set.repetitions;

    return (weightMultiplied / divider).toFixed(2);
};

const calculateAll = (set) => {
    return {
        epley: epleyFormula(set),
        brzycki: brzyckiFormula(set),
        mcglothin: mcGlothinFormula(set)
    };
};

export {epleyFormula, brzyckiFormula, calculateAll};