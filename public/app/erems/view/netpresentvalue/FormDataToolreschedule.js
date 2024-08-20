Ext.define('Erems.view.netpresentvalue.FormDataToolreschedule', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.netpresentvalueformdatatoolreschedule',
    itemId        : 'netpresentvalueformdatatoolreschedule',
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    bodyBorder    : true,
    bodyPadding   : 10,
    maxWidth      : 400,
    minWidth      : 400,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            xtype: 'container',
            layout   : 'hbox',
            margin   : '10px 0 0 0',
            defaults : {
                xtype  : 'container',
                layout : 'hbox',
                flex   : 1,
                width  : '100%'
            },
            items     : [
                {
                    items: [
                        {
                            xtype        : 'datefield',
                            fieldLabel   : 'Tanggal 1',
                            anchor       : '-5',
                            name         : 'tanggal_1',
                            anchor       : '-5',
                            editable     : false,
                            allowBlank   : false,
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            labelWidth   : 70,
                            width        : 170
                        },
                        { xtype: 'splitter', width: 10 },
                        {
                            xtype : 'label',
                            text  : 's/d',
                            width : 50
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype        : 'datefield',
                            fieldLabel   : 'Tanggal 2',
                            anchor       : '-5',
                            name         : 'tanggal_2',
                            anchor       : '-5',
                            editable     : false,
                            allowBlank   : false,
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            labelWidth   : 70,
                            width        : 170
                        },
                        { xtype: 'splitter', width: 10 },
                        {
                            xtype : 'label',
                            text  : '',
                            width : 50
                        }
                    ]
                },
                {
                    items: [
                        {xtype: 'hiddenfield', name: 'scheduletype_id'},
                        {
                            xtype        : 'combobox',
                            fieldLabel   : 'Type',
                            anchor       : '-5',
                            name         : 'scheduletype',
                            store        : 'Scheduletype',
                            displayField : 'scheduletype',
                            valueField   : 'scheduletype',
                            anchor       : '-5',
                            editable     : false,
                            allowBlank   : false,
                            labelWidth   : 70,
                            width        : 170,
                        },
                        { xtype: 'splitter', width: 10 },
                        {
                            xtype : 'label',
                            text  : '',
                            width : 50
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype        : 'xmoneyfield',
                            fieldLabel   : 'Nilai',
                            anchor       : '-5',
                            name         : 'nilai',
                            anchor       : '-5',
                            editable     : false,
                            allowBlank   : false,
                            labelWidth   : 70,
                            width        : 170,
                        },
                        { xtype: 'splitter', width: 10 },
                        {
                            xtype : 'label',
                            text  : '',
                            width : 50
                        }
                    ]
                },
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    padding : 6,
                    type    : 'hbox'
                },
                items: [
                    {
                        xtype   : 'button',
                        action  : 'process_reschedule',
                        itemId  : 'process_reschedule',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-save',
                        text    : 'Process'
                    },
                    {
                        xtype   : 'button',
                        action  : 'cancel',
                        itemId  : 'btnCancel',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-cancel',
                        text    : 'Cancel',
                        handler : function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

