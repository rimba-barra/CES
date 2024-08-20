Ext.define('Hrd.view.approvalmatrix.GridApprovalContract', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.approvalmatrixgridapprovalcontract',
    storeConfig: {
        id: 'approvalmatrixGridapprovalcontract',
        idProperty: 'fingerprintprocess_id',
        extraParams: {}
    },
    bindPrefixName: 'Approvalmatrix',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            // selModel: Ext.create('Ext.selection.CheckboxModel', {}),

            columns: [
                 {
                    xtype: 'rownumberer',
                    text: 'No',
                    width: 30,
                    align: 'right',
                },
                {
                    dataIndex: 'penilai_name',
                    text: 'Approval Name',
                    width: 100,
                    name: 'penilai_name',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'last_review',
                    text: 'Last Review',
                    align: 'left',
                    width: 80,
                    name: 'last_review',
                    sortable: true
                },
                {
                    dataIndex: 'last_review_date',
                    text: 'Submit Date',
                    align: 'left',
                    width: 100,
                    name: 'last_review_date',
                    sortable: true
                },
            ]
        });

        me.callParent(arguments);
    },
    
});