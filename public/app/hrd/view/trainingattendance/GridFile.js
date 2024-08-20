Ext.define('Hrd.view.trainingattendance.GridFile', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingattendancefilegrid',
    storeConfig: {
        id: 'TrainingattendanceGridFileStore',
        idProperty: 'trainingattendanceattach_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingattendance',
    newButtonLabel: 'New',
    itemId:'TrainingattendanceGridFileID',
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
                // {
                //     xtype       : 'booleancolumn',
                //     text        : 'Attendance',
                //     dataIndex   : 'attendance',
                //     trueText    : '&#10003;',
                //     falseText   : ' ',
                //     width       : 90,
                //     resizable   : false,
                //     align       : 'center'
                // },
               
              //  me.generateActionColumn()
                
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            action: 'viewdata_trainingattendance_intranet',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    icon: 'app/main/images/icons/archives.png',
                    action: 'viewdata_trainingattendance_intranet',
                    text: 'View Document',
                    tooltip: 'View Document',
                }
            ]
        }

        return ac;

    },
   
});