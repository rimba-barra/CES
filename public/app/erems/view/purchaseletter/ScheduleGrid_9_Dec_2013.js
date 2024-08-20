Ext.define('Erems.view.purchaseletter.Schedulegrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.purchaseletterschedulegrid',
    store: 'Schedule',
    requires: [
        'Erems.library.template.component.Sourcemoneycombobox'
    ],
    bindPrefixName: 'Purchaseletter',
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

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            //   dockedItems: me.generateDockedItems(),
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
                    dataIndex: 'scheduletype',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ke',
                    width: 50,
                    dataIndex: 'queue',
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
                    itemId: 'colms_sourcemoney',
                    width: 100,
                    dataIndex: 'sourcemoney_id',
                    hideable: false,
                    text: 'Source',
                    editor: {
                        xtype: 'sourcemoneycombobox',
                        fieldLabel: '',
                        isEditor: true
                    }
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