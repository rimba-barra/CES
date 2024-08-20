Ext.define('Erems.view.suratperingatan.GridSchedulePayment',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.suratperingatangridschedulepayment',
    store:'Suratperingatanschedule',
//    store:'Suratperingatan',
//    bindPrefixName:'Suratperingatan',
   // itemId:'',
//    newButtonLabel:'New',
    initComponent: function() {
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
                    itemId: 'colms_payment_no',
                    width: 100,
                    dataIndex: 'payment_no',
                    text: 'Payment No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 100,
                    dataIndex: 'scheduletype',
                    hideable: false,
                    text: 'Type'
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
                    itemId: 'colms_due_date',
                    width: 100,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Due Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_receiveable',
                    width: 150,
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Receiveable'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rest',
                    width: 150,
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Rest'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_denda',
                    width: 100,
                    dataIndex: 'denda',
                    hideable: false,
                    text: 'Denda'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rest_denda',
                    width: 100,
                    dataIndex: 'remaining_denda',
                    hideable: false,
                    text: 'Rest Denda'
                },
		
                
				
//                me.generateActionColumn()
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
                        xtype: 'label',
                        text: 'Schedule Payment',
                        width: 300
                        
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
    },

});


