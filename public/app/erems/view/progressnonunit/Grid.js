Ext.define('Erems.view.progressnonunit.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'ProgressnonunitGridStore',
        idProperty:'spk_id',
        extraParams:{}
    },
    alias:'widget.progressnonunitgrid',
    bindPrefixName:'Progressnonunit',
    newButtonLabel:'New Spk_no',
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
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'spk_no',
                    width:150,
                    text: 'SPK NO'
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
                    text: 'Start'
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
                    dataIndex: 'job_fee',
                    text: 'Fee'
                },
                {
                    dataIndex: 'progress',
                    text: 'Progress'
                },
                {
                    dataIndex: 'status',
                    text: 'Status'
                },
                me.generateActionColumn(),
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
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Show Progress',
                        bindAction: me.bindPrefixName + 'Update'
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
                    altText: 'Show Progress',
                    tooltip: 'Show Progress'
                }
            ]
        };
        return ac;
    }
});