Ext.define('Cashier.view.writeoff.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.writeoffformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    closable: false,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    deletedOtherPaymentRows: [],
    deletedArPaymentRows: [],
    deletedsubRows: [],
    deletedLocalstoreSubRows: [],
    editedRow: -1,
    deletedRowsWithoutID: 0,
    id: 'formdatawriteoffID',
    itemId:'formdatawriteoffID',
    rowData: null,
    width: 1000,
    height: 650,
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
                    xtype: 'hiddenfield',
                    name: 'is_special_wo'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'writeoff_id'
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
                            name: 'writeoff_no',
                            fieldLabel: 'Writeoff No',
                            emptyText: 'Generate By System',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            anchor: '-5',
                            width: '300',
                            readOnly: true,
                            allowBlank: true,
                            fieldStyle: 'background-color:#eee;background-image: none;'

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
                            xtype: 'combobox',
                            name: 'project_project_id',
                            fieldLabel: 'Project',
                            displayField: 'project_name',
                            valueField: 'project_project_id',
                            width: '350',
                            queryMode: 'local',
                            allowBlank: false,
                            msgTarget: "side",
                            readOnly: true,
                            enforceMaxLength: true,
                            blankText: 'This should not be blank!',
                            //readOnly: true,
                            //fieldStyle: 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'combobox',
                            name: 'pt_pt_id',
                            fieldLabel: 'Company',
                            displayField: 'name',
                            valueField: 'pt_id',
                            width: '350',
                            forceSelection: true,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                                    //readOnly: true,
                                    //fieldStyle: 'background-color:#eee;background-image: none;'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'unit_number',
                            fieldLabel: 'Unit Number',
                            width: '350',
                            readOnly: true,
                            hidden: false
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'textfield',
                            name: 'cluster_cluster',
                            emptyText: '',
                            fieldLabel: 'Cluster',
                            width: '350',
                            hidden: false,
                            readOnly: true,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'purchaseletter_no',
                            fieldLabel: 'Purchaseletter No',
                            width: '350',
                            readOnly: true,
                            hidden: false
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'textfield',
                            name: 'purchase_date',
                            emptyText: '',
                            fieldLabel: 'Purchaseletter Date',
                            width: '350',
                            hidden: false,
                            readOnly: true,
                        },
                    ]
                },
                 /* DETAIL PENCAIRAN */
               	{xtype: 'panel', bodyPadding: 10, title: 'DETAIL DENDA', collapsible: true,
                    width: '100%',
                    items: [
                                        {
                                                xtype: 'panel',
                    layout: 'fit',
                    bodyStyle: 'border:0px',
                    items: [
                                                        {
                                                                //  bodyPadding: 10,
                                                                padding: '10px 0 0 0',
                                                                layout: 'hbox',
                                                                bodyStyle: 'border:0px',
                                                                items: [{
                                                                                xtype: 'writeoffdendagrid',
                                                                                width: '100%',
                                                                                itemId: 'MyDendaGrid'
                                                                }]
                                                        }
                                                ]
                                        }
                                ]
                        }
                ,
                
                {
                    xtype: 'splitter',
                    width: '20'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Writeoff Notes',
                    anchor: '-5',
                    name: 'note',
                    width: 300,
                    allowBlank: false,
                    fieldStyle: 'text-transform: uppercase',
                    height: 40,
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
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'savewoff',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'Save',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
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

