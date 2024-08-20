Ext.define('Cashier.view.jupload.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.juploadformdata',   
    height: 250,
    width: 1024,
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    requires: [
        'Cashier.view.jupload.DataUploadGrid',
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [   
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;width:100%;',
                    border: false,                  
                    items: [
                        
                        {
                            xtype: 'splitter',
                            width: '20'
                        },	
                        {
                            xtype: 'combobox',
                            name: 'is_merge_coa',
                            fieldLabel: 'Penggabungan Coa Yang Sama',
                            queryMode: 'local',
                            valueField: 'status',
                            allowBlank: false,
                            forceSelection: true,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            displayField: 'description',
                            store: new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data: [
                                    {status: 'no', description: 'No'},
                                    {status: 'yes', description: 'Yes'},
                                ]
                            }),
                        },
                    ]
                },
                {
                    xtype: 'juploaddatauploadgrid',
                    itemId: 'fd_uploadgrid',
                    name: 'datauploadgrid',
                    disabled: true,
                    title: 'Data Grid',
                    width: '98%',
                    height: 200,
                    padding: '20px 0 0 20px',
                },
                
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 350px',
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
                            action: 'reset',
                            itemId: 'btnReset',
                            iconCls: 'icon-reset',
                             padding: 5,
                            text: 'Reset',
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
