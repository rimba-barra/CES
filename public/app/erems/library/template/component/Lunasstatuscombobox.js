Ext.define('Erems.library.template.component.Lunasstatuscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.lunasstatuscombobox',
    fieldLabel: 'Status Lunas',
    store: new Ext.data.ArrayStore({
        fields: [
            'id',
            'name'
        ],
        data: [['1', 'LUNAS'], ['0', 'BELUM']]
    }),
    displayField: 'name',
    valueField: 'id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})