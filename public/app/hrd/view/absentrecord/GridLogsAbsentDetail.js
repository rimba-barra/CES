Ext.define('Hrd.view.absentrecord.GridLogsAbsentDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridlogsabsentdetail',
    storeConfig: {
        id: 'absentrecordGridLogsAbsentDetail',
        idProperty: 'log_id',
        extraParams: {
            mode_read: 'getlogabsentdetail'
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
                    dataIndex: 'date',
                    text: 'Date',
                    name: 'date',
                    align: 'center',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'time_in',
                    text: 'Time In (Before)',
                    name: 'time_in',
                    align: 'center',
                    sortable: true,
                },
                {
                    dataIndex: 'time_out',
                    text: 'Time Out (Before)',
                    name: 'time_out',
                    align: 'center',
                    sortable: true,
                },
                {
                    dataIndex: 'time_in_after',
                    text: 'Time In (After)',
                    name: 'time_in_after',
                    align: 'center',
                    sortable: true,
                },
                {
                    dataIndex: 'time_out_after',
                    text: 'Time Out (After)',
                    name: 'time_out_after',
                    align: 'center',
                    sortable: true,
                },
                {
                    dataIndex: 'reason',
                    text: 'Reason',
                    name: 'reason',
                    sortable: true,
                },
            ]
        });

        me.callParent(arguments);
    },

});