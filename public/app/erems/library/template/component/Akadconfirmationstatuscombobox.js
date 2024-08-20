Ext.define('Erems.library.template.component.Akadconfirmationstatuscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.akadconfirmationstatuscombobox',
    store: 'Masterakadconfirmationstatus',
    fieldLabel: 'Confirmation Status',
    displayField: 'akadconfirmation_status',
    valueField: 'akadconfirmation_status_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})