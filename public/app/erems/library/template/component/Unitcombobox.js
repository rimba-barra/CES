Ext.define('Erems.library.template.component.Unitcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.unitcombobox',
    store: 'Unit',
    fieldLabel: 'Unit',
    displayField: 'unit_number',
    valueField: 'unit_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})