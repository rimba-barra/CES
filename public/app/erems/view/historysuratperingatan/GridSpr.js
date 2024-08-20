Ext.define('Erems.view.historysuratperingatan.GridSpr', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.historysuratperingatangridspr',
    store: 'Historysuratperingatandetail',
    //    store:'Suratperingatan',
    //    bindPrefixName:'Suratperingatan',
    // itemId:'',
    //    newButtonLabel:'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 40,
                    resizable: true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_scheduletype',
                    width: 150,
                    dataIndex: 'scheduletype',
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_termin',
                    width: 100,
                    dataIndex: 'termin',
                    hideable: false,
                    text: 'Termin',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_duedate',
                    width: 100,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'DueDate',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining_balance',
                    width: 100,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Nilai',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining_denda',
                    width: 100,
                    dataIndex: 'remaining_denda',
                    hideable: false,
                    text: 'Denda',
                },




                //                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },

    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         {
            //             xtype: 'button',
            //             action: 'view_spr',
            //             itemId: 'btnView',
            //             margin: '0 5 0 0',
            //             text: 'View SPr',
            //             disabled: true,

            //         },
            //         {
            //             xtype: 'button',
            //             action: 'cetak_spr',
            //             itemId: 'btnCetakSpr',
            //             margin: '0 5 0 0',
            //             text: 'Cetak SPr',
            //             disabled: true,
            //         },

            //     ]
            // },
            //            {
            //                xtype: 'pagingtoolbar',
            //                dock: 'bottom',
            //                width: 360,
            //                displayInfo: true,
            //                store: this.getStore()
            //            }
        ];
        return dockedItems;
    },

});


