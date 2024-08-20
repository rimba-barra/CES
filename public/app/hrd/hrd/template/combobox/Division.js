Ext.define('Hrd.template.combobox.Division', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbdivision',
    mode_read: 'master_division',
    storeUrl: 'division',
    storeIdProperty: 'division_id',
    storeID: 'cbDivisionStore',
    displayField: 'division',
    valueField: 'division_id',
    fieldLabel:"Division",
    storeConfig:{
        id:'cbDivisionStore',
        idProperty:'division_id'
    },
    bindPrefixName:"division"
});


