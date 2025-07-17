import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: FormatCurrency', () =>{
    it('converts cents into dollars', () =>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    
    it('To work with zeros', () =>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('edge case like 2000.5',() =>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })

    it('another edge case like 2000.4', () =>{
        expect(formatCurrency(2000.4)).toEqual('20.00');
    })

});