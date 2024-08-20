Ext.define('Erems.view.purchaseletterNew.Schedulegrid', {
    //extend: 'Ext.grid.Panel',
    alias: 'widget.purchaseletterNewschedulegrid',
    // extend: 'Erems.library.template.view.GridDS2',
    // storeConfig: {
    //     id: 'ScheduleGridStore',
    //     idProperty: 'schedule_id',
    //     extraParams: {
    //         mode_read: 'schedule'
    //     }
    // },
    extend: 'Erems.library.template.view.Grid',
    store: 'Purchaseletternewschedulegrid',
    requires: [
        'Erems.template.ComboBoxFields'
                //  'Erems.library.template.component.Sourcemoneycombobox'
    ],
    bindPrefixName: 'PurchaseletterNew',
    newButtonLabel: 'New Purchaseletter_no',
    height: 200,
    columnLines: true,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function() {
        var me = this;

       


        var cbf = new Erems.template.ComboBoxFields();

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            plugins: [rowEditing],
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
                    text: 'Duedate',
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
                    // editor:{
                    //     xtype:'combobox',
                    //     store:'Scheduletype',
                    //     displayField:'scheduletype',
                    //     valueField: 'scheduletype'
                    // }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ke',
                    width: 50,
                    dataIndex: 'termin',
                    // editor: {
                    //     xtype: 'textfield',
                    //     maskRe: /[0-9]/,
                    //     //currencyFormat: true,
                    //     fieldStyle: 'text-align:right'
                    // },
                    hideable: false,
                    text: 'Queue'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_Recieveable',
                    width: 130,
                    dataIndex: 'amount',
                    hideable: false,
                    align: 'right',
                    text: 'Amount',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                    // editor: {
                    //     xtype: 'textfield',
                    //     // maskRe: /[0-9\.]/,
                    //     //currencyFormat: true,
                    //     fieldStyle: 'text-align:right'
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_rest',
                    width: 130,
                    dataIndex: 'remaining_balance',
                    renderer: function(v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                    hideable: false,
                    align: 'right',
                    text: 'Remaining Balance'
                    
                },
                {
                    xtype: 'gridcolumn',
                  
                    width: 100,
                    dataIndex: 'sourcemoney_sourcemoney',
                    hideable: false,
                    text: 'Source Money',
                    // editor:{
                    //     xtype:'combobox',
                    //     store:'Sourcemoney',
                    //     displayField:'sourcemoney',
                    //     valueField: 'sourcemoney'
                    // }
                }
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
                        action: 'create',
                        hidden:true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New Schedule'
                    },
                    {
                        xtype: 'button',
                        hidden:true,
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'reschedule',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        hidden:true,
                        text: 'Reschedule'
                    },
                ]
            },
            // {
            //     xtype: 'pagingtoolbar',
            //     dock: 'bottom',
            //     width: 360,
            //     displayInfo: true,
            //     store: this.getStore()
            // }
        ];
        return dockedItems;
    }
});