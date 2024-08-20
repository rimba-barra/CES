Ext.define('Cashier.view.subeditor.FormConvert', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.subeditorformconvert',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdsubeditorformconvert",
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kelsub_id' + me.uniquename,
                    name: 'kelsub_id',
                },
                {
                    xtype: 'ptprojectcombobox',
                    fieldLabel:'PT Name',
                    emptyText: 'Select PT',
                    name: 'pt_id',
                    itemId: 'pt_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                },
                {
                    xtype: 'coasubeditorcombobox',
                    itemId: 'fd_coa_id' + me.uniquename,
                    id: 'coa_id_add' + me.uniquename,
                    name: 'coa_id',
                    emptyText: 'Select coa',
                    allowBlank: false,
                    enableKeyEvents: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
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
                                xtype: 'tbspacer', height: 5
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
                                        action: 'checkdata',
                                        itemId: 'btnCheckData',
                                        padding: 5,
                                        width: 75,
                                        text: 'Check Data'
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

