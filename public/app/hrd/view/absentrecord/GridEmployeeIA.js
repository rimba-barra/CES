Ext.define('Hrd.view.absentrecord.GridEmployeeIA', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordemployeeiagrid',
    storeConfig: {
        id: 'AbsentGridEmployeeIAStore',
        idProperty: 'absentdetail_id',
        extraParams: {
            mode_read: 'employeeia'
        }
    },
    height: 200,
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
                    dataIndex: 'employee_employee_name',
                    text: 'Nama Karyawan',
                    width: 200
                },
                {
                    dataIndex: 'department_code',
                    text: 'Departemen',
                    width: 70
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'date',
                    text: 'Tanggal',
                    width: 70
                },
                {
                    dataIndex: 'time_in',
                    text: 'Jam Masuk',
                    width: 70
                },
                {
                    dataIndex: 'time_out',
                    text: 'Jam Pulang',
                    width: 70
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [];
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