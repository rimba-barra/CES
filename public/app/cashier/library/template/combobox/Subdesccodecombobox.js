Ext.define('Cashier.library.template.combobox.Subdesccodecombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.subdesccodecombobox',
    store: 'Subdesccode', //masuk dalam store
    fieldLabel: 'Subdesccode',
    displayField: 'subdsk', //mengambil data dari store
    valueField: 'subdsk_id', //mengambil data dari store
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})


 
