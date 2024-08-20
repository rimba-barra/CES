Ext.define('Cashier.view.openingbalance.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.journalformsearch',
    initComponent: function() {
        var me = this;
        

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'combobox',
                    name: 'pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection:true,
                },
                {
                    xtype: 'combobox',
                    name: 'project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    queryMode:'local',
                    forceSelection:true,
                    allowBlank: true,
                    rowdata: null,
                    
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tahun',
                    layout: 'hbox',
                    items: [
                            {
                                xtype: 'yearcombobox',
                                fieldLabel:'',
                                emptyText: 'Year',
                                value: (new Date()).getFullYear(), 
                                name: 'yeardata',
                                allowBlank: false,
                            }
                    ]
                }, 
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Journal Date',
                    layout: 'hbox',
                    bodyBorder: false,
                    hidden: true,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: '',
                                name: 'journal_dates',
                                format: 'd-m-Y',
                                submitFormat: 'Y-m-d',
                                emptyText: 'From',
                                width: 125
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: '',
                                name: 'journal_datef',
                                format: 'd-m-Y',
                                submitFormat: 'Y-m-d',
                                emptyText: 'To',
                                width: 125
                            },
                            ]
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
