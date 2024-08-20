Ext.define('Erems.view.masterwhatsnew.FormData', {
	extend: 'Main.library.FormData',
	
	alias: 'widget.MasterwhatsnewFormData',
    requires: [
        'Erems.library.box.view.DateField'
        ],
	itemId: 'MasterwhatsnewFormData',
    requires: [
        'Erems.library.box.view.DateField'
    ],
	autoScroll: true,
    bodyBorder: true,
    bodyPadding: 15,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	width: 800,
		
	initComponent: function() {
		var me = this;
        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        padding: 3,
                        type: 'hbox'
                    },
                    items: [
                        '<small style="color:#777777;"><span style="color:#ff0000;">*</span> required fields</small>',
                        '->',
                        {
                            xtype: 'button',
                            text: 'Upload Image',
                            itemId: 'btnUpload',
                            name: 'btnUpload',
                            iconCls: 'icon-image',
                            padding: 5,
                            width: 100
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            itemId: 'btnSave',
                            iconCls: 'icon-save',
                            padding: 5,
                            width: 75
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            width: 75                                                        
                        }
                    ]
                }
            ],      
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'whatsnew_id',
                    name: 'whatsnew_id'
                },
                {
                   xtype:'combobox',
                   fieldLabel: 'Subholding',
                   name:'subholding_id',
                   valueField: 'subholding_id',
                   queryMode:'local',
                   store:['0','1','2','3','4'],
                   autoSelect:true,
                   allowBlank: false,  
                   forceSelection:true
                },
                {
                   xtype:'combobox',
                   fieldLabel: 'Module',
                   name:'app_name',
                   valueField: 'app_name',
                   queryMode:'local',
                   dvalue: apps.appId,
                   store:['all','erems','cashier','hrd'],
                   autoSelect:true,
                   allowBlank: false,  
                   forceSelection:true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Title',
                    itemId: 'title',
                    name: 'title',
                    allowBlank: false                   
                },
                {
                    xtype: 'htmleditor',
                    fieldLabel: 'Description',
                    itemId: 'description',
                    name: 'description',
                    allowBlank: false                       
                },
                {
                    xtype: 'dfdatefield',
                    fieldLabel: 'Start Date',
                    itemId: 'publish_start_date',
                    name: 'publish_start_date'             
                },
                {
                    xtype: 'dfdatefield',
                    fieldLabel: 'End Date',
                    itemId: 'publish_end_date',
                    name: 'publish_end_date'             
                },
                {
                    xtype: 'fileuploadfield',
                    id: 'form-file',
                    fieldLabel: 'Main Image',
                    emptyText: 'Select image',
                    name: 'image-upload',
                    buttonText: 'Browse',
                    buttonConfig: {
                        iconCls: 'upload-icon'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Image',
                    itemId: 'image',
                    name: 'image',
                    readOnly: true,
                    allowBlank: true                   
                },
                {
                    xtype: 'panel',
                    fieldLabel: 'Preview',
                    id: 'image-preview',
                    bodyPadding: 10,
                    height: 320,
                    width: 320,
                    html: '<img id="image-preview-content" src="http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png" style="max-height:100%; max-width:100%;"/>',   
                    fieldLabel: 'Main Image',
                    name: 'image-preview'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Active ?',
                    name:'active',
                    inputValue: '1',
                    value: 1,
                    uncheckedValue: '0',
                    checked: true
                }
            ]      
        });

		
		me.callParent(arguments);
	}
});