Ext.define('Erems.library.template.view.combobox.Downline', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbdownline',
    mode_read: 'downline',
    storeIdProperty: 'downline_id',
    storeID: 'cbDownlineStore',
    displayField: 'name',
    valueField: 'downline_id',
    fieldLabel:"Downline",
    storeConfig:{
        id:'cbDownlineStore',
        idProperty:'downline_id',
        extraParams:{
            mode_read:"downline"
        }
    }
});

