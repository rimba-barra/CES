Ext.define('Hrd.view.firstdayemployee.GridShortcutEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.firstdayemployeeshortcutemployeeppgrid',
    storeConfig: {
        id: 'FirstdayemployeeGridShortcutEmployeePPStore',
        idProperty: 'firstdayform_answer_id',
        extraParams: {}
    },
    bindPrefixName: 'firstdayform_answer_id',
    newButtonLabel: 'New',
    itemId:'FirstdayemployeeGridShortcutEmployeePPID',
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
                   text: 'Employee Name',
                   width:200
                },
                
               
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