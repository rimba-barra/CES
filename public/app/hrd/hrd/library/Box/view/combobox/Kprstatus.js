Ext.define('Erems.library.template.view.combobox.Kprstatus', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbkprstatus',
    mode_read: 'kprstatus',
    storeIdProperty: 'kprstatus_id',
    storeID: 'cbKprstStusStore',
    displayField: 'kprstatus',
    valueField: 'kprstatus_id',
    fieldLabel:"Kpr Status"
});


