Ext.define('Cashier.view.reportarkawasan.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.reportarkawasanformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    minHeight: 150,
    maxHeight: 220,
    autoHeight: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 200,
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'project_id',
                            fieldLabel: 'Project',
                            displayField: 'project_name',
                            valueField: 'project_project_id',
                            readOnly: false,
                            id: 'ptreportarkawasan',
                            itemId: 'ptreportarkawasan',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            flex: 2,
                            forceSelection: true,
                            typeAhead: false,
                        },
//                {
//                xtype: 'button',
//                action: 'selectyear',
//                itemId: 'btnSelectYearid',
//                padding: 5,
//                width: 150,
//                maxWidth:150,
//                iconCls: 'icon-save',
//                text: 'Year',
//                align:'right',
//                cls:'btnYear',
//                disabled:true,
//                },


                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'cluster_id',
                    fieldLabel: 'Kawasan',
                    displayField: 'cluster',
                    valueField: 'cluster_id',
                    readOnly: false,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    flex: 2,
                    forceSelection: true,
                    typeAhead: false,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Periode  ',
                            name: 'from',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To ',
                            name: 'to',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                        },
                    ]
                },
                {
                    xtype: 'splitter',
                    height: '20'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                    ]
                },
            ],
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
                    type: 'hbox'
                }, items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        itemId: 'btnSelectArkawasan',
                        id: 'btnselectid',
                        padding: 5,
                        width: 75,
                        flex: 1,
                        maxWidth: 75,
                        iconCls: 'icon-search',
                        text: 'Process',
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
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

