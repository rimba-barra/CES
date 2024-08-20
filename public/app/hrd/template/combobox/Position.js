Ext.define('Hrd.template.combobox.Position', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbposition',
    mode_read: 'master_position',
    storeUrl: 'position',
    storeIdProperty: 'position_id',
    storeID: 'cbPositionStore',
    displayField: 'position',
    valueField: 'position_id',
    fieldLabel:"Position",
    storeConfig:{
        id:'cbPositionStore',
        idProperty:'position_id'
    },
    bindPrefixName:"position"
});


