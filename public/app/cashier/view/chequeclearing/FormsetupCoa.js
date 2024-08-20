Ext.define('Cashier.view.chequeclearing.FormsetupCoa', {
    extend: 'Ext.form.Panel',
    alias: 'widget.chequeclearingformsetupcoa',
    layout: 'vbox',
    padding: '0 0 0 10',
    bodyStyle: 'background-color:#dfe8f5;',
    border: false,
    uniquename: "_chequeclearingformsetupcoa",
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'coarptcombobox',
                            fieldLabel: 'COA 1',
                            itemId: 'fd_coa_id1' + me.uniquename,
                            id: 'coa_id1' + me.uniquename,
                            name: 'coa_id1',
                            emptyText: 'Select COA 1',
                            width: 230,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname1' + me.uniquename,
                            id: 'coaname1' + me.uniquename,
                            name: 'coaname1',
                            width: '100%',
                            readOnly: true,
                            emptyText: 'COA NAME 1',
                            enforceMaxLength: true,
                            enableKeyEvents: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'coarptcombobox',
                            fieldLabel: 'COA 2',
                            itemId: 'fd_coa_id2' + me.uniquename,
                            id: 'coa_id2' + me.uniquename,
                            name: 'coa_id2',
                            emptyText: 'Select COA 2',
                            width: 230,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname2' + me.uniquename,
                            id: 'coaname2' + me.uniquename,
                            name: 'coaname2',
                            width: '100%',
                            readOnly: true,
                            emptyText: 'COA NAME 2',
                            enforceMaxLength: true,
                            enableKeyEvents: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'coarptcombobox',
                            fieldLabel: 'COA 3',
                            itemId: 'fd_coa_id3' + me.uniquename,
                            id: 'coa_id3' + me.uniquename,
                            name: 'coa_id3',
                            emptyText: 'Select COA 3',
                            width: 230,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname3' + me.uniquename,
                            id: 'coaname3' + me.uniquename,
                            name: 'coaname3',
                            width: '100%',
                            readOnly: true,
                            emptyText: 'COA NAME 3',
                            enforceMaxLength: true,
                            enableKeyEvents: true
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'coarptcombobox',
                            fieldLabel: 'COA 4',
                            itemId: 'fd_coa_id4' + me.uniquename,
                            id: 'coa_id4' + me.uniquename,
                            name: 'coa_id4',
                            emptyText: 'Select COA 4',
                            width: 230,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname4' + me.uniquename,
                            id: 'coaname4' + me.uniquename,
                            name: 'coaname4',
                            width: '100%',
                            readOnly: true,
                            emptyText: 'COA NAME 4',
                            enforceMaxLength: true,
                            enableKeyEvents: true
                        },
                    ]
                },
                 {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'coarptcombobox',
                            fieldLabel: 'COA 5',
                            itemId: 'fd_coa_id5' + me.uniquename,
                            id: 'coa_id5' + me.uniquename,
                            name: 'coa_id5',
                            emptyText: 'Select COA 5',
                            width: 230,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_coaname5' + me.uniquename,
                            id: 'coaname5' + me.uniquename,
                            name: 'coaname5',
                            width: '100%',
                            readOnly: true,
                            emptyText: 'COA NAME 5',
                            enforceMaxLength: true,
                            enableKeyEvents: true
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 0px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'close',
                            itemId: 'btnClose',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Close',
                            
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
