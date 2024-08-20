Ext.define('Hrd.template.combobox.BloodGroup', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbbloodgroup',
    mode_read: 'master_bloodgroup',
    storeUrl: 'bloodgroup',
    storeIdProperty: 'bloodgroup_id',
    storeID: 'cbBloodGroupStore',
    displayField: 'bloodgroup',
    valueField: 'bloodgroup_id',
    fieldLabel:"Blood Group",
    storeConfig:{
        id:'cbBloodGroupStore',
        idProperty:'bloodgroup_id'
    },
    bindPrefixName:"bloodgroup"
});


