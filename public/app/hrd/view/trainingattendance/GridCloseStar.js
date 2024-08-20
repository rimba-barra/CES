Ext.define('Hrd.view.trainingattendance.GridCloseStar', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingattendanceclosestargrid',
    storeConfig: {
        id: 'TrainingattendanceGridCloseStarStore',
        idProperty: 'trainingname_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingname',
    newButtonLabel: 'New',
    itemId:'TrainingattendanceGridCloseStarID',
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
                },{
                   dataIndex: 'employee_name',
                   text: 'Employee Name'
                },
                {
                   dataIndex: 'email_ciputra',
                   text: 'Email Ciputra'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'HC Checked (Registration)',
                    dataIndex   : 'hc_checked',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'HC Checked (Attendance)',
                    dataIndex   : 'hc_checked_att',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    resizable   : false,
                    align       : 'center'
                }
                
               
              //  me.generateActionColumn()
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            // {
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     height: 28,
            //     items: [
            //         {
            //             xtype: 'button',
            //             action: 'generatedate',
            //             iconCls: 'icon-new',
            //             text: 'Generate Date'
            //         },
            //         {
            //             xtype: 'button',
            //             action: 'deletedate',
            //             iconCls: 'icon-delete',
            //             text: 'Delete Date'
            //         }
            //     ]
            // },
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