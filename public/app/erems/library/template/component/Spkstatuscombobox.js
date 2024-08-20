Ext.define('Erems.library.template.component.Spkstatuscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.spkstatuscombobox',
    fieldLabel: 'Status SPK',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'name'
        ],
        data: [['OPEN', 'OPEN'], ['CLOSE', 'CLOSE'], ['CANCEL', 'CANCEL']]
    }),
    displayField: 'name',
    valueField: 'name',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})