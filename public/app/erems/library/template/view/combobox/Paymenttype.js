Ext.define('Erems.library.template.view.combobox.Paymenttype', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbpaymenttype',
    mode_read: 'paymenttype',
    storeIdProperty: 'paymenttype_id',
    storeID: 'cbPaymentTypeStore',
    displayField: 'paymenttype',
    valueField: 'paymenttype_id',
    fieldLabel:"Payment Type",
    allowBlank:false
});


