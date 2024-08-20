Ext.define('Hrd.view.registertrainingbytype.ScheduleGrid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.registertrainingbytypeschedulegrid',
    storeConfig: {
        id: 'ScheduleTrainingRegistrationGridStore',
        idProperty: 'scheduletraining_id',
        extraParams: {
            mode_read:'schedule'
        }
    },
    columnLines: false,
    bindPrefixName: 'Registertrainingbytype',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'


            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'programtraining_code',
                   text: 'Training Code'
                },
                {
                   dataIndex: 'programtraining_theme',
                   text: 'Description',
                   width:200
                },
                {
                   xtype:'datecolumn',
                   format:'d-m-Y',
                   dataIndex: 'start_date',
                   text: 'Start Date',
                },
                {
                   xtype:'datecolumn',
                   format:'d-m-Y',
                   dataIndex: 'end_date',
                   text: 'End Date',
                },
                
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Select Schedule"
                    }
                ]
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
            
            ]
        };
        return ac;
    }
});