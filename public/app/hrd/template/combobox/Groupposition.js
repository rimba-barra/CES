Ext.define('Hrd.template.combobox.Groupposition', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbgroupposition',
    mode_read: 'master_groupposition',
    storeUrl: 'groupposition',
    storeIdProperty: 'groupposition_id',
    storeID: 'cbGroupPositionStore',
    displayField: 'groupposition',
    valueField: 'groupposition_id',
    fieldLabel:"Group Position",
    storeConfig:{
        id:'cbGroupPositionStore',
        idProperty:'groupposition_id'
    },
    bindPrefixName:"groupposition"
});


