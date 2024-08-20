Ext.define('Hrd.template.combobox.SanctionType', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbsanctiontype',
    mode_read: 'master_sanctiontype',
    storeUrl: 'absenttype',
    storeIdProperty: 'sanctiontype_id',
    storeID: 'cbSanctionTypeStore',
    displayField: 'sanctiontype',
    valueField: 'sanctiontype_id',
    fieldLabel:"Sanction Type",
    storeConfig:{
        id:'cbSanctionTypeStore',
        idProperty:'sanctiontype_id'
    },
    bindPrefixName:"Sanctiontype"
});


