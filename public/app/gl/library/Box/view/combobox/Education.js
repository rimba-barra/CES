Ext.define('Erems.library.template.view.combobox.Education', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbeducation',
    mode_read: 'education',
    storeUrl: 'education',
    storeIdProperty: 'education_id',
    storeID: 'cbEducationStore',
    displayField: 'education',
    valueField: 'education_id',
    fieldLabel:"Education",
    storeConfig:{
        id:'cbEducationStore',
        idProperty:'education_id',
        extraParams:{
            mode_read:"education"
        }
    },
    bindPrefixName:"education"
});


