Ext.define('Cashier.library.template.view.combobox.City', {
    extend: 'Cashier.library.component.ComboboxDS2',
    alias: 'widget.cbcity',
    mode_read: 'city',
    storeIdProperty: 'city_id',
    storeID: 'cbCityStore',
    displayField: 'city_name',
    valueField: 'city_id',
    fieldLabel:"City",
    storeConfig:{
        id:'cbCityStore',
        idProperty:'city_id',
        extraParams:{
            mode_read:"city"
        }
    }
});


