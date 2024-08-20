Ext.define('Erems.library.template.view.combobox.Changekavlingreason', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbchangekavlingreason',
    mode_read: 'movereason',
    storeIdProperty: 'movereason_id',
    storeID: 'cbChangeKavlingReasonStore',
    displayField: 'movereason',
    valueField: 'movereason_id',
    fieldLabel:"Move Reason"
});


