Ext.define('Erems.view.spk.FormDataSelectUnit', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.template.ComboBoxFields'],
    alias: 'widget.spkformdataselectunit',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    itemId: 'SpkFormDataSelectUnit',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
    editedRow:0,
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [{
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {xtype: 'container', layout: 'hbox', width: "100%"},
                    items: [
                        {
                            defaults: {
                                margin: "0 10 15 0"
                            },
                            items: [
                                {xtype: 'textfield', fieldLabel: 'Cluster',name:'cluster_code',
                                    enableKeyEvents:true, labelWidth: 50, flex: 2},
                                {xtype: 'combobox',fieldLabel:"",displayField: cbf.cluster.d,
                                                            valueField: cbf.cluster.v,name: 'cluster_cluster_id',flex: 5}
                            ]
                        },
                        {
                            defaults: {
                                margin: "0 10 15 0"
                            },
                            items: [
                                {xtype: 'textfield', fieldLabel: 'Block',name:'block_code', labelWidth: 50, flex: 2},
                                {xtype: 'combobox',fieldLabel:"",displayField: cbf.blockx.d,
                                                            valueField: cbf.blockx.v,name: 'block_block_id', flex: 5}
                            ]
                        },
                        {
                            defaults: {
                                margin: "0 10 15 0"
                            },
                            items: [
                                {xtype: 'label', text: 'Unit', flex: 2},
                                {xtype: 'combobox',fieldLabel:"",displayField: cbf.unitx.d,
                                                            valueField: cbf.unitx.v,name: 'unit_unit_id', flex: 5}
                            ]
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
                action: 'save',
                itemId: 'btnSave',
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Save'
            },
            {
                xtype: 'button',
                action: 'reset',
                itemId: 'btnReset',
                padding: 5,
                width: 75,
                iconCls: '',
                text: 'Reset'
            },
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
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