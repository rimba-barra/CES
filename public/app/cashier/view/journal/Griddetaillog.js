Ext.define('Cashier.view.journal.Griddetaillog', {
    extend        : 'Cashier.library.template.view.GridDS2',
    alias         : 'widget.journalgriddetaillog',
    bindPrefixName: 'Journal',
    itemId        : 'Journaldetaillog',
    storeConfig   : {
        id         : 'DetailJournalLogGridStore',
        idProperty : 'action_id',
        extraParams: {
            mode_read : 'journallog',
            journal_id: 0
        }
    },
    height        : 220,
    title         : 'Log Detail',
    newButtonLabel: 'Add New',
    initComponent : function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig : {
            },
            features: [
            {
                ftype: 'summary',
            }
            ],
            columns: [
            {
                xtype: 'rownumberer'
            },
              // {
              //     xtype: 'gridcolumn',
              //     itemId: 'colms_transaction_no',
              //     width: 120,
              //     titleAlign: 'center',
              //     align: 'left',
              //     dataIndex: 'transaction_no',
              //     hideable: false,
              //     text: 'Journal No'
              // },
            {
                xtype     : 'gridcolumn',
                itemId    : 'colms_action',
                titleAlign: 'center',
                width     : 380,
                align     : 'left',
                dataIndex : 'action',
                hideable  : false,
                text      : 'Action',
                renderer: function(val) {
                        val = '<div style="white-space: normal;">' + val + '<div />';
                    return val;
                }
            },
            {
                xtype     : 'gridcolumn',
                itemId    : 'colms_user_fullname',
                width     : 150,
                titleAlign: 'center',
                align     : 'center',
                dataIndex : 'user_fullname',
                hideable  : false,
                text      : 'User'
            },
            {
                xtype     : 'gridcolumn',
                itemId    : 'colms_addon',
                width     : 150,
                titleAlign: 'center',
                align     : 'center',
                dataIndex : 'addon',
                hideable  : false,
                text      : 'Transaction Date'
            },         
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me          = this;
        var dockedItems = [
        {
        },
        {}
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {}
        return ac;
    },
    tooltip : function(el, text){
		var theTip = Ext.create('Ext.tip.Tip', {
			html  : text,
			margin: '0 0 0 200',
			shadow: false
		});
	   
		el.on('mouseover', function(){
			theTip.showAt((el.getX()+el.dom['clientWidth']-190), el.getY());
		});
	   
		el.on('mouseleave', function(){
			theTip.hide();
		});
	}
});