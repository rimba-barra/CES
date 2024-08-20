Ext.define('Erems.view.popupgeneralinformation.GridPayment',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.popupgeneralinformationgridpayment',
    storeConfig:{
        id:'PopupgeneralinformationgridpaymentGridStore',
        idProperty:'payment_id',
        extraParams:{
            mode_read:'payment'
        }
    },
    bindPrefixName:'Popupgeneralinformation',
    newButtonLabel:' ',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
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
                dataIndex: 'payment_no',
                text: 'No. Kwitansi',
                width:150
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'payment_date',
                text: 'Tgl Bayar'
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
              
                dataIndex: 'schedule_duedate',
                text: 'Tgl JTempo'
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'paymentdetail_cair_date',
                text: 'Tgl Cair'
            },
            {
                xtype:'numbercolumn',
                dataIndex: 'paymentdetail_payment',
                text: 'Bayar'
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
        ];
        return dockedItems;
    }
});