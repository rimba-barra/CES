Ext.define('Hrd.view.trainingattendance.GridDetailSurvey', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.trainingattendancedsgrid',
    storeConfig: {
        id: 'TrainingattendanceGridDSStore',
        idProperty: 'trainingattendancesurvey_id',
        extraParams: {}
    },
    bindPrefixName: 'Trainingattendance',
    newButtonLabel: 'New',
    itemId:'TrainingattendanceGridDSID',
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
                // {
                //     xtype:'datecolumn',
                //     format:'d-m-Y',
                //     dataIndex: 'trainingscheduledate',
                //     text: 'Tanggalaaaa',
                    
                // },
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
               // {
               //      text: 'ID',
               //      dataIndex: 'menu_id',
               //      width: 40,
               //      align: 'right',
               //      hideable: false
               //  }, 
               // {
               //      xtype: 'treecolumn',
               //      text: 'Caption',
               //      dataIndex: 'menu_parent_name',
               //      width: 200,
               //      hideable: false
               //  }, 
                {
                    text: 'Category',
                    dataIndex: 'survey_parent_name',
                    width: 200,
                }, 
                {
                    text: 'Name',
                    dataIndex: 'survey_name',
                    width: 220,
                }, 
                // {
                //     text: 'Order',
                //     dataIndex: 'menu_order',
                //     width: 40,
                //     align: 'right'
                // }, 
                // {
                //     text: 'Controller',
                //     dataIndex: 'trainingsurvey_id'
                // }, 
                {
                    text: 'Value',
                    dataIndex: 'trainingsurvey_value'
                }
                // , {
                //     text: 'Icon',
                //     dataIndex: 'menu_icon'
                // }, {
                //     text: 'Icon Cls',
                //     dataIndex: 'menu_icon_cls'
                // }, {
                //     text: 'Func. Args.',
                //     dataIndex: 'menu_args'
                // }, {
                //     xtype: 'booleancolumn',
                //     text: 'Active',
                //     dataIndex: 'active',
                //     falseText: ' ',
                //     trueText: '&#10003;',
                //     width: 50,
                //     align: 'center',
                //     resizable: false
                // }, {
                //     text: 'Description',
                //     dataIndex: 'description'
                // }

              
                
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