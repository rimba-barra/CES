Ext.define('Cashier.view.kartupiutangsurabaya.GridBillingSchedule',{
    extend:'Cashier.library.template.view.GridDS2',
    alias:'widget.kartupiutangsurabayabillingschedulegrid',
     storeConfig:{
        id:'KartuPiutangBSGridStore',
        idProperty:'schedule_id',
        extraParams:{
            mode_read:'schedule'
        }
    },
    bindPrefixName:'Kartupiutangsurabaya',
    newButtonLabel:'New Expense_no',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: {},
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

                }),
            defaults: {
                xtype:'gridcolumn',
                width: 100,
                hidden:false
            },
            columns: [
            {
                xtype: 'rownumberer'
            },
            {
                dataIndex: 'scheduletype_scheduletype',
                text: 'Type',
                type:70
            },
            {
                dataIndex: 'termin',
                text: 'Termin',
                width:30,
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'duedate',
                text: 'Due Date'
            },
            {
                xtype: 'numbercolumn',
                align: 'right',
                dataIndex: 'amount',
                text: 'Amount'
            },
            {
                dataIndex: 'sourcemoney_sourcemoney',
                text: 'Source Money'
            },
            {
                xtype:'numbercolumn',
                align:'right',
                dataIndex: 'paymentdetail_amount',
                text: 'Payment'
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'payment_payment_date',
                text: 'Payment Date'
            },
            
                
            me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Kartu Piutang',
                    iconCls: 'icon-form',
                    bindAction: me.bindPrefixName + 'View',
                    altText: 'Kartu Piutang',
                    className:'view',
                    tooltip: 'Kartu Piutang'
                }
            ]
        };
        return ac;
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
                        hidden: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-form',
                        bindAction: me.bindPrefixName + 'View',
                        text: 'View'
                    },
                   
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    }
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
