Ext.define('Erems.view.spkclose.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'SpkCloseGridStore',
        idProperty:'spk_id',
        extraParams:{}
    },
    alias:'widget.spkclosegrid',
    bindPrefixName:'Spkclose',
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
                dataIndex: 'spk_no',
                text: 'SPK No'
            },
            
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'spk_date',
                
                text: 'SPK Date'
            },
            {
                dataIndex: 'time_duration',
                text: 'Implement Time'
            },
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'started',
                text: 'Start',
                
            },
            
            {
                xtype:'datecolumn',
                format:'d-m-Y',
                dataIndex: 'ended',
                text: 'End'
            },
            {
                dataIndex: 'contractor_contractorname',
                text: 'Contractor'
            },
            {
                dataIndex: 'job_title',
                text: 'Title'
            },
            {
                dataIndex: 'description',
                text: 'Desc'
            },
            {
                xtype:'numbercolumn',
                align:'right',
                dataIndex: 'job_fee',
                text: 'Fee'
            },
            {
                dataIndex: 'spktype_spktype',
                text: 'Type'
            },
            {
                dataIndex: 'progress',
                text: 'Progress'
            },
            {
                dataIndex: 'status',
                text: 'Status'
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
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Closing',
                    tooltip: 'Closing'
                },
                
                {
                    text: 'Delete',
                   
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
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
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Closing',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'editst',
                        itemId: 'btnEditSerah',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit Serah Terima',
                        disabled: true,
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
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
    },
    
});