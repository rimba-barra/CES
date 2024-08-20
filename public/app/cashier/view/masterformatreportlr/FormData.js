Ext.define('Cashier.view.masterformatreportlr.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.masterformatreportlrformdata',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    width: 400,
    uniquename:'_fmasterformatreportlr',
    id: 'masterformatreportlrID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: ''
            },
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam'+me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'projectptcombobox',
                    fieldLabel:'Project / PT',
                    emptyText: 'Select Project / PT',
                    name: 'projectpt_id',
                    allowBlank: false,
                    enableKeyEvents: true,
                    margin: '0 0 5 0',
                    width: 350,
                    enforeMaxLength: true,
                    valueField: 'projectpt_id',
                    tpl: Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                                '<th width="50px"><div class="x-column-header x-column-header-inner">PROJECT PT</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    ),   
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Report',
                    emptyText: 'Select',
                    name: 'report_type',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['param', 'label'],
                        data: [
                            {'param': 'N', 'label': 'Neraca'},
                            {'param': 'L', 'label': 'Laba Rugi'}
                        ]
                    }),
                    displayField: 'label',
                    valueField: 'param',
                    value: 'N'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Report Level',
                    emptyText: 'Select',
                    name: 'report_level',
                    allowBlank: false,
                    margin: '0 0 5 0',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['num'],
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: 'cashier/masterformatreportlr/read',
                            actionMethods: {
                                read: 'POST'
                            },
                            reader: {
                                type: 'json',
                                root: 'data',
                                encode: true,
                            },
                            extraParams: {
                                'hideparam': 'getreportlevel'
                            }
                        }
                    }),
                    value: 1,
                    displayField: 'num',
                    valueField: 'num'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'panelGrid',
                            name: 'panel',
                            activeTab: 0,
                            region: 'center',
                            layout: 'hbox',
                            id: 'TabAccount',
                            width: '99%',
                            items: [
                                {
                                    xtype: 'masterformatreportlrgrid',
                                    closable: false,
                                    name: 'masterformatreportlrgrid',
                                    title: 'Accounts',
                                    flex: 1,
                                    itemId: 'TabAccount',
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    margin: '10 0 0 250',
                    items: [
                        {
                            xtype: 'button',
                            action: 'update',
                            itemId: 'btnUpdate',
                            iconCls: 'icon-save',
                            text: 'Update',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            margin: '0 0 0 5',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                },
                 
            ],
        });
        me.callParent(arguments);
    },
});
