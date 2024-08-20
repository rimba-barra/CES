Ext.define('Hrd.view.absentrecord.GridCutidetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridintranetcutidetail',
    storeConfig: {
        id: 'absentrecordGridCutidetail',
        idProperty: 'cutidetail_id',
        extraParams: {
            mode_read: 'getdatacutidetailintranet'
        }
    },
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            columns: [
                {
                    dataIndex: 'cutidetail_id',
                    text: 'ID',
                    align: 'right',
                    width: 100,
                    name: 'cutidetail_id',
                    sortable: true
                },
                {
                    dataIndex: 'start_date',
                    text: 'Mulai Tanggal',
                    width: 120,
                    name: 'start_date',
                    align: 'center',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'end_date',
                    text: 'Sampai Tanggal',
                    width: 120,
                    name: 'end_date',
                    align: 'center',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'total_hari',
                    text: 'Jumlah Hari',
                    width: 80,
                    name: 'total_hari',
                    align: 'right',
                    sortable: true
                },
            ]
        });

        me.callParent(arguments);
    },

});