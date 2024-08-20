Ext.define('Hrd.view.employeeptkp.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.employeeptkpgrid',
    store: 'Employeeptkp',
    bindPrefixName: 'Employeeptkp',
    itemId: 'Employeeptkp',
    newButtonLabel: 'Add New',
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
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_periode',
                    width: 80,
                    dataIndex: 'periode',
                    hideable: false,
                    text: 'Periode'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_nik',
                    width: 100,
                    dataIndex: 'employee_nik',
                    hideable: false,
                    text: 'NIK'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 200,
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Employee Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptkp',
                    width: 50,
                    dataIndex: 'ptkp',
                    hideable: false,
                    text: 'PTKP',
                    renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
                            metaData.tdAttr = 'style="background-color: #FFC;"';						
                            return value;
                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptkp_claim',
                    width: 80,
                    dataIndex: 'ptkp_claim',
                    hideable: false,
                    text: 'PTKP Claim',
                    renderer    : function(value, metaData, record, rowIndex, colIndex, store) {
                            metaData.tdAttr = 'style="background-color: #FFC;"';                        
                            return value;
                    },
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'colms_effective_date',
                    width: 100,
                    dataIndex: 'effective_date',
                    hideable: false,
                    format: 'd-m-Y',
                    text: 'Effective Date',
                    format:'Y-m-d',
                    renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
                            metaData.tdAttr = 'style="background-color: #FFC;"';						
                            return Ext.Date.format(value,'d-m-Y');
                    }
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'colms_claim_effective_date',
                    width: 130,
                    dataIndex: 'claim_effective_date',
                    hideable: false,
                    format: 'd-m-Y',
                    text: 'Claim Effective Date',
                    format:'Y-m-d',
                    renderer    : function(value, metaData, record, rowIndex, colIndex, store) {
                            metaData.tdAttr = 'style="background-color: #FFC;"';                        
                            return Ext.Date.format(value,'d-m-Y');
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_checked',
                    width: 60,
                    dataIndex: 'is_checked',
                    hideable: false,
                    text: 'Checked',
                    align: 'center',
                    renderer	: function(value, metaData, record, rowIndex, colIndex, store) {
                            metaData.tdAttr = 'style="background-color: #FFC;"';						
                            return value == 1 ? '&#10003;' : '';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_applied',
                    width: 60,
                    dataIndex: 'is_applied',
                    hideable: false,
                    text: 'Applied',
                    align: 'center',
                    renderer	: function(value, metaData, record, rowIndex, colIndex, store) {			
                            return value == 1 ? '&#10003;' : '';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sex',
                    width: 50,
                    dataIndex: 'sex',
                    hideable: false,
                    text: 'Sex'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_marriagestatus',
                    width: 100,
                    dataIndex: 'marriagestatus',
                    hideable: false,
                    text: 'Marriage Status',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                        return value;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_child_count',
                    width: 50,
                    dataIndex: 'child_count',
                    hideable: false,
                    text: 'Child'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 200,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department'
                },
                /*
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    width: 200,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 200,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'PT'
                },
                */
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_note',
                    width: 200,
                    dataIndex: 'note',
                    hideable: false,
                    text: 'Note'
                }
            ],
        });

        me.callParent(arguments);
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }

            ]
        };
        return ac;
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [{
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Update',
                        bindAction: me.bindPrefixName + 'Update'
                    },{
                        xtype: 'button',
                        action: 'updateall',
                        hidden: true,
                        itemId: 'btnUpdateall',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        bindAction: me.bindPrefixName + 'Updateall',
                        text: 'Update Selected / Filtered'
                    },
                    {
			xtype:'button',
                        itemId: 'btnDelete',
                        iconCls: 'icon-edit',
                        hidden:true
                    },
                    {
			xtype:'splitbutton',
                        text: 'Update Checked',
                        itemId: 'btnChecked',
                        iconCls: 'icon-edit',
                        menu:[
                        {
                                text: 'Checked Selected Records',
                                action: 'checkeds',
                                itemId: me.bindPrefixName + 'btnCheckeds'
			},
                        {
                                text: 'Unchecked Selected Records',
                                action: 'uncheckeds',
                                itemId: me.bindPrefixName + 'btnUncheckeds'
			},
                        '-',
                        {
                                text: 'Checked All Filtered Records',
                                action: 'checkedf',
                                itemId: me.bindPrefixName + 'btnCheckedf'
			},
                        {
                                text: 'Unchecked All Filtered Records',
                                action: 'uncheckedf',
                                itemId: me.bindPrefixName + 'btnUncheckedf'
			}]
                    }, 
                    {
                        xtype:'tbfill'
                    },
                    {
			xtype:'button',
                        itemId: me.bindPrefixName + 'btnGenerate',
                        action: 'generate',
                        text: 'Generate',
                        iconCls: 'icon-new'
                    }]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    },
});


