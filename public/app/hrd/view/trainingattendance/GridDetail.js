Ext.define('Hrd.view.trainingattendance.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.employeetraininggriddetail',
    storeConfig: {
        id: 'EmployeetrainingGridDetailStore',
        idProperty: 'accessmatrix_id',
        extraParams: {
            mode_read: 'employeetrainingdetaillist'
        }
    },
    bindPrefixName: 'Employeetraining',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            ptype       : 'cellediting',
            clicksToEdit: 1
        });
        
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            //contextMenu: me.generateContextMenu(),
            plugins         : [cellEditing],
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig      : {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    dataIndex   : 'employee_name',
                    text        : 'Employeea Name'
                }, 
                {
                    dataIndex   : 'email_ciputra',
                    text        : 'Email Ciputra'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Attendance',
                    dataIndex   : 'trainingattendance_id',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 90,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'ESS',
                    dataIndex   : 'ess_att',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 90,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'HRD Checked',
                    dataIndex   : 'hc_checked_att',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 90,
                    resizable   : false,
                    align       : 'center'
                },
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    // {
                    //     text: 'Get Employee',
                    //     itemId: 'btnInvitedDetail',
                    //     action: 'invitedDetail',
                    //     iconCls: 'icon-approve',
                    //     bindAction: me.bindPrefixName + 'Invited'
                    // }
                ]
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };

        return ac;
    }
});