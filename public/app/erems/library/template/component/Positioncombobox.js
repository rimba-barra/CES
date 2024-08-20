Ext.define('Erems.library.template.component.Positioncombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.positioncombobox',
    store: 'Masterposisi',
    fieldLabel: 'Position',
    displayField: 'position',
    valueField: 'position_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})