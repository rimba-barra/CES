Ext.define('Erems.library.template.component.Attributecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.attributecombobox',
    store: 'Masterattribute',
    fieldLabel: 'Attribute',
    displayField: 'attribute',
    valueField: 'attribute_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})