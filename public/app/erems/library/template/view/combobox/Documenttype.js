Ext.define('Erems.library.template.view.combobox.Documenttype', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbdocumenttype',
    mode_read: 'detail',
    storeIdProperty: 'documenttype_id',
    storeID: 'cbDocumenttypeStore',
    displayField: 'documenttype',
    valueField: 'documenttype_id',
    fieldLabel: "Document Type"
});


