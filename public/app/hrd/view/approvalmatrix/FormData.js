Ext.define('Hrd.view.approvalmatrix.FormData', {
    alias: 'widget.approvalmatrixformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.approvalmatrix.GridDetail', 'Hrd.view.approvalmatrix.GridViewDocContract'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;
        //var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [{
                    xtype: 'hiddenfield',
                    name: 'employee_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'department_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                }, {
                    xtype: 'textfield',
                    name: 'employee_nik',
                    fieldLabel: 'NIK',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'department',
                    fieldLabel: 'Department',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'project_name',
                    fieldLabel: 'Project',
                    readOnly: true,
                    width: 350
                }, {
                    xtype: 'textfield',
                    name: 'pt_name',
                    fieldLabel: 'PT',
                    readOnly: true,
                    width: 350
                },
                {
                    xtype: 'combobox',
                    name: 'pmdocument_id',
                    fieldLabel: 'Package Document',
                    width: 450,
                    displayField: 'code',
                    valueField: 'pmdocument_id',
                    action: 'resetdetail',
                    readOnly: false,
                    allowBlank: false,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                      '<tr class="x-grid-row">',
                          '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                          '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                              '<td><div class="x-grid-cell x-grid-cell-inner">{package_name}</div></td>',
                              
                          '</tr>',
                      '</tpl>',
                   '</table>'
                    ),
                },

                //added by anas 15012024
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            padding: '0 0 0 110px',
                            xtype: 'checkboxfield',
                            boxLabel: 'Use Template Package Document Contract',
                            name: 'used_pmcontract',
                            inputValue: '1',
                            uncheckedValue: '0'
                        },
                        {
                            xtype: 'button',
                            hidden: false,
                            itemId: 'btnViewDocContract',
                            margin: '0 0 0 10',
                            action: 'viewDocContract',
                            // iconCls: 'icon-new',
                            text: 'View Document',
                        },
                    ]
                },
                //end added by anas

                {
                    xtype: 'approvalmatrixgriddetail',
                    height: 300,
                    style: 'padding: 10 0 10 0'
                }],

            dockedItems: me.generateDockedItem()
        });
        
        

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'close',
                        itemId: 'btnClose',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',                       
                    }, 
                    {xtype:'tbfill'},
                    {
                        xtype: 'button',
                        action: 'applytodoc',
                        itemId: 'btnApply',
                        padding: 5,
                        width: 150,
                        //iconCls: 'icon-cancel',
                        text: 'Reload Approval Matrix',                       
                    },
                    {
                        xtype: 'button',
                        action: 'reloadcompetency',
                        itemId: 'btnReloadcompetency',
                        padding: 5,
                        width: 180,
                        //iconCls: 'icon-cancel',
                        text: 'Reload Document Competency',                       
                    }
					
                ]
            }
        ];
        return x;
    },
});