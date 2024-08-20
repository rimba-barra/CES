Ext.define('Erems.view.progressunit.FormDataUpdateDetailProgress', {
    extend: 'Erems.library.template.view.FormData',
    requires: [],
    alias: 'widget.progressunitformdataupdatedetailprogress',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'unit_id'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            format: 'd-m-Y',
                            fieldLabel: 'Progress Date',
                            name: 'progress_date',
                            altFormats: 'd-m-Y',
                            submitFormat: 'd-m-Y',
                            editable:false,
                            value: new Date()
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Progress (%)',
                            // width: 210,
                            name: 'progres_percent',
                            maxValue: 100,
                            minValue:1,
                            value:1
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype      : 'xnotefieldEST',
                            fieldLabel : 'Notes',
                            name       : 'description'
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    },
    generateDockedItem: function() {
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
                        action: 'updateSelection',
                        itemId: 'btnUpdateSelection',
                        padding: 5,
                        width: 125,
                        disabled: true,
                        iconCls: 'icon-add',
                        text: 'Update Selected Unit'
                    },
                    {
                        xtype: 'button',
                        action: 'updateAll',
                        itemId: 'btnUpdateAll',
                        padding: 5,
                        width: 175,
                        disabled: true,
                        iconCls: 'icon-add',
                        text: 'Update to All in Cluster'
                    },
					{
                        xtype: 'button',
                        action: 'updateAllSPK',
                        itemId: 'btnUpdateAllSPK',
                        padding: 5,
                        width: 175,
                        disabled: true,
                        iconCls: 'icon-add',
                        text: 'Update to All in SPK'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        align: 'right',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});