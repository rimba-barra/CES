Ext.define('Hrd.view.klaimpengobatan.FormDataDeletePfams', {
    alias: 'widget.klaimpengobatanformdatadeletepfams',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.library.template.view.MoneyField','Hrd.view.klaimpengobatan.GridDataDeletePfams'],
    frame: true,
    autoScroll: true,
    height:570,
    uniquename: "_klaimpengobatanformdatadeletepfams",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            id: 'project_id' + me.uniquename,
                            name: 'project_id',
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'pt_id' + me.uniquename,
                            name: 'pt_id',
                        },
                        {
                            xtype: 'klaimpengobatangriddatadeletepfams',
                            height: 300,
                            style: 'padding: 10 0 10 0'
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
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'project_name'+ me.uniquename,
                                    id: 'project_name'+ me.uniquename,
                                    name: 'project_name',
                                    fieldLabel: 'Project',
                                    emptyText: 'Project',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'pt_name'+ me.uniquename,
                                    id: 'pt_name'+ me.uniquename,
                                    name: 'pt_name',
                                    fieldLabel: 'PT',
                                    emptyText: 'PT',
                                    width: 300,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    allowBlank: true,
                                    enableKeyEvents: true,
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
                                    xtype: 'textareafield',
                                    fieldLabel: 'Delete Description',
                                    itemId: 'description' + me.uniquename,
                                    id: 'description' + me.uniquename,
                                    name: 'description',
                                    emptyText: 'Description',
                                    width: 300,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                                

                            ]
                        },

                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        action: 'process',
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },

                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});