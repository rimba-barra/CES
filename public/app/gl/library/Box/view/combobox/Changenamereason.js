Ext.define('Erems.library.template.view.combobox.Changenamereason', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbchangenamereason',
    mode_read: 'changenamereason',
    storeIdProperty: 'reasonchgname_id',
    storeID: 'cbChangeNameReasonStore',
    displayField: 'reasonchgname',
    valueField: 'reasonchgname_id',
    fieldLabel:"Change Reason"
});


