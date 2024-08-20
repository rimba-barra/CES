Ext.define('Hrd.view.allemployee.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.allemployeegrid',
    storeConfig: {
        id: 'AllemployeeGridStore',
        idProperty: 'employee_id',
        extraParams: {}
    },
    bindPrefixName: 'Allemployee',
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
                   dataIndex: 'subholding_name',
                   text: 'Subholding'
                },
                {
                   dataIndex: 'project_name',
                   text: 'Project',
                   width: 150
                },
                {
                   dataIndex: 'pt_name',
                   text: 'PT',
                   width: 150
                },
                {
                   dataIndex: 'nik_group',
                   text: 'NIK Group'
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Name',
                   width: 200
                },
                {
                   dataIndex: 'sex_name',
                   text: 'Gender',
                   width: 80
                   // renderer: function(value) {
                   //      return value == "M" ? "Male" : value == "F" ? "Female" : "";
                   //  }
                },
                {
                   dataIndex: 'age',
                   text: 'Age',
                   width: 50
                },
                {
                   dataIndex: 'last_education_name',
                   text: 'Last Education'
                },                
                {
                   dataIndex: 'department_name',
                   text: 'Department',
                   width: 150
                },
                {
                   dataIndex: 'position_name',
                   text: 'Position',
                   width: 100
                },
                {
                   dataIndex: 'banding_name',
                   text: 'Banding',
                   width: 100
                },
                {
                   dataIndex: 'group_name',
                   text: 'Group',
                   width: 100
                },
                {
                   dataIndex: 'employeestatus',
                   text: 'Employee Status'
                },
                {
                   dataIndex: 'hire_date',
                   text: 'Hire Date'
                },
                {
                   dataIndex: 'assignation_date',
                   text: 'Assignation Date'
                },
                {
                   dataIndex: 'contractend_date',
                   text: 'Contract End Date'
                },
                {
                   dataIndex: 'nonactive_date',
                   text: 'Nonactive Date'
                },
                {
                   dataIndex: 'employee_active_name',
                   text: 'Employee Active',
                   // renderer: function(value) {
                   //      return value == 1 ? "Active" : "Nonactive";
                   //  }
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Pensiun',
                    dataIndex   : 'is_pensiun',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 75,
                    resizable   : false,
                    align       : 'center'
                },
                {
                    xtype       : 'booleancolumn',
                    text        : 'Kompensasi',
                    dataIndex   : 'is_kompensasi',
                    trueText    : '&#10003;',
                    falseText   : ' ',
                    width       : 75,
                    resizable   : false,
                    align       : 'center'
                },
                {
                   dataIndex: 'usia_kerja_start_date',
                   text: 'Usia Kerja (Start Date)',
                   width       : 120
                },
                {
                   dataIndex: 'usia_kerja_count',
                   text: 'Perhitungan Usia Kerja',
                   width       : 250
                },
                {
                   dataIndex: 'masa_kerja_start_date',
                   text: 'Masa Kerja (Start Date)',
                   width       : 125
                },
                {
                   dataIndex: 'masa_kerja_count',
                   text: 'Perhitungan Masa Kerja',
                   width       : 250
                }
                
                                
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
                        action: 'export',
                        // hidden: false,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Read',
                        icon: 'app/main/images/icons/excel.png',
                        text: 'Export'
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
});


