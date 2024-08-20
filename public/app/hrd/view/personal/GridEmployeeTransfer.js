Ext.define('Hrd.view.personal.GridEmployeeTransfer', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalemployeetransfergrid',
    storeConfig: {
        id: 'PersonalGridEmployeeTransferStore',
        idProperty: 'history_id',
        extraParams: {
            mode_read: 'employeehistory',
            employee_id: 0
        }
    },
    id: 'PrsEmployeeTransferGridID',
    bindPrefixName: 'Personal',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',

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
                    dataIndex: 'projectname',
                    text: 'Project'
                },
                {
                    dataIndex: 'ptname',
                    text: 'Pt'
                },
                {
                    dataIndex: 'department',
                    text: 'Department'
                },
                {
                    dataIndex: 'jobfamily',
                    text: 'Job family'
                },
                {
                    dataIndex: 'position',
                    text: 'Position'
                },
                {
                    dataIndex: 'banding',
                    text: 'Banding'
                },
                {
                    dataIndex: 'groupcode',
                    text: 'Group'
                },
                {
                    dataIndex: 'hire_date',
                    text: 'Hire date',
                    format:'d-m-Y',
                    renderer: function (value) {                    
                        if (value == 'Wed Jan 01 1800 00:00:00 GMT+0700 (SE Asia Standard Time)') {
                            return '';
                        } else if (value ==null){
                            return '';
                        }else{
                            var date = new Date(value),
                                mnth = ("0" + (date.getMonth()+1)).slice(-2),
                                day  = ("0" + date.getDate()).slice(-2);
                            return [day,mnth,date.getFullYear() ].join("-");
                        }
                    }
                },
                {
                    dataIndex: 'assignation_date',
                    text: 'Assignation date',
                    format:'d-m-Y',
                    renderer: function (value) {                    
                        if (value == 'Wed Jan 01 1800 00:00:00 GMT+0700 (SE Asia Standard Time)') {
                            return '';
                        } else if (value ==null){
                            return '';
                        }else{
                            var date = new Date(value),
                                mnth = ("0" + (date.getMonth()+1)).slice(-2),
                                day  = ("0" + date.getDate()).slice(-2);
                            return [day,mnth,date.getFullYear() ].join("-");
                        }
                    }
                },              
                {
                    dataIndex: 'reporttoname',
                    text: 'Report to'
                },
                {
                    dataIndex: 'reporttoposition',
                    text: 'Report to position'
                },
                {
                    dataIndex: 'sk_number',
                    text: 'SK No.'
                },
               {
                    dataIndex: 'effective_date',
                    text: 'Effective Date',
                    format:'d-m-Y',
                    renderer: function (value) {                    
                        if (value == 'Wed Jan 01 1800 00:00:00 GMT+0700 (SE Asia Standard Time)') {
                            return '';
                        } else if (value ==null){
                            return '';
                        }else{
                            var date = new Date(value),
                                mnth = ("0" + (date.getMonth()+1)).slice(-2),
                                day  = ("0" + date.getDate()).slice(-2);
                            return [day,mnth,date.getFullYear() ].join("-");
                        }
                    }
                },
                {
                    dataIndex: 'reason',
                    text: 'Reason'
                },
                {
                    dataIndex: 'note',
                    text: 'Note'
                },
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
                        action: 'noneaction',                      
                    },                   
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