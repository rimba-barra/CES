Ext.define('Erems.view.suratperingatan.GridDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.suratperingatangriddetail',
    store: 'Suratperingatandetail',
    //bindPrefixName: 'Bankkprakad',
    //newButtonLabel: 'Add New Confirmation',
    height: 200,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_suratperingatan_detail_id',
                    dataIndex: 'suratperingatan_detail_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_schedule_id',
                    dataIndex: 'schedule_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_scheduletype_id',
                    dataIndex: 'scheduletype_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_scheduletype',
                    width: 70,
                    dataIndex: 'scheduletype',
                    hideable: false,
                    text: 'Type',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_termin',
                    width: 50,
                    dataIndex: 'termin',
                    hideable: false,
                    text: 'Termin'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_duedate',
                    width: 100,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Duedate',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_receiveable',
                    width: 100,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Receiveable'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_rest',
                    width: 100,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Rest'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_denda',
                    width: 100,
                    dataIndex: 'denda2',
                    hideable: false,
                    text: 'Denda'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_rest_denda',
                    width: 100,
                    dataIndex: 'rest_denda',
                    hideable: false,
                    text: 'Rest Denda'
                },

                //		me.generateActionColumn()
            ],
            //            bbar: [
            //                            '',
            //                        {
            //                            xtype: 'tbfill'
            //                        },
            //                            '',
            //                        {
            //                            xtype: 'tbfill'
            //                        },
            //                        {
            //                            xtype: 'button',
            //                            hidden: false,
            //                            itemId: 'btnAdd',
            //                            margin: '0 5 0 0',
            //                            action: 'add_new',
            //                            iconCls: 'icon-new',
            //                            text: 'ADD NEW',
            //                        },
            //                        {
            //                            xtype: 'button',
            //                            hidden: false,
            //                            itemId: 'btnGenerate',
            //                            margin: '0 5 0 0',
            //                            action: 'generate',
            //                            iconCls: 'icon-new',
            //                            text: 'GENERATE BERKAS',
            //			}
            //            ]
        });

        me.callParent(arguments);
    },

    generateDockedItems: function () {

        var me = this;

        var dockedItems = [
            /*{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    }
                ]
            },*/
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },

    generateActionColumn: function () {

        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            //hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'center',
            hideable: false,
            items: [

                {
                    tooltip: 'Edit',
                    icon: document.URL + 'app/main/images/icons/edit.png',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('editaction', arguments);
                        //console.log(arguments);
                    }
                },

                {
                    tooltip: 'Delete',
                    icon: document.URL + 'app/main/images/icons/delete.png',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('deleteaction', arguments);
                    }
                }
            ]
        };
        return ac;
    }


});