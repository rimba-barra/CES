Ext.define('Erems.library.template.component.Utilitystatuscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.utilitystatuscombobox',
    store: 'Masterutilitystatus',
    fieldLabel: 'Utility Status',
    displayField: 'utilitystatus',
    valueField: 'utilitystatus_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})