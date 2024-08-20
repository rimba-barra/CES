Ext.define('Erems.library.template.component.Purposebuycombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.Purposebuycombobox',
    store: 'Masterpurposebuy',
    fieldLabel: 'Purpose Buy use',
    displayField: 'purposebuy',
    valueField: 'purposebuy_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})