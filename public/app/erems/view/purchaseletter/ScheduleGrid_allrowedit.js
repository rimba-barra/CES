Ext.define('Erems.view.purchaseletter.Schedulegrid', {
    //extend: 'Ext.grid.Panel',
    alias: 'widget.purchaseletterschedulegrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ScheduleGridStore',
        idProperty: 'schedule_id',
        extraParams: {
            mode_read: 'schedule'
        }
    },
    //  store: 'Schedule',
    requires: [
        'Erems.template.ComboBoxFields'
                //  'Erems.library.template.component.Sourcemoneycombobox'
    ],
    bindPrefixName: 'Purchaseletter',
    newButtonLabel: 'New Purchaseletter_no',
    height: 200,
    columnLines: true,
    initComponent: function() {
        var me = this;

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            //   dockedItems: me.generateDockedItems(),
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
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ke',
                    width: 50,
                    dataIndex: 'termin',
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
                    editor: {
                        xtype: 'textfield',
                        // maskRe: /[0-9\.]/,
                        //currencyFormat: true,
                        fieldStyle: 'text-align:right'
                    }
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_interest',
                    width: 100,
                    dataIndex: 'interset',
                    align: 'right',
                    hideable: false,
                    text: 'Interest',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_rest',
                    width: 130,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    align: 'right',
                    text: 'Remaining Balance',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_interestrest',
                    width: 120,
                    dataIndex: 'interestrest',
                    hideable: false,
                    align: 'right',
                    text: 'Remaining Balance Int',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    itemId: 'sourceMoneyColumnID',
                    dataIndex: 'sourcemoney_sourcemoney',
                    hideable: false,
                    text: 'Source Money'


                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_recommendationdate',
                    width: 120,
                    dataIndex: 'recomendationdate',
                    hideable: false,
                    text: 'Recomendation Date'

                }


                //   me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});