Ext.define('Hrd.template.combobox.Absenttypegroup', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbabsenttypegroup',
    mode_read: 'master_absenttypegroup',
    storeUrl: 'absenttypegroup',
    storeIdProperty: 'absenttypegroup_id',
    storeID: 'cbAbsenttypegroupStore',
    displayField: 'absenttypegroup',
    valueField: 'absenttypegroup_id',
    fieldLabel:"Absenttypegroup",
    storeConfig:{
        id:'cbAbsenttypegroupStore',
        idProperty:'absenttypegroup_id'
    },
    bindPrefixName:"Absenttypegroup"
});


