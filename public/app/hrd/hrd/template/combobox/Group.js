Ext.define('Hrd.template.combobox.Group', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbgroup',
    mode_read: 'master_group',
    storeUrl: 'group',
    storeIdProperty: 'group_id',
    storeID: 'cbGroupStore',
    displayField: 'code',
    valueField: 'group_id',
    fieldLabel:"Group",
    storeConfig:{
        id:'cbGroupStore',
        idProperty:'group_id'
    },
    bindPrefixName:"group"
});


