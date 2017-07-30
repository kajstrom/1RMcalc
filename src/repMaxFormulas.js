const epleyFormula = (set) => {
    if (set.repetitions === 1) {
        return set.weight;
    }

    return ((set.weight * set.repetitions * 0.0333) + set.weight).toFixed(2);
};

const calculateAll = (set) => {
    return {
        epley: epleyFormula(set)
    };
};

export {epleyFormula, calculateAll};