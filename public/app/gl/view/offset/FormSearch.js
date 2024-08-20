Ext.define('Gl.view.offset.FormSearch', {
    extend: 'Ext.form.Panel',
    alias: 'widget.offsetformsearch',
    autoScroll: false,
    bodyBorder: false,
    border: false,
    bodyPadding: 0,
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'search'
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyBorder: false,
                    border: false,
                    bodyPadding: 0,
                    bodyStyle: 'background-color:#dfe8f5;',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Sub Group Code',
                            defaultType: 'combo',
                            bodyBorder: false,
                            defaults: {
                                flex: 3
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'subaccountgroupdatagrid',
                                    itemId: 'fsms_kelsubfilter',
                                    name: 'kelsubfilter',
                                    emptyText: 'Sub Group Code',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    enableKeyEvents: true,
                                    rowdata:'',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'fsms_kelsubdesc',
                                    name: 'kelsubdesc',
                                    emptyText: ' ',
                                    width: '240',
                                    enforceMaxLength: true,
                                    maxLength: 20,
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'splitter',
                                    width: '20'
                                },
                                {
                                    xtype: 'monthcombobox',
                                    fieldLabel: 'Month Until',
                                    emptyText: 'Month',
                                    name: 'monthdata',
                                    allowBlank: false,
                                },
                            ]

                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Coa Code',
                            defaultType: 'combo',
                            bodyBorder: false,
                            defaults: {
                                flex: 3
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'coadatacombogrid',
                                    itemId: 'fsms_coafilter',
                                    name: 'coafilter',
                                    emptyText: 'Coa Code',
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata:null
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'fsms_coaname',
                                    name: 'coaname',
                                    emptyText: ' ',
                                    enforceMaxLength: true,
                                    width: '500',
                                    enableKeyEvents: true
                                },                               
                            ]
                        },
                    ]

                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
            ],
        });

        me.callParent(arguments);
    },
});
