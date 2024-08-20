Ext.define('Hrd.view.listperformancemanagement.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.listperformancemanagementgrid',
    storeConfig: {
        id: 'ListperformancemanagementGridStore',
        idProperty: 'RowNum',
        extraParams: {}
    },
    bindPrefixName: 'Listperformancemanagement',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
               {
                  xtype: 'rownumberer'
               },
               {
                  dataIndex: 'project_name',
                  text: 'Project'
               },
               {
                  dataIndex: 'pt_name',
                  text: 'PT'
               },
               {
                  dataIndex: 'employee_nik',
                  text: 'NIK'
               },
               {
                  dataIndex: 'employee_name',
                  text: 'Employee Name'
               },
               {
                  dataIndex: 'department_name',
                  text: 'Department'
               },
               {
                  dataIndex: 'package_name',
                  text: 'Package Document'
               },
               {
                  dataIndex: 'periode',
                  text: 'Periode'
               },
               {
                  dataIndex: 'jenisdocument',
                  text: 'Jenis Document'
               },
               {
                  dataIndex: 'pf_status',
                  text: 'Status Document'
               },
               {
                  dataIndex: 'bsc_status',
                  text: 'Status BSC'
               },
               {
                  dataIndex: 'rki_status',
                  text: 'Status RKI'
               },
               {
                  dataIndex: 'hk_status',
                  text: 'Status Hasil Kerja'
               },
               {
                  dataIndex: 'cp_status',
                  text: 'Status Competency'
               },
               {
                  dataIndex: 'dp_status',
                  text: 'Status Disiplin'
               },
               {
                  dataIndex: 'idp_status',
                  text: 'Status IDP'
               },
                                
                // me.generateActionColumn()
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
                     action: 'updateStatus',
                     itemId: 'btnUpdateStatus',
                     margin: '0 5 0 0',
                     iconCls: 'icon-edit',
                     text: 'Update Status',
                     disabled: true
                 },
                  {
                     xtype: 'button',
                     action: 'deletePM',
                     itemId: 'btnDeletePM',
                     margin: '0 5 0 0',
                     iconCls: 'icon-delete',
                     text: 'Delete PM',
                     disabled: true
                 },
                  {
                     xtype: 'button',
                     action: 'reloadPM',  
                     itemId: 'btnReloadPM',
                     margin: '0 5 0 0',
                     iconCls: 'icon-refresh',
                     text: 'Reload PM Deleted By Me',
                     hidden: true
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


