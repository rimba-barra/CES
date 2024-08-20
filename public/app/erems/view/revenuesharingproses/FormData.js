Ext.define('Erems.view.revenuesharingproses.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.revenuesharingprosesformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	//height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_purchaseletter_id',
                    name: 'purchaseletter_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_doc_no',
                    name: 'doc_no',
                    fieldLabel: 'Document No',
					allowBlank: false,
                    //readOnly: true,
                    anchor: '-5',
                    listeners: {
                        render: function (field) {
                            var month = (new Date().getMonth() < 9) ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1);
                            var days = (new Date().getDate() < 9) ? "0" + String(new Date().getDate()) : String(new Date().getDate());

                            var today = String(new Date().getFullYear()) + month + days;
                            field.setValue('RS_' + today);
                        }
                    }
                },
                {
                    xtype: 'datefield',
					fieldLabel: 'Process Date',
					anchor: '-5',
					name: 'process_date',
					anchor: '-5',
					editable: false,
					allowBlank: false,
					value: new Date(),
					format: 'd-m-Y',
					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
					submitFormat: 'Y-m-d H:i:s.u',
                    listeners: {
                        blur: function (field) {
                            var today = new Date();
                            if (!field.isValid()) {
                                Ext.Msg.alert('Info', 'Date is invalid!');
                                field.setValue(today);
                            }
                        },
                        change: function (field) {
                            var v = field.getValue();
                            var month = (v.getMonth() < 9) ? "0" + String(v.getMonth() + 1) : String(v.getMonth() + 1);
                            var days = (v.getDate() < 9) ? "0" + String(v.getDate()) : String(v.getDate());

                            var document_no = "RS_" + String(v.getFullYear()) + month + days;

                            var doc = Ext.ComponentQuery.query('#fdms_doc_no');
                            doc[0].setValue(document_no);
                        }
                    }
                }
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

