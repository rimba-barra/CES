Ext.define('Hrd.template.combobox.MarriageStatus', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbmarriagestatus',
    mode_read: 'master_marriagestatus',
    storeUrl: 'marriagestatus',
    storeIdProperty: 'marriagestatus_id',
    storeID: 'cbMarriageStatusStore',
    displayField: 'marriagestatus',
    valueField: 'marriagestatus_id',
    fieldLabel:"Marriage Status",
    storeConfig:{
        id:'cbMarriageStatusStore',
        idProperty:'marriagestatus_id'
    },
    bindPrefixName:"marriagestatus"
});


