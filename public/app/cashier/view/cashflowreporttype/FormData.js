Ext.define('Cashier.view.cashflowreporttype.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashflowreporttypeformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },             
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                            {
                                xtype: 'combobox',
                                name: 'pt_pt_id',
                                fieldLabel: 'Company',
                                displayField: 'name',
                                valueField: 'pt_id',
                                id: 'ptcashflowreport',
                                itemId: 'ptcashflowreport',
                                forceSelection: true,
                                allowBlank: false,
                                readOnly: false,
                                enforceMaxLength: true,
                                queryMode: 'local',
                                flex: 2,
                                rowdata: null,
                                matchFieldWidth: false,
                                tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="500px">',
                                        '<tr class="x-grid-row">',
                                        '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                        '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                                        '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ),
                                enableKeyEvents : true,
                                listeners: {
                                    keyup: function (field) {
                                        var searchString = field.getRawValue().toString().toLowerCase();
                                        if(searchString == null){
                                            return false;
                                        }
                                        if (searchString) {
                                            this.store.filterBy(function (record, id) {
                                                if (record.get('name') == null || record.get('code') == null) {
                                                    return false;
                                                }else{
                                                    if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                                        return true;
                                                        this.store.clearFilter(true);
                                                    } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                                        return true;
                                                        this.store.clearFilter(true);
                                                    } else {
                                                        return false;
                                                        this.store.clearFilter(true);
                                                    }    
                                                }

                                            });
                                        }
                                    },
                                    buffer:300
                                }
                            },
                            {
                                xtype: 'combobox',
                                name: 'department_department_id',
                                fieldLabel: 'Dept',
                                displayField: 'name',
                                valueField: 'cashflowtype_id',
                                width: '300',
								hidden: true,
                                forceSelection: true,
                                allowBlank: true
                            },
							{
                                xtype: 'combobox',
                                name: 'cashflowtype_cashflowtype_id',
                                fieldLabel: 'Type',
                                displayField: 'description',
                                valueField: 'cashflowtype_id',
                                width: '300',
                                forceSelection: true,
                                allowBlank: true
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Year',
                                layout: 'hbox',
                                items: [
                                        {
                                            xtype: 'yearcombobox',
                                            fieldLabel:'',
                                            emptyText: 'Year',
                                            name: 'yeardata',
                                            allowBlank: false,
                                        }
                                ]
                            }, 
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Period',
                                layout: 'hbox',
                                items: [
                                         {
                                            xtype: 'monthcombobox',
                                            fieldLabel:'',
                                            emptyText: 'Month',
                                            name: 'monthdata',
                                            forceSelection: true,
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'monthcombobox',
                                            fieldLabel:' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Until',
                                            emptyText: 'Month',
                                            name: 'monthdatauntil',
                                            forceSelection: true,
                                            allowBlank: true,
                                        }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Cashflow',
                                layout: 'hbox',
                                items: [
                                        {
                                            xtype: 'checkboxfield',
                                            fieldLabel: '',
                                            name: 'iscashflow',
                                            padding: '0 0 0 0',
                                            margin: '0 0 0 0',
                                            boxLabelCls: 'x-form-cb-label small',
                                            inputValue: '1',
                                            uncheckedValue: '0',
                                            checked: false
                                        }
                                ]
                            },
                            
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 10px',
                    bodyStyle:'background-color:#dfe8f5', 
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-print',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
