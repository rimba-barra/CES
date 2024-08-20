Ext.define('Erems.view.otherspayment.Schedulegrid', {
    //extend: 'Ext.grid.Panel',
    alias: 'widget.otherspaymentschedulegrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'OPScheduleGridStore',
        idProperty: 'schedule_id',
        extraParams: {
            mode_read: 'scheduledendalist'
        }
    },
   
    bindPrefixName: 'Otherspayment',
    newButtonLabel: '',
    height: 200,
    columnLines: true,
    initComponent: function() {
        var me = this;

       

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
           
            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    xtype: 'datecolumn',
                    type: 'date',
                    itemId: 'colms_code',
                    width: 90,
                    format: 'd-m-Y',
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Jatuh Tempo',
                    editor: {
                        xtype: 'datefield',
                        allowBlank: true,
                        format: 'd/m/Y',
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 40,
                    dataIndex: 'scheduletype_scheduletype',
                    hideable: false,
                    text: 'Type',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ke',
                    width: 50,
                    dataIndex: 'termin',
                  
                    hideable: false,
                    text: 'Ke'
                },
                {
                    xtype: 'numbercolumn',
                   
                    width: 130,
                    dataIndex: 'amount',
                    hideable: false,
                    align: 'right',
                    text: 'Piutang'
                },
                {
                    xtype: 'numbercolumn',
                   
                    width: 130,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    align: 'right',
                    text: 'Sisa Piutang'
                },
                {
                    xtype: 'numbercolumn',
                   
                    width: 130,
                    dataIndex: 'remaining_denda',
                    hideable: false,
                    align: 'right',
                    text: 'Remaining Denda'
                },
                


                //   me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'bayar',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Bayar'
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});