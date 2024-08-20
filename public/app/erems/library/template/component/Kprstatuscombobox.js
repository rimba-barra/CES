Ext.define('Erems.library.template.component.Kprstatuscombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.kprstatuscombobox',
    fieldLabel: 'KPR status',
    store: new Ext.data.ArrayStore({
        fields: [
            'kprstatus_id',
            'kprstatus'
        ],
        data: [[1, 'CORPORATE'], [2,'STANDART']]
    }),
    displayField: 'kprstatus',
    valueField: 'kprstatus_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})