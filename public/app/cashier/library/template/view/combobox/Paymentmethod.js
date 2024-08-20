Ext.define('Cashier.library.template.view.combobox.Paymentmethod', {
    extend: 'Cashier.library.component.ComboboxDS2',
    alias: 'widget.cbpaymentmethod',
    mode_read: 'paymentmethod',
    storeIdProperty: 'paymentmethod_id',
    storeID: 'cbPaymentMethodStore',
    displayField: 'paymentmethod',
    valueField: 'paymentmethod_id',
    fieldLabel:"Payment Method"
});


