Ext.define('Hrd.view.trainingattendance.GridDetailDateForm', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingattendanceddfgrid',
    storeConfig: {
        id: 'TrainingattendanceGridDDFStore',
        idProperty: 'trainingattendancedate_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingattendance',
    newButtonLabel: 'New',
    itemId:'TrainingattendanceGridDDFID',
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
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'trainingscheduledate',
                    text: 'Tanggal',
                    
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Attendance',
                    dataIndex   : 'attendance',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 90,
                    resizable   : false,
                    align       : 'center'
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
                        action: 'attenddate',
                        iconCls: 'icon-new',
                        text: 'Attend',
                        itemId: 'btnAttend',
                    },
                    {
                        xtype: 'button',
                        action: 'notattenddate',
                        iconCls: 'icon-delete',
                        text: 'Not Attend',
                        itemId: 'btnNotAttend',
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
   
});