Ext.define('Erems.library.template.view.combobox.Cancelreason', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbcancelreason',
    mode_read: 'cancelreason',
    storeIdProperty: 'cancelreason_id',
    storeID: 'cbCancelReasonStore',
    displayField: 'cancelreason',
    valueField: 'cancelreason_id',
    fieldLabel:"Cancel Reason"
});


