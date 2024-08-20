Ext.define('Erems.library.template.component.Countrycombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.countrycombobox',
    store: 'Masterdata.store.Country',
    fieldLabel: 'Country',
    displayField: 'country_name',
    valueField: 'country_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})