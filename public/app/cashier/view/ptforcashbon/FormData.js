Ext.define('Cashier.view.ptforcashbon.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.ptforcashbonformdata',
   
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id_cashbon',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'ptusercombobox',
                            fieldLabel: 'Pt for Owner',
                            name: 'pt_id_owner',
                            width: 300,
                            allowBlank: false,
                        },
                        {
                            xtype: 'projectcombobox',
                            fieldLabel: 'Project for Cashbon',
                            name: 'project_id',
                            width: 300,
                            allowBlank: false,
                        },
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'button',
                            action: 'getdata',
                            itemId: 'btngetData',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'Get Data'
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'DATA COMPANY FOR CASHBON',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'label',
                            forId: 'lblbrowsept',
                            text: 'Check for Add company access Cashbon',
                        },
                        {
                            xtype: 'ptforcashbonbrowseptgrid',
                            itemId: 'fd_ptforcashbonbrowseptgrid',
                            id: 'ptforcashbonbrowseptgrid',
                            name: 'ptforcashbonbrowseptgrid',
                            title: 'Data Company',
                            width: '98%',
                            height: 300,
                            padding: '20px 0 0 20px',
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

