const tipCalculator = (bill: number, tip: number, people: number) => {
    if (bill >= 0 && tip >= 0 && tip <= 100 && people > 0) {
        const tipPerPerson = Math.round(bill * tip / people) / 100;
        const totalPerPerson = Math.round(bill / people * 100) / 100 + tipPerPerson;
        return { tipPerPerson, totalPerPerson, success: true };
    }
    return { tipPerPerson: 0, totalPerPerson: 0, success: false };
}

export default tipCalculator;