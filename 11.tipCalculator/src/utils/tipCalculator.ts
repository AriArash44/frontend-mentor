const tipCalculator = (bill: any, tip: any, people: any) => {
    if (typeof(bill) === "number" && typeof(tip) === "number" && typeof(people) === "number" && 
      bill >= 0 && tip >= 0 && tip <= 100 && people > 0) {
        const tipPerPerson = Math.round(bill * tip / people) / 100;
        console.log(bill);
        console.log(people);
        const totalPerPerson = Math.round((bill / people + tipPerPerson) * 100) / 100;
        return { tipPerPerson, totalPerPerson, success: true };
    }
    return { tipPerPerson: 0, totalPerPerson: 0, success: false };
}

export default tipCalculator;