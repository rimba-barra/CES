Ext.define('Hrd.view.trainingregistration.Gridbrowseintranettrainingregistration', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.gridbrowseintranettrainingregistration',
    storeConfig: {
        id: 'gridbrowseintranettrainingregistration',
        idProperty: 'trainingregister_id',
        extraParams: {
            mode_read: 'getdatatrainingregistrationintranet'
        }
    },
    bindPrefixName: 'Triningregistration',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                // me.generateActionColumn(),
                {
                    dataIndex: 'periode',
                    text: 'Periode',
                    width: 80,
                    name: 'periode',
                    sortable: true
                },
                {
                    dataIndex: 'trainingname',
                    text: 'Training',
                    width: 80,
                    name: 'trainingname',
                    sortable: true
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Employee Name',
                    width: 250,
                    name: 'employee_name',
                    sortable: true
                },
                {
                    dataIndex: 'startdate',
                    text: 'Start Date',
                    width: 100,
                    name: 'startdate',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
                {
                    dataIndex: 'enddate',
                    text: 'End Date',
                    width: 90,
                    name: 'enddate',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
                // {
                //     dataIndex: 'is_ess_approve_reject',
                //     text: 'Report to Approve',
                //     width: 90,
                //     name: 'is_ess_approve_reject',
                //     sortable: true,
                //     renderer: Ext.util.Format.dateRenderer('Y-m-d')
                // },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Report to Approve',
                    dataIndex   : 'is_ess_approve_reject',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 100,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    dataIndex: 'is_ess_approve_reject_date',
                    text: 'Report to Approve Date',
                    width: 150,
                    name: 'is_ess_approve_reject_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
                // {
                //     dataIndex: 'hc_approve_reject',
                //     text: 'HC Approve',
                //     width: 90,
                //     name: 'hc_approve_reject',
                //     sortable: true,
                //     renderer: Ext.util.Format.dateRenderer('Y-m-d')
                // },
                {
                    xtype       : 'booleancolumn',
                    text        : 'HC Approve',
                    dataIndex   : 'hc_approve_reject',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 90,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    dataIndex: 'hc_approve_reject_date',
                    text: 'HC Approve Date',
                    width: 120,
                    name: 'hc_approve_reject_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 60,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
            ]
        };

        return ac;
    }
});