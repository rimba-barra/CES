Ext.define('Erems.library.template.component.Atttypecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.atttypecombobox',
    store: 'Atttype',
    fieldLabel: 'Atttype',
    displayField: 'atttype',
    valueField: 'atttype_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})