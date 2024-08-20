Ext.define('Erems.library.template.view.combobox.Block', {
    extend: 'Erems.library.component.ComboboxDS',
    alias: 'widget.cbblock',
    mode_read: 'block',
    storeUrl: 'cluster',
    storeIdProperty: 'block_id',
    storeID: 'cbBlockStore',
    displayField: 'block',
    valueField: 'block_id',
    fieldLabel:"Block"
});


