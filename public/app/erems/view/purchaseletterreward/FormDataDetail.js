Ext.define('Erems.view.purchaseletterreward.FormDataDetail', {
    extend   : 'Erems.library.template.view.FormData',
    alias    : 'widget.purchaseletterrewardformdatadetail',
    requires : [
        'Erems.template.ComboBoxFields',
        // 'Erems.library.template.view.MoneyField'
    ],
    // stores      : ['Masterreward'],
    // models      : ['Masterreward'],
    frame       : true,
    autoScroll  : true,
    anchorSize  : 100,
    width       : 400,
    bodyBorder  : true,
    bodyPadding : 10,
    bodyStyle   : 'border-top:none;border-left:none;border-right:none;',
    defaults    : {
        border : false,
        xtype  : 'panel',
        flex   : 1,
        layout : ''
    },
    initComponent: function () {
        var me = this;
        var statess = Ext.create('Ext.data.Store', {
            fields : ['group', 'group_text'],
            data   : [
                { "group": 1, "group_text": "Reward Sales" },
                { "group": 2, "group_text": "Reward Customer" },
            ]
        });

        Ext.applyIf(me, {
            items: [
                {
                    xtype  : 'hiddenfield',
                    itemId : 'purchaseletter_reward_id',
                    name   : 'purchaseletter_reward_id'
                },
                {
                    xtype              : 'combobox',
                    anchor             : '-5',
                    name               : 'group_id',
                    store              : statess,
                    fieldLabel         : 'Group',
                    displayField       : 'group_text',
                    valueField         : 'group',
                    allowBlank         : false,
                    typeAhead          : true,
                    queryMode          : 'local',
                    forceSelection     : true,
                    autoSelect         : true,
                    lastSelectedRecord : null,
                    flex               : 1,
                    listeners          : {
                        change : function (comboBox, newValue, oldValue) {
                            if (!newValue && comboBox.lastSelectedRecord) {
                                comboBox.getStore().clearFilter();
                                comboBox.setValue(comboBox.lastSelectedRecord);
                            } else {
                                comboBox.lastSelectedRecord = comboBox.getValue();
                            }
                        }
                    }
                },
                {
                    xtype          : 'combobox',
                    fieldLabel     : 'Reward',
                    anchor         : '-5',
                    queryMode      : 'local',
                    displayField   : 'name',
                    valueField     : 'reward_id',
                    name           : 'reward_id',
                    flex           : 1,
                    readonly       : true,
                    editable       : false,
                    allowBlank     : false,
                    forceSelection : true,
                },
                {
                    xtype           : 'xmoneyfieldEST',
                    fieldLabel      : 'Amount',
                    name            : 'amount',
                    enableKeyEvents : true,
                    value           : 0.00,
                    flex            : 1,
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Nomor IM/FP',
                    name       : 'nomor_im',
                    flex       : 1,
                    allowBlank : false,
                },
                {
                    xtype      : 'xdatefield',
                    fieldLabel : 'Tanggal IM/FP',
                    name       : 'tanggal_im',
                    flex       : 1,
                },
                {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Note',
                    anchor     : '-5',
                    name       : 'note',
                    flex       : 1,
                    allowBlank : true
                },


            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    padding : 6,
                    type    : 'hbox'
                },
                items : [
                    {
                        xtype   : 'button',
                        action  : 'save',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-save',
                        text    : 'Save'
                    },
                    {
                        xtype   : 'button',
                        action  : 'cancel',
                        itemId  : 'btnCancel',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-cancel',
                        text    : 'Cancel',
                        handler : function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});