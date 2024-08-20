Ext.define('Erems.library.template.component.Statusberkascombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.statusberkascombobox',
    fieldLabel: 'Status',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'name'
        ],
        data: [['SUDAH', 'SUDAH'], ['BELUM', 'BELUM']]
    }),
    displayField: 'name',
    valueField: 'name',
    forceSelection : true,
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})