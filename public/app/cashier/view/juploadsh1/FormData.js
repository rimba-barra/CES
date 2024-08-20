Ext.define('Cashier.view.juploadsh1.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.juploadsh1formdata',   
    height: 250,
    width: 1024,
    layout: 'vbox',
    frame: true,
    autoScroll: true,
    bodyStyle: 'background-color:#dfe8f5;',
    requires: [
        'Cashier.view.juploadsh1.DataUploadGrid',
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
                    width: '100%',
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
                            labelWidth :200,
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
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnCheckJournal',
                            name : 'btnCheckJournal',
                            text: 'Check Journal',
                            tooltip: 'Check data journal yang tidak balance diatas tahun 2022.',
                            padding: 5,
                        },

                    ]
                },
                {
                    xtype: 'juploadsh1datauploadgrid',
                    itemId: 'fd_uploadgrid',
                    name: 'datauploadgrid',
                    disabled: true,
                    title: 'Data Grid',
                    width: '98%',
                    height: 500,
                    padding: '20px 0 0 20px',
                },
                
                {
                    xtype: 'panel',
                    layout: {
                        align: 'middle',
                        pack: 'center',
                        type: 'hbox'
                    },
                    border: false,
                    width: '100%',
                    bodyStyle: 'background-color:#dfe8f5;width:100%;',
                    padding: '20px 20px 20px 0px',
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
                            xtype: 'splitter',
                            bodyStyle: 'background-color:#dfe8f5;width:100%;',
                            width: '20'
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
