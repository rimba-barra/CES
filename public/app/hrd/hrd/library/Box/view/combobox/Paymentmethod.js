Ext.define('Erems.library.template.view.combobox.Paymentmethod', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbpaymentmethod',
    mode_read: 'paymentmethod',
    storeIdProperty: 'paymentmethod_id',
    storeID: 'cbPaymentMethodStore',
    displayField: 'paymentmethod',
    valueField: 'paymentmethod_id',
    fieldLabel:"Payment Method"
});


