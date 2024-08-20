Ext.define('Erems.library.template.view.combobox.Bank', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbbank',
    mode_read: 'bank',
    storeIdProperty: 'bank_id',
    storeID: 'cbBankStore',
    displayField: 'bank_name',
    valueField: 'bank_id',
    fieldLabel:"Bank"
});


