Ext.define('Erems.view.popupgeneralinformation.GridUtility',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.popupgeneralinformationgridutility',
    storeConfig:{
        id:'PopupgeneralinformationgridutilityGridStore',
        idProperty:'utility_id',
        extraParams:{
            mode_read:'utility'
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
                dataIndex: 'utilitytype_utilitytype',
                text: 'Type',
                width:100
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'request_date',
                text: 'Request Date',
                width:80
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'followup_date',
                text: 'Followup Date',
                width:80
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'installment_date',
                text: 'Installment Date',
                width:100
            },
            {
                dataIndex: 'meter_no',
                text: 'Meter No.',
                width:150
            },
            {
                dataIndex: 'utilitystatus_utilitystatus',
                text: 'Status',
                width:100
            }
            
                
          //  me.generateActionColumn()
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