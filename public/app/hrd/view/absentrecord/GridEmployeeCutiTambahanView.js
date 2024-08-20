Ext.define('Hrd.view.absentrecord.GridEmployeeCutiTambahanView', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordemployeecutitambahangridview',
    storeConfig: {
        id: 'AbsentGridEmployeeCutiTambahanViewStore',
        idProperty: 'employee_id',
        extraParams: {
            mode_read: 'viewemployee_cutitambahan'
        }
    },
    height: 200,
    id: 'AbrecEmployeeViewGridID',
    bindPrefixName: 'Absentrecordview',
    newButtonLabel: 'New Employee view',
    initComponent: function() {
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
                    xtype: 'rownumberer',
                    width:30
                },
                {
                    dataIndex: 'employee_nik',
                    text: 'NIK',
                    width: 70
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Name',
                    width: 100
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Process',
                    dataIndex   : 'proses',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Cancel',
                    dataIndex   : 'cancel',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 60,
                    resizable   : false,
                    align       : 'center'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    // {
                    //     xtype: 'button',
                    //     action: 'add',
                    //     iconCls: 'icon-add',
                    //     text: 'Add Employee'
                    // },
                    // {
                    //     xtype: 'button',
                    //     action: 'destroy',
                    //     iconCls: 'icon-delete',
                    //     text: 'Remove From List'
                    // }
                    
                ]
            }, ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            items: [
            ]
        };
        return ac;
    }
});