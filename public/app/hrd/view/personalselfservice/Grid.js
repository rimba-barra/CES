Ext.define('Hrd.view.personalselfservice.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.personalselfservicegrid',
    store: 'Personalselfservice',
    bindPrefixName: 'Personalselfservice',
    itemId: 'Personalselfservice',
    title: 'Personal Self Service',
    uniquename: '_personalselfservicegrid',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_nik',
                    dataIndex: 'employee_nik',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Employee NIK'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    dataIndex: 'employee_name',
                    width: 250,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Employee Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Department'
                },
                me.generateActionColumn()
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
                    {
                        xtype: 'button',
                        action: 'view',
                        hidden: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Read',
                        text: 'View Data'
                    }

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
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    text: 'Approve',
                    iconCls: 'icon-approve',
                    className: 'approve',
                    bindAction: me.bindPrefixName + 'Approve',
                    altText: 'Approve',
                    tooltip: 'Approve',
                    id: 'approve',
                },
            ]
        }

        return ac;

    },
    viewConfig: {
        listeners: {
            refresh: function (view) {
                var status, nodes, node, record, cells, i;
                var status, actioncolumngrid, eventdata
                        , action, acapprove;

                nodes = view.getNodes();
                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    record = view.getRecord(node);
                    status = record.get('approvedata');
                    cells = Ext.get(node).query('td');
                    actioncolumngrid = cells[5]; //posisi action colomnya
                    eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
                    action = eventdata.childNodes;
                    acapprove = action[0];

                    if (status !== 1) {
                        acapprove.remove();
                    }

                }
            }
        }
    },

});




