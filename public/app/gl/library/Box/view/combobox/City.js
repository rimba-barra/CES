Ext.define('Erems.library.template.view.combobox.City', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbcity',
    mode_read: 'city',
    storeIdProperty: 'city_id',
    storeID: 'cbCityStore',
    displayField: 'city_name',
    valueField: 'city_id',
    fieldLabel:"City"
});


