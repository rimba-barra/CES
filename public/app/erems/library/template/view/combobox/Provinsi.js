Ext.define('Erems.library.template.view.combobox.Provinsi', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbprovinsi',
    mode_read: 'detail',
    storeIdProperty: 'province_id',
    storeID: 'cbProvinceStore',
    displayField: 'province_name',
    valueField: 'province_id',
    fieldLabel: "Provinsi",
    listeners:{
    	beforequery:function(record){
    		record.query = new RegExp(record.query, 'i');
    		record.forceAll = true;
    	}
    }
});


