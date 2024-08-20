// Currency Component
Ext.define('Cashier.library.template.field.CurrencyField', {
    extend: 'Ext.form.field.Number',
    alias: ['widget.currencyfield'],
    fieldStyle: 'text-align:right',    
    currency: 'Rp', //change to the symbol you
    listeners: {
        render: function(cmp) {
            cmp.showCurrency(cmp);
        },
        blur: function(cmp) {
            cmp.showCurrency(cmp);
        },
        focus: function(cmp) {
            cmp.setRawValue(cmp.valueToRaw(cmp.getValue()));
        } 
    },
    showCurrency: function(cmp) {
        cmp.setRawValue(Ext.util.Format.currency(cmp.valueToRaw(cmp.getValue()), cmp.currency, 2, false));
    },
    valueToRaw: function(value) {
        return value.toString().replace(/[^0-9.]/g, '');
    },
    rawToValue: function(value) {
        return Ext.util.Format.round(this.valueToRaw(value), 2);
    }
});
// END Currency Component
