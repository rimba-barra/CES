Ext.define('Erems.view.verificationapproval.FormDataApprove', {
    extend        : 'Erems.library.template.view.FormData',
    alias         : 'widget.verificationapprovalformdataapprove',
    itemId        : 'verificationapprovalformdataapprove',
    frame         : true,
    autoScroll    : true,
    anchorSize    : 100,
    bodyBorder    : true,
    bodyPadding   : 10,
    maxWidth      : 250,
    minWidth      : 250,
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
            items: [
                {
                    xtype        : 'datefield',
                    fieldLabel   : 'Approve Date',
                    anchor       : '-5',
                    name         : 'approve_date',
                    anchor       : '-5',
                    editable     : false,
                    allowBlank   : false,
                    value        : new Date(),
                    format       : 'd-m-Y',
                    altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat : 'Y-m-d H:i:s.u'
                }
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

