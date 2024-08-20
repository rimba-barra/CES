Ext.define('Erems.view.purchaseletterreward.RewardGrid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.purchaseletterrewardgriddetail',
    store: 'Purchaseletterrewarddetail',
    height: 300,
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),

            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', { mode : "SINGLE" }),
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_reward_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'reward',
                    text: 'Reward'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'reward_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'group_name',
                    text: 'Group'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'group_id',
                    text: 'Group',
                    hidden: true
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'amount',
                    text: 'Amount',
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nomor_im',
                    text: 'Nomor IM/FP',
                },
                {
                    xtype     : 'datecolumn',
                    dataIndex : 'tanggal_im',
                    text      : 'Tanggal IM/FP',
                    type      : 'date',
                    format    : 'd-m-Y',
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'addon',
                    text: 'Tanggal Simpan',
                    type: 'date',
                    format: 'd-m-Y',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'note',
                    text: 'Note'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'user_date_check',
                    text: 'Tanggal Cek',
                    type: 'date',
                    format: 'd-m-Y',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_check_name',
                    text: 'User Cek'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'user_date_proses',
                    text: 'Tanggal Proses',
                    type: 'date',
                    format: 'd-m-Y',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_proses_name',
                    text: 'User Proses'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'add',
                        disabled: false,
                        margin: '0 5 0 0',
                        text: "Add New",
                    },
                    {
                        xtype: 'button',
                        action: 'edit',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Edit"
                    },
                    {
                        xtype: 'button',
                        action: 'delete',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Delete"
                    }
                ]
            }
        ];
        return dockedItems;
    },

});