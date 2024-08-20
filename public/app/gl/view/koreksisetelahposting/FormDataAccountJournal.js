Ext.define('Gl.view.koreksisetelahposting.FormDataAccountJournal', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.formdatakspaaccountjournal',
    requires:[
        'Gl.view.koreksisetelahposting.SubAccountGrid'
     ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
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
                    xtype: 'panel',
                    title: 'Account Journal',
                    collapsible: true,
                    layout: 'vbox',
                    items: [
                         {
                            xtype: 'hiddenfield',
                            itemId: 'fdms_voucherno_ac',
                            name: 'voucherno_ac'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'statedata_ac',
                            value: 'default'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'deleted',
                            value: false
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'hideparam',
                            value: 'defaultaccountjournal'
                        },
                        {
                            xtype: 'hiddenfield',
                            itemId: 'fdms_journaldetail_id_acc',
                            name: 'journaldetail_id_acc'
                        },
                        {
                            xtype: 'hiddenfield',
                            itemId: 'fdms_journal_id_acc',
                            name: 'journal_id_acc'
                        },
                        {
                            xtype: 'hiddenfield',
                            itemId: 'fdms_sort_acc',
                            name: 'sort_acc'
                        },
                        {
                            xtype: 'hiddenfield',
                            itemId: 'fdms_coa_id_acc',
                            name: 'coa_id_acc'
                        },
                        {
                            xtype: 'hiddenfield',
                            itemId: 'fdms_kelsub_id_acc',
                            name: 'kelsub_id_acc'
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            padding: '10px 0 0 20px',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'coasettingcombobox',
                                    fieldLabel: 'Kode Account',
                                    emptyText: 'Select Master COA',
                                    anchor: '-5',
                                    allowBlank: true,
                                    name: 'coa_acc',
                                    itemId: 'fdms_coa',
                                    id: 'fdms_coa',
                                    absoluteReadOnly: true,
                                },
                                {
                                    xtype: 'splitter', width: 30,
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'fdms_kelsub_ac',
                                    name: 'kelsub_acc',
                                    fieldLabel: 'Kelompok Kelsub',
                                    allowBlank: true,
                                    readOnly: true,
                                    maxLength: 20,
                                    width: 150,
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'vbox',
                            padding: '10px 0 0 20px',
                            bodyStyle: 'border:0px',
                            items:
                                    [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'fdms_name_acc',
                                            name: 'name_acc',
                                            fieldLabel: 'Nama Account',
                                            allowBlank: false,
                                            readOnly: true,
                                            maxLength: 300,
                                            width: 430,
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'fdms_keterangan_acc',
                                            name: 'keterangan_acc',
                                            fieldLabel: 'Keterangan',
                                            allowBlank: false,
                                            readOnly: false,
                                            maxLength: 500,
                                            width: 430,
                                        }

                                    ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            padding: '10px 0 0 20px',
                            bodyStyle: 'border:0px',
                            defaultType: 'radiofield',
                            items:
                                    [
                                        {
                                            xtype: 'label',
                                            forId: 'type',
                                            text: 'Type:',
                                            margin: '0 70 0 10'
                                        },
                                        {
                                            boxLabel: 'Debet',
                                            name: 'type_acc',
                                            inputValue: 'D',
                                            id: 'radio1_acc'
                                        },
                                        {
                                            xtype: 'splitter', width: 30,
                                        },
                                        {
                                            boxLabel: 'Credit',
                                            name: 'type_acc',
                                            inputValue: 'C',
                                            id: 'radio2_acc'
                                        }
                                    ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'vbox',
                            padding: '10px 0 0 20px',
                            bodyStyle: 'border:0px',
                            items:
                                    [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'fdms_amount_acc',
                                            id: 'amount_acc',
                                            name: 'amount_acc',
                                            // maskRe: /[0-9\.]/,
                                            fieldLabel: 'Amount',
                                            allowBlank: false,
                                            readOnly: false,
                                            maxLength: 20,
                                            width: 300,
                                        }
                                    ]

                        },
                        {
                            xtype: 'tbspacer',
                            height: 10
                        },
                        {
                            xtype: 'kspsubaccountgrid',
                            hidden: false,
                            itemId: 'fdac_subaccountjournalgrid',
                            id: 'subaccountjournalgrid_ac',
                            name: 'subaccountjournalgrid_ac',
                            title: 'Sub Account Detail',
                            width: '98%',
                            height: 200,
                            padding: '20px 0 0 20px',
                            enableColumnHide: false,
                            enableColumnMove: false,
                            sortableColumns: false
                        },
                        {
                            xtype: 'tbspacer',
                            height: 10
                        },
                    ]
                }
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
                padding: '0 0 0 270',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSaveAJ',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancelAJ',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        /*
                         handler: function () {
                         this.up('window').close();
                         }
                         */
                    }
                ]
            }
        ];
        return x;
    },
});

