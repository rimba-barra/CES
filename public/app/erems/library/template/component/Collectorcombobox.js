Ext.define('Erems.library.template.component.Collectorcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.collectorcombobox',
    queryMode: 'local',
    fieldLabel: 'Collector',
    // store: new Ext.data.ArrayStore({
    //     fields: [
    //         'collector_id',
    //         'collector',
    //         'code'
    //     ],
    //     data: [[1, 'Zhao Yun','00'], [2, 'Xiang He','01']]
    // }),
    // queryMode: 'local',
    store: 'Mastercollector',
    displayField: 'collector_name',
    valueField: 'collector_id',

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
        //   return record.get(this.displayField);
        //}
    }
});