Ext.define('Erems.view.complaint.FormDataDetailImages', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.complaintformdatadetailimages',
    requires:[
		
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 260,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

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
                    xtype: 'hiddenfield',
                    itemId: 'fdms_aftersales_complaint_images_id',
                    name: 'aftersales_complaint_images_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_aftersales_complaint_id',
                    name: 'aftersales_complaint_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_temp_id_images',
                    name: 'temp_id_images'
                },
				/* Add / Edit Images */
				{xtype: 'panel', bodyPadding: 10, title: 'Add / Edit Images', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
											itemId: 'image_place',
                                            items: [{
												xtype: 'filefield',
												itemId: 'image_filename',
												emptyText: 'Select an image',
												fieldLabel: 'Image File',
												name: 'image_filename',
												buttonText: 'Browse',
												allowBlank: false,
                                                listeners:{
                                                    change:function(inputFile, value, field){
                                                        console.log(inputFile, value, field)
                                                        var file_size = inputFile.fileInputEl.dom.files[0].size;
                                                        if(file_size > 200000){
                                                            inputFile.setRawValue('');
                                                            Ext.Msg.alert('Info', 'File size too big!');
                                                        }
                                                     }
                                                }
											},
											{
												xtype: 'textfield',
												fieldLabel: 'Image File',
												anchor: '-5',
												name: 'image_filename',
												flex: 1,
												readOnly: true,
												fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
											}]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [{
                                                    xtype      : 'xnotefieldEST',
                                                    fieldLabel : 'Description',
                                                    anchor     : '-5',
                                                    name       : 'description',
                                                    flex       : 1,
												}]
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