Ext.define('Hrd.view.absentrecord.GridEmployeeCutiBersama', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordemployeecutibersamagrid',
    storeConfig: {
        id: 'AbsentGridEmployeeCutiBersamaStore',
        idProperty: 'employee_id',
        extraParams: {
            mode_read: 'employeecutibersama'
        }
    },
    height: 200,
    id: 'AbrecEmployeeCBGridID',
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'New Employee',
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
                    width: 100
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Name',
                    width: 300
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
                    {
                        xtype: 'button',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        text: 'Remove From List'
                    }
                    
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