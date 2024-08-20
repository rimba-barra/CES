Ext.define('Hrd.template.combobox.Parametertlk', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbparametertlk',
    mode_read: 'master_parametertlk',
    storeUrl: 'parametertlk',
    storeIdProperty: 'parametertlk_id',
    storeID: 'cbParametertlkStore',
    displayField: 'name',
    valueField: 'parametertlk_id',
    fieldLabel:"Project Name",
    storeConfig:{
        id:'cbParametertlkStore',
        idProperty:'parametertlk_id',
        extraParams:{
            mode_read:"parametertlk"
        }
    },
    bindPrefixName:"parametertlk"
});


