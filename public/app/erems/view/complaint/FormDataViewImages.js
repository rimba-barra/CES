Ext.define('Erems.view.complaint.FormDataViewImages', {
    extend      : 'Erems.library.template.view.FormData',
    alias       : 'widget.complaintformdataviewimages',
    requires    : [],
    frame       : true,
    autoScroll  : true,
    anchorSize  : 100,
    height      : 550,
    bodyBorder  : true,
    bodyPadding : 10,
    bodyStyle   : 'padding:5px 5px 0',
    defaults    : {
        border : false,
        xtype  : 'panel',
        flex   : 1,
        layout : ''
    },
    initComponent : function() {
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
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_aftersales_complaint_images_id',
                    name   : 'aftersales_complaint_images_id'
                },
				{
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_aftersales_complaint_id',
                    name   : 'aftersales_complaint_id'
                },
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
                                    layout    : 'hbox',
                                    bodyStyle : 'border:0px',
                                    itemId    : 'image_place',
                                    items     : [
                                        {
                                            xtype      : 'image',
                                            shrinkWrap : true,
                                            name       : 'image_filename',
                                            width      : '100%',
                                            height     : 400
    									}
                                    ]
								},
								{
                                    padding   : '10px 0 0 0',
                                    layout    : 'hbox',
                                    bodyStyle : 'border:0px',
                                    items     : [
                                        {
                                            xtype      : 'displayfield',
                                            fieldLabel : 'Image Filename',
                                            labelAlign : 'top',
                                            labelStyle : 'font-weight:bold;', //font-size: 15px;
                                            anchor     : '-5',
                                            name       : 'description',
                                            flex       : 1,
										}
                                    ]
								},

							]
						},
					]
				}
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

	generateDockedItem:function(){
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
                            action  : 'prev_img',
                            itemId  : 'btnPrev',
                            padding : 5,
                            width   : 75,
                            text    : 'Previous'
                        },
                        {
                            xtype   : 'button',
                            action  : 'next_img',
                            itemId  : 'btnNext',
                            padding : 5,
                            width   : 75,
                            text    : 'Next'
                        },
						{
                            xtype : 'tbfill'
						},
						{
                            xtype   : 'button',
                            action  : 'cancel',
                            itemId  : 'btnCancel',
                            padding : 5,
                            width   : 75,
                            iconCls : 'icon-cancel',
                            text    : 'Cancel',
                            handler :function(){
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ];
          return x;
    },
});
