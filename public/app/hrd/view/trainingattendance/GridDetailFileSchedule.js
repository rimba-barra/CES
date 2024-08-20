Ext.define('Hrd.view.trainingattendance.GridDetailFileSchedule', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingattendancedetailfileschedulegrid',
    storeConfig: {
        id: 'TrainingattendanceGridDetailFileScheduleStore',
        idProperty: 'trainingattendanceattachschedule_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingattendance',
    newButtonLabel: 'New',
    itemId:'TrainingattendanceGridDetailFileScheduleID',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: [],
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
                width:75
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    dataIndex: 'file_name',
                    text: 'File Name',
                    
                },
              //  me.generateActionColumn()
                
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
                        action: 'addattach_schedule',
                        iconCls: 'icon-new',
                        text: 'Add attachment by Training Schedule'
                    },
                    {
                        xtype: 'button',
                        action: 'removeattach_schedule',
                        iconCls: 'icon-delete',
                        text: 'Remove attachment'
                    }
                ]
            },
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            action: 'viewdata_trainingattendance_schedule',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    icon: 'app/main/images/icons/archives.png',
                    action: 'viewdata_trainingattendance_schedule',
                    text: 'View Document',
                    tooltip: 'View Document',
                }
            ]
        }

        return ac;

    },
});