Ext.define('Erems.view.masterpricelist.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterpricelistformdata',
    requires: [
        'Erems.view.masterpricelist.GridDetail',
        'Erems.view.masterpricelist.KoefisienGrid',
        'Erems.view.masterpricelist.KoefisienGridDetail',
        'Erems.view.masterpricelist.KoefisienClusterGrid'
    ],
    fullscreen    : true,
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    autoWidth     :true,
    bodyBorder    : true,
    bodyPadding   : 10,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign     : 'left',
                labelSeparator : ' ',
                labelClsExtra  : 'small',
                fieldStyle     : 'margin-bottom:3px;',
                anchor         : '100%'
            },
            items: [
                {
                    xtype : 'hiddenfield',
                    name  : 'pricelist_id'
                },
                {
                    xtype      : 'xnotefieldEST',
                    name       : 'keterangan',
                    allowBlank : false,
                    fieldLabel : 'Keterangan'
                },
                {
                    xtype      : 'textfield',
                    name       : 'nomor_im',
                    fieldLabel : 'Nomor IM/FP'
                }, 
                // added by rico 08022023
                {
                    padding: '10px 0 0 0',
                    layout: 'hbox',
                    bodyStyle: 'border:0px;background-color:#dfe8f6;',
                    items: [
                        {
                            xtype        : 'datefield',
                            fieldLabel   : 'Pricelist Start Date',
                            anchor       : '-5',
                            name         : 'pricelist_date',
                            flex         : 1,
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            value        : new Date(),
                            editable     : false,
                            allowBlank   : false,
                            listeners    : {
                                change : function(el, value){
                                    var periode_end = Ext.ComponentQuery.query("[name=pricelist_end_date]")[0];

                                    if(periode_end.getValue() != null){
                                        if(value >= periode_end.getValue()){
                                            periode_end.setValue('');

                                            Ext.Msg.alert('Info', 'Periode date start harus lebih kecil dari periode end!');
                                        }else{
                                            periode_end.setDisabled(false);
                                        }
                                    }else{
                                        periode_end.setDisabled(false);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'splitter',
                            width: 20,
                        }, 
                        {
                            xtype        : 'datefield',
                            fieldLabel   : 'Pricelist End Date',
                            anchor       : '-5',
                            name         : 'pricelist_end_date',
                            flex         : 1,
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            editable     : false,
                            disabled     : true,
                            allowBlank   : false,
                            listeners    : {
                                change : function(el, value){
                                    var periode_start = Ext.ComponentQuery.query("[name=pricelist_date]")[0].getValue();

                                    if(value <= periode_start){
                                        el.setValue(''); 
                                        Ext.Msg.alert('Info', 'Periode date end harus lebih besar dari periode start!');
                                    }
                                }
                            }
                        },
                    ]
                },
                {
                    layout    : 'hbox',
                    bodyStyle : 'border:0px',
                    items     : [
                        {
                            xtype  : 'masterpricelistgriddetail',
                            width  : '100%',
                            itemId : 'MyMasterpricelistdetailGrid'
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    }
});