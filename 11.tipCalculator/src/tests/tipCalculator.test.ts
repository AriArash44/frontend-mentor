import tipCalculator from "@/utils/tipCalculator.js";

let bill, tip, people;

describe('tip calculator tests', () => {
    it('should return tip and total values with two decimal in valid inputs', () => {
        bill = 142.55;
        tip = 15;
        people = 5;
        const { tipPerPerson, totalPerPerson, success } = tipCalculator(bill, tip, people);
        expect(tipPerPerson).toBe(4.27);
        expect(totalPerPerson).toBe(32.79);
        expect(success).toBe(true);
    });

    it('should return failure when tip amount set to be a negative number', () => {
        bill = 100;
        tip = -5;
        people = 5;
        const { tipPerPerson, totalPerPerson, success } = tipCalculator(bill, tip, people);
        expect(tipPerPerson).toBe(0);
        expect(totalPerPerson).toBe(0);
        expect(success).toBe(false);
    });

    it('should return failure when number of people set to be zero', () => {
        bill = 100;
        tip = 5;
        people = 0;
        const { tipPerPerson, totalPerPerson, success } = tipCalculator(bill, tip, people);
        expect(tipPerPerson).toBe(0);
        expect(totalPerPerson).toBe(0);
        expect(success).toBe(false);
    });
});