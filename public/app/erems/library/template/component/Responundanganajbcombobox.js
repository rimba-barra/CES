Ext.define('Erems.library.template.component.Responundanganajbcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.responundanganajbcombobox',
    queryMode: 'local',
    fieldLabel: 'Respon Undangan AJB',
    // store: new Ext.data.ArrayStore({
    //     fields: [
    //         'collector_id',
    //         'collector',
    //         'code'
    //     ],
    //     data: [[1, 'Zhao Yun','00'], [2, 'Xiang He','01']]
    // }),
    // queryMode: 'local',
    store: 'Responundanganajb',
    displayField: 'respon',
    valueField: 'respon_undanganajb_id',

    initComponent: function () {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
        //   return record.get(this.displayField);
        //}
    }
});