Ext.define('Erems.view.masterblock.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterblockformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'block_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s.]/,
                    minLength: 2,
                    maxLength: 10,
                    anchor: '-5'
                }, {
                    xtype: 'combobox',
                    name: 'cluster_cluster_id',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    fieldLabel: 'Cluster \/ Tower',
                    anchor: '-50',
                    typeAhead: true,
                    queryMode:'local',
                    listeners:{
                        blur:function(el){
                            if(el.value == '' || el.value == 'undefined' || el.value == null){
                                Ext.Msg.show({
                                    title: 'Information',
                                    msg: 'Cluster yang dicari tidak valid!!',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                                el.setValue('');
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_side',
                    name: 'block',
                    fieldLabel: 'Block Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s.]/,
                    maxLength: 30,
                    anchor: '-5'
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-5'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

