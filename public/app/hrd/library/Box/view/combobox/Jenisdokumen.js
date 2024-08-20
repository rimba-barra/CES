Ext.define('Erems.library.template.view.combobox.Jenisdokumen', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbjenisdokumen',
    mode_read: 'jenisdokumen',
    storeUrl: 'jenisdokumen',
    storeIdProperty: 'jenisdocument_id',
    storeID: 'cbJenisdokumenStore',
    displayField: 'code',
    valueField: 'jenisdocument_id',
    fieldLabel:"Document Name",
    storeConfig:{
        id:'cbJenisdokumenStore',
        idProperty:'jenisdocument_id',
        extraParams:{
            mode_read:"jenisdokumen"
        }
    },
    bindPrefixName:"Jenisdokumen"
});


