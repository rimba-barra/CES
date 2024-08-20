/*Ext.define('Erems.awesome.Class', {
 requires:['Erems.library.Formdatapanel']
 }, function() {
 
 var formData = new Erems.library.Formdatapanel({});
 formData.run();
 
 });*/

Ext.define('Erems.view.facilitiestype.FormData', {
    alias: 'widget.facilitiestypeformdata',
    extend: 'Erems.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'facilitiestype_id',
                    name: 'facilitiestype_id'
                },
                
                {
                    xtype: 'textfield',
                    itemId: 'code',
                    name: 'code',
                    fieldLabel: 'Code',
                 //   allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9]/,
                    maxLength: 50
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'Icon',
                    padding: '5px 0',
                    items: [
                        {
                            xtype: 'panel',
                            width: 20,
                            margin:'0 20px',
                            height: 20,
                            bodyStyle: 'background:none',
                            itemId: 'photo_image',
                            html: ''
                        },
                        {
                            xtype: 'filefield',
                            itemId: 'iconsss',
                            name: 'icon_upload',
                            
                            emptyText: 'Select an image',
                            buttonText: 'Browse'

                        }
                        
                    ]
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_photo_text',
                    name: 'icon'
                }, {
                    xtype: 'textfield',
                    itemId: 'facilitiestype',
                    name: 'facilitiestype',
                    fieldLabel: 'Facilities Type',
                  //  allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s]/,
                    maxLength: 50
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'description',
                    name       : 'description',
                    fieldLabel : 'Description',
                }

            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    }
});




