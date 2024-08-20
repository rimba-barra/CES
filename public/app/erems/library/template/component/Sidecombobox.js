Ext.define('Erems.library.template.component.Sidecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.sidecombobox',
    store: 'Masterside',
    fieldLabel: 'Side direction',
    displayField: 'side',
    valueField: 'side_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})