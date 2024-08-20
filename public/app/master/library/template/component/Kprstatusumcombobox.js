Ext.define('Master.library.template.component.Kprstatusumcombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.kprstatusumcombobox',
    fieldLabel: 'Status KPR',
    store: new Ext.data.ArrayStore({
        fields: [
            'kprstatusum_id',
            'kprstatusum'
        ],
        data: [[1, 'SUBSIDI'], [2,'NON SUBSIDI']]
    }),
    displayField: 'kprstatusum',
    valueField: 'kprstatusum_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})