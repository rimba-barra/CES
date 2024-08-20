Ext.define('Hrd.view.approvalmatrix.Gridviewdoccontract', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.approvalmatrixgridviewdoccontract',
    storeConfig: {
        id: 'approvalmatrixGridviewdoccontract',
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
                    dataIndex: 'category_name',
                    text: 'Category',
                    width: 230,
                    name: 'category_name',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'content_name',
                    text: 'Content Name',
                    align: 'left',
                    width: 120,
                    name: 'content_name',
                    sortable: true
                },
                {
                    dataIndex: 'content_description',
                    text: 'Content Description',
                    align: 'left',
                    width: 300,
                    name: 'content_description',
                    sortable: true
                },
                {
                    dataIndex: 'score_1_name',
                    text: 'Score 1',
                    align: 'left',
                    width: 150,
                    name: 'score_1_name',
                    sortable: true
                },
                {
                    dataIndex: 'score_2_name',
                    text: 'Score 2',
                    align: 'left',
                    width: 150,
                    name: 'score_2_name',
                    sortable: true
                },
                {
                    dataIndex: 'score_3_name',
                    text: 'Score 3',
                    align: 'left',
                    width: 150,
                    name: 'score_3_name',
                    sortable: true
                },
                {
                    dataIndex: 'score_4_name',
                    text: 'Score 4',
                    align: 'left',
                    width: 150,
                    name: 'score_4_name',
                    sortable: true
                },
                {
                    dataIndex: 'score_5_name',
                    text: 'Score 5',
                    align: 'left',
                    width: 150,
                    name: 'score_5_name',
                    sortable: true
                },
            ]
        });

        me.callParent(arguments);
    },
    
});