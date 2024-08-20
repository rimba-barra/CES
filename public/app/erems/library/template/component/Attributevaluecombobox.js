Ext.define('Erems.library.template.component.Attributevaluecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.attributevaluecombobox',
    store: 'Masterattributevalue',
    fieldLabel: 'Attribute value',
    displayField: 'attributevalue',
    valueField: 'attributevalue_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})