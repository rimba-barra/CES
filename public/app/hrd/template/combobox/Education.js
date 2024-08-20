Ext.define('Hrd.template.combobox.Education', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbeducation',
    mode_read: 'master_education',
    storeUrl: 'education',
    storeIdProperty: 'education_id',
    storeID: 'cbEducationStore',
    displayField: 'education',
    valueField: 'education_id',
    fieldLabel:"Education last",
    storeConfig:{
        id:'cbEducationStore',
        idProperty:'education_id'
    },
    bindPrefixName:"education"
});


