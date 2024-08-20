Ext.define('Erems.library.template.component.Utilitytypecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.utilitytypecombobox',
    store: 'Masterutilitytype',
    fieldLabel: 'Utility Type',
    displayField: 'utilitytype',
    valueField: 'utilitytype_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})