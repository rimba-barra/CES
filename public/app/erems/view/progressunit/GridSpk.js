Ext.define('Erems.view.progressunit.GridSpk', {
    extend: 'Erems.library.template.view.GridDS',
    alias: 'widget.progressgridspk',
    bindPrefixName: 'Progressunit',
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
                    text: 'SPK Number'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'spk_date',
                    text: 'SPK Date'
                },
                {
                    dataIndex: 'contractor_contractorname',
                    text: 'Contractor Name'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'started',
                    text: 'Start Date'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'ended',
                    text: 'End Date'
                },
                {
                    dataIndex: 'contractor_PIC',
                    text: 'Supervisor'
                },
                {
                    dataIndex: 'status',
                    text: 'Status'
                },
                {
                    dataIndex: 'progress',
                    text: 'Progress'
                },
               // me.generateActionColumn(),
            ]
        });

        me.callParent(arguments);
    },
    showAddNewButton: function() {
        var x = {
            xtype: 'button',
            margin: '0 5 0 0',
            action: 'select',
            iconCls: 'icon-new',
            text: 'Add New Detail'
        };
        return x;
    },
   
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                align: 'right',
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                      //  iconCls: 'icon-add',
                        text: 'Select'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});