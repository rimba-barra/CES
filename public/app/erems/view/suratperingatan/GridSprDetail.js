Ext.define('Erems.view.suratperingatan.GridSprDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.suratperingatangridsprdetail',
    store: 'Suratperingatansprdetail',
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
                    itemId: 'colms_type',
                    width: 100,
                    dataIndex: 'scheduletype',
                    hideable: false,
                    text: 'Type',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_termin',
                    width: 100,
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
                    text: 'DueDate'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_nilai',
                    width: 100,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Nilai'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_denda',
                    width: 100,
                    dataIndex: 'denda',
                    hideable: false,
                    text: 'Denda'
                }

                //		me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },

    generateDockedItems: function () {

        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'label',
                        text: '',
                        width: 300

                    }
                ]
            },
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