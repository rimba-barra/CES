Ext.define('Erems.library.template.component.Citycombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.citycombobox',
    store: 'Masterdata.store.City',
    fieldLabel: 'City',
    displayField: 'city_name',
    valueField: 'city_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})