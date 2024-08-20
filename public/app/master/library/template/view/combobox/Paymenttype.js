Ext.define('Master.library.template.view.combobox.Paymenttype', {
    extend: 'Master.library.component.ComboboxDS2',
    alias: 'widget.cbpaymenttype',
    mode_read: 'paymenttype',
    storeIdProperty: 'paymenttype_id',
    storeID: 'cbPaymentTypeStore',
    displayField: 'paymenttype',
    valueField: 'paymenttype_id',
    fieldLabel:"Payment Type"
});


