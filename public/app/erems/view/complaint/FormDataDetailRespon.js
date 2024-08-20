Ext.define('Erems.view.complaint.FormDataDetailRespon', {
    extend   : 'Erems.library.template.view.FormData',
    alias       : 'widget.complaintformdatadetailrespon',
    requires    :['Erems.library.template.component.Complaintstatuscombobox'],
    frame       : true,
    autoScroll  : true,
    anchorSize  : 100,
    height      : 450,
    bodyBorder  : true,
    bodyPadding : 10,
    bodyStyle   : 'padding:5px 5px 0',
    defaults    : {
        border: false,
        xtype  : 'panel',
        flex   : 1,
        layout : ''
    },
    initComponent: function() {
        var me = this;

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

        Ext.applyIf(me, {
            items: [
				{
                    xtype : 'hiddenfield',
                    itemId: 'fdms_aftersales_complaint_id',
                    name  : 'aftersales_complaint_id'
                },
				{
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_aftersales_id',
                    name   : 'aftersales_id'
                },
				{
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_unit_id',
                    name   : 'unit_id'
                },
				{
                    xtype       : 'panel', 
                    bodyPadding : 10, 
                    title       : 'Add / Edit Respon Complaint', 
                    collapsible : true,
                    width       : '100%',
                    items       : [
                        {
                            xtype     : 'panel',
                            layout    : 'hbox',
                            bodyStyle : 'border:0px',
                            items     : [
                                {
                                    xtype     : 'panel',
                                    width     : '100%',
                                    flex      : 3,
                                    bodyStyle : 'border:0px',
                                    items     : [
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                            {
                                                    xtype        : 'datefield',
                                                    fieldLabel   : 'Respon Date',
                                                    anchor       : '-5',
                                                    name         : 'respon_date',
                                                    flex         : 1,
                                                    readOnly     : true,
                                                    format       : 'd-m-Y',
                                                    altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                                                    submitFormat : 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'textfield',
                                                    fieldLabel : 'User Respon',
                                                    anchor     : '-5',
                                                    name       : 'respon_user',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    value      : apps.loginname
                                                }
                                            ]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'complaintstatuscombobox',
                                                    anchor     : '-5',
                                                    itemId     :'fd_complaintstatus',
                                                    flex       : 1,
                                                    fieldLabel : 'Complaint Status',
                                                    name       : 'complaintstatus_id',
                                                    allowBlank :false
    											}
                                            ]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Complaint Respon',
                                                    anchor     : '-5',
                                                    name       : 'respon_note',
                                                    flex       : 1,
                                                    rows       : 12,
                                                }
                                            ]
                                        },
										
                                    ]
                                },
                            ]
                        }
                    ]
                },
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});