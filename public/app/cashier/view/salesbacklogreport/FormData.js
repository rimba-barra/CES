Ext.define('Cashier.view.salesbacklogreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.salesbacklogreportformdata',
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
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Format Report',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'formatreport',
                                       valueField: 'formatreport',
                                       queryMode:'local',
                                       dvalue: 'DETAIL V2 - LANDED',
                                       store:['SUMMARY','DETAIL','DEFAULT', 'DETAIL V2 - LANDED', 'DETAIL V2 - HIGHRISE', 'DETAIL V2 - PROJECT'],
                                       autoSelect:true,
                                       forceSelection:true,
                                           listeners: {
                                            afterrender: function() {
                                               this.setValue(this.dvalue);    
                                            } 
                                        }
                                    },
                                  
                            ]
                        },
                        {
                                xtype: 'combobox',
                                name: 'pt_pt_id',
                                fieldLabel: 'Company',
                                displayField: 'name',
                                valueField: 'pt_id',
                                id: 'ptsalesbacklogreport',
                                itemId: 'ptsalesbacklogreport',
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
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Sales Year',
                                name: 'slsYear1',
                                hidden: false,
                                layout: 'hbox',
                                items: [
                                        {
                                            xtype: 'year2combobox',
                                            fieldLabel:'',
                                            emptyText: 'Year',
                                            name: 'salesyeardata_start',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'To',
                                            margin: '2 10 0 10'
                                        },
                                        {
                                            xtype: 'year2combobox',
                                            fieldLabel:'',
                                            emptyText: ' to ',
                                            name: 'salesyeardata_end',
                                            allowBlank: true,
                                        }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Periode',
                                hidden: true,
                                name: 'slsYear2',
                                layout: 'hbox',
                                items: [
                                    {
                                        
                                        xtype: 'datefield',
                                        fieldLabel: '',
                                        emptyText: 'From Date',
                                        name: 'salesyeardata_start_ver2',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d',
                                        altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                                    },
                                    {
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: 'To',
                                        margin: '2 10 0 10'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: '',
                                        emptyText: 'Until Date',
                                        name: 'salesyeardata_end_ver2',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d',
                                        altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Handover Year',
                                hidden: false,
                                name: 'hndYear1',
                                layout: 'hbox',
                                items: [
                                        {
                                            xtype: 'year2combobox',
                                            fieldLabel:'',
                                            emptyText: 'Year',
                                            name: 'handoveryeardata_start',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'label',
                                            forId: 'lbl1',
                                            text: 'To',
                                            margin: '2 10 0 10'
                                        },
                                        {
                                            xtype: 'year2combobox',
                                            fieldLabel:'',
                                            emptyText: ' to ',
                                            name: 'handoveryeardata_end',
                                            allowBlank: true,
                                        }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Handover Year',
                                hidden: true,
                                name: 'hndYear2',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: '',
                                        emptyText: 'From Date',
                                        name: 'handoveryeardata_start_ver2',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d',
                                        altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                                    },
                                    {
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: 'To',
                                        margin: '2 10 0 10'
                                    },
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: '',
                                        emptyText: 'Until Date',
                                        name: 'handoveryeardata_end_ver2',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d',
                                        altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                                    }
                                ]
                            },
                            {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'reporttype',
                                       valueField: 'reporttype',
                                       queryMode:'local',
                                       dvalue: 'DEFAULT',
                                       store:['DEFAULT','EXCEL'],
                                       autoSelect:true,
                                       forceSelection:true,
                                           listeners: {
                                            afterrender: function() {
                                               this.setValue(this.dvalue);    
                                            }
                                        }
                                    }

                                    /*
                                    {
                                        xtype: 'label',
                                        forId: 'lbl1',
                                        text: '   ',
                                        margin: '2 10 0 10'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        fieldLabel: '',
                                        name: 'notdetail',
                                        boxLabel: 'No Detail',
                                        padding: '0 0 0 0',
                                        margin: '0 0 0 0',
                                        boxLabelCls: 'x-form-cb-label small',
                                        inputValue: '1',
                                        uncheckedValue: '0',
                                        checked: false
                                    }
                                    */
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 10px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-submit',
                            text: 'Submit',
                            padding: 5,
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
