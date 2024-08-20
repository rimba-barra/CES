//catatan untuk ke t_employee_multiposition
Ext.define('Hrd.view.personal.GridEmployeemultiposition', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalemployeemultipositiongrid',
    store: 'Employeemultiposition',
    /*
    storeConfig:{
        id:'PersonalGridEmployeemultipositionStore',
        idProperty:'relation_id',
        extraParams:{
            mode_read:'emgcontact'
        }
    },
    */
    id: 'PrsEmployeemultipositionGridID',
    bindPrefixName: 'Personal',
    newButtonLabel: 'New',
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
                    xtype: 'gridcolumn',
                    itemId: 'colms_statedata',
                    width: 100,
                    dataIndex: 'statedata',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_multiposition_id',
                    width: 100,
                    dataIndex: 'employee_multiposition_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_id',
                    width: 100,
                    dataIndex: 'employee_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_nik',
                    width: 100,
                    dataIndex: 'employee_nik',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_project_id',
                    width: 100,
                    dataIndex: 'project_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_id',
                    width: 100,
                    dataIndex: 'pt_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department_id',
                    width: 100,
                    dataIndex: 'department_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_section_id',
                    width: 100,
                    dataIndex: 'section_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_position_id',
                    width: 100,
                    dataIndex: 'position_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jobfamily_id',
                    width: 100,
                    dataIndex: 'jobfamily_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_alokasibiaya_id',
                    width: 100,
                    dataIndex: 'alokasibiaya_id',
                    hidden: true,
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_reportto_id',
                    width: 100,
                    dataIndex: 'reportto_id',
                    hidden: true,
                },      
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_default',
                    dataIndex: 'is_default',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 90,
                    hideable: false,
                    text: 'Default'
                },
                {
                    dataIndex: 'projectname',
                    text: 'Project Name'
                },
                {
                    dataIndex: 'ptname',
                    text: 'Pt Name'
                },
                {
                    dataIndex: 'department',
                    text: 'Department'
                },
                {
                    dataIndex: 'section',
                    text: 'Section'
                },
                {
                    dataIndex: 'position',
                    text: 'Position'
                },
                {
                    dataIndex: 'reportto',
                    text: 'Report to'
                },
                {
                    dataIndex: 'jobfamily',
                    text: 'Job Family'
                },
                {
                    dataIndex: 'alokasibiaya',
                    text: 'Alokasi Biaya'
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
                        action: 'create',
                        iconCls: 'icon-new',
                        text: 'New'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        iconCls: 'icon-edit',
                        text: 'Edit'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        text: 'Delete'
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
            hidden: false,
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
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