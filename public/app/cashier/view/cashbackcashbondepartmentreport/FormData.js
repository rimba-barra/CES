Ext.define('Cashier.view.cashbackcashbondepartmentreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.cashbackcashbondepartmentreportformdata',
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
                                fieldLabel: 'Project / PT',
                                displayField: 'name',
                                valueField: 'pt_id',
                                id: 'ptcashbackcashbondepartmentreport',
                                itemId: 'ptcashbackcashbondepartmentreport',
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
                                fieldLabel: 'Periode',
                                layout: 'hbox',
                                items: [
                                    {
                                        
                                        xtype: 'datefield',
                                        fieldLabel: '',
                                        emptyText: 'From Date',
                                        name: 'periode_start',
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
                                        name: 'periode_end',
                                        allowBlank: false,
                                        format: 'd-m-Y',
                                        submitFormat: 'Y-m-d',
                                        altFormats: 'd-m-Y|Y-m-d|dmY|Ymd|mdY|dmy|ymd|mdy'
                                    }
                                ]
                            },
                            {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Type',
                            layout: 'hbox',
                            items: [
                                     {
                                       xtype:'combobox',
                                       name:'reporttype',
                                       valueField: 'reporttype',
                                       queryMode:'local',
                                       editable:false,
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
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '10px 0 0 20px',
                    bodyStyle: 'background: transparent',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-save',
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
                            margin: '0 0 0 10',
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
