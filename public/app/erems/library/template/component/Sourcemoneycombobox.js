Ext.define('Erems.library.template.component.Sourcemoneycombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.sourcemoneycombobox',
    store: 'Sourcemoney',
    fieldLabel: 'Source money',
    displayField: 'sourcemoney',
    valueField: 'sourcemoney',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
});